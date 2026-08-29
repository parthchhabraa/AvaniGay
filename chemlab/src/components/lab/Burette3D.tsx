import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { LIQUID_HEX, type LiquidColor } from '../../chemistry/types'
import { Liquid } from './Vessel3D'

interface Burette3DProps {
  liquidColor: LiquidColor
  fractionRemaining: number // 0..1 of the 50 cm3 burette
  dispensing: boolean
  readingCm3: number
  position?: [number, number, number]
}

const GLASS = { color: '#aebdb8', transparent: true, opacity: 0.3, roughness: 0.05, clearcoat: 1 } as const

function Drop({ active, color }: { active: boolean; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const t = useRef(0)
  useFrame((_, delta) => {
    if (!ref.current) return
    if (!active) {
      ref.current.visible = false
      t.current = 0
      return
    }
    t.current += delta * 1.6
    if (t.current > 1) t.current = 0
    ref.current.visible = true
    ref.current.position.y = -0.05 - t.current * 1.55
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.opacity = 1 - t.current * 0.3
  })
  return (
    <mesh ref={ref} position={[0, -0.1, 0]}>
      <sphereGeometry args={[0.028, 10, 10]} />
      <meshStandardMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

export function Burette3D({ liquidColor, fractionRemaining, dispensing, readingCm3, position = [0, 0, 0] }: Burette3DProps) {
  const tubeHeight = 1.3
  const mountY = 1.4
  const radius = 0.085
  const stopcockRef = useRef<THREE.Mesh>(null)
  const poleHeight = mountY + tubeHeight + 0.1

  useFrame((_, delta) => {
    if (!stopcockRef.current) return
    const target = dispensing ? Math.PI / 2 : 0
    stopcockRef.current.rotation.x = THREE.MathUtils.lerp(stopcockRef.current.rotation.x, target, Math.min(1, delta * 8))
  })

  return (
    <group position={position}>
      {/* stand: pole + base + clamp arm */}
      <mesh position={[-0.55, poleHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.05, poleHeight, 0.05]} />
        <meshStandardMaterial color="#2f3733" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[-0.55, 0.02, 0]}>
        <boxGeometry args={[0.65, 0.04, 0.35]} />
        <meshStandardMaterial color="#2f3733" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[-0.3, mountY + tubeHeight - 0.05, 0]} castShadow>
        <boxGeometry args={[0.42, 0.05, 0.05]} />
        <meshStandardMaterial color="#3a4440" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* burette tube */}
      <group position={[0, mountY, 0]}>
        <mesh position={[0, tubeHeight / 2, 0]}>
          <cylinderGeometry args={[radius, radius, tubeHeight, 24, 1, true]} />
          <meshPhysicalMaterial {...GLASS} />
        </mesh>
        <Liquid colorId={liquidColor} level={fractionRemaining} radius={radius * 0.82} maxHeight={tubeHeight} baseY={0} />

        {/* graduation marks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[radius + 0.005, (tubeHeight / 6) * i + 0.1, 0]}>
            <boxGeometry args={[0.02, 0.006, 0.005]} />
            <meshBasicMaterial color="#6b7570" />
          </mesh>
        ))}

        {/* stopcock */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.09, 12]} />
          <meshStandardMaterial color="#3a4440" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh ref={stopcockRef} position={[0, -0.06, 0]}>
          <boxGeometry args={[0.14, 0.03, 0.03]} />
          <meshStandardMaterial color="#c7a23a" roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <coneGeometry args={[0.02, 0.08, 12]} />
          <meshPhysicalMaterial {...GLASS} />
        </mesh>

        <Drop active={dispensing} color={LIQUID_HEX[liquidColor]} />

        <Html position={[radius + 0.16, tubeHeight * 0.5, 0]} center distanceFactor={7} className="pointer-events-none select-none">
          <div className="rounded-sm border border-line-strong bg-paper-raised/95 px-1.5 py-1 text-center shadow-flat">
            <div className="font-mono text-[11px] font-semibold text-ink">{readingCm3.toFixed(2)}</div>
            <div className="text-[8px] uppercase tracking-wide text-ink-faint">cm³</div>
          </div>
        </Html>
      </group>
    </group>
  )
}
