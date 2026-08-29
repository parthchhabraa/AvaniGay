import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { LIQUID_HEX, type LiquidColor } from '../../chemistry/types'
import { FormulaText } from '../ui/FormulaText'

interface ReagentBottle3DProps {
  name: string
  formula: string
  liquidColor: LiquidColor
  position?: [number, number, number]
  pouring?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export function ReagentBottle3D({ name, formula, liquidColor, position = [0, 0, 0], pouring, disabled, onSelect }: ReagentBottle3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return
    const targetZ = pouring ? -0.95 : 0
    const targetY = hovered && !disabled ? 0.06 : 0
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetZ, Math.min(1, delta * 6))
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, Math.min(1, delta * 8))
  })

  return (
    <group position={position}>
      <group
        ref={groupRef}
        onClick={() => !disabled && onSelect?.()}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (!disabled) {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.19, 0.21, 0.68, 20]} />
          <meshPhysicalMaterial color={disabled ? '#cfcabc' : '#4a5550'} transparent opacity={0.88} roughness={0.25} clearcoat={0.6} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.155, 0.17, 0.6, 20]} />
          <meshStandardMaterial color={LIQUID_HEX[liquidColor]} roughness={0.3} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.14, 16]} />
          <meshPhysicalMaterial color="#4a5550" transparent opacity={0.88} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.08, 16]} />
          <meshStandardMaterial color="#2b2f2c" roughness={0.6} />
        </mesh>

        <Html position={[0, 0.42, 0.2]} center distanceFactor={5.6} className="pointer-events-none select-none" transform occlude={false}>
          <div className="w-[80px] rounded-sm border border-white/25 bg-ink/90 px-1.5 py-1 text-center leading-tight text-white">
            <div className="text-[9px] font-semibold">{name}</div>
            <FormulaText formula={formula} className="text-[8px] opacity-80" />
          </div>
        </Html>
      </group>

      {hovered && !disabled && (
        <Html position={[0, 1.05, 0]} center distanceFactor={7} className="pointer-events-none select-none">
          <span className="whitespace-nowrap rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-medium text-white shadow-pop">Add to sample</span>
        </Html>
      )}
    </group>
  )
}
