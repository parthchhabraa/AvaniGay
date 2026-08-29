import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { LIQUID_HEX, type LiquidColor } from '../../chemistry/types'

const GLASS_PROPS = {
  color: '#aebdb8',
  transparent: true,
  opacity: 0.32,
  roughness: 0.05,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  transmission: 0.0,
  side: THREE.DoubleSide,
} as const

function useLerpedColor(target: string) {
  const color = useRef(new THREE.Color(target))
  const targetColor = useMemo(() => new THREE.Color(target), [target])
  useFrame((_, delta) => {
    color.current.lerp(targetColor, Math.min(1, delta * 3))
  })
  return color
}

/** Animated liquid column: smoothly eases towards a new level/colour instead of snapping. */
export function Liquid({
  colorId,
  level,
  radius,
  maxHeight,
  baseY,
}: {
  colorId: LiquidColor
  level: number
  radius: number
  maxHeight: number
  baseY: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const heightRef = useRef(0)
  const targetHex = LIQUID_HEX[colorId]
  const color = useLerpedColor(targetHex)

  useFrame((_, delta) => {
    heightRef.current = THREE.MathUtils.lerp(heightRef.current, Math.max(0.001, level) * maxHeight, Math.min(1, delta * 3))
    const mesh = meshRef.current
    if (!mesh) return
    mesh.scale.y = heightRef.current
    mesh.position.y = baseY + heightRef.current / 2
    const mat = mesh.material as THREE.MeshPhysicalMaterial
    mat.color.copy(color.current)
    mesh.visible = level > 0.003
  })

  return (
    <mesh ref={meshRef} position={[0, baseY, 0]}>
      <cylinderGeometry args={[radius, radius, 1, 32]} />
      <meshPhysicalMaterial transparent opacity={0.86} roughness={0.25} metalness={0} />
    </mesh>
  )
}

function PrecipitateLayer({ visible, colorId, radius, baseY }: { visible: boolean; colorId: LiquidColor; radius: number; baseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const scaleRef = useRef(0)
  useFrame((_, delta) => {
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, visible ? 1 : 0, Math.min(1, delta * 3.5))
    if (meshRef.current) {
      meshRef.current.scale.setScalar(Math.max(0.001, scaleRef.current))
      meshRef.current.visible = scaleRef.current > 0.01
    }
  })
  return (
    <mesh ref={meshRef} position={[0, baseY + 0.02, 0]}>
      <cylinderGeometry args={[radius * 0.94, radius * 0.94, 0.045, 32]} />
      <meshStandardMaterial color={LIQUID_HEX[colorId]} roughness={0.9} metalness={0} />
    </mesh>
  )
}

function MirrorCoating({ visible, radius, height, baseY }: { visible: boolean; radius: number; height: number; baseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const opacityRef = useRef(0)
  useFrame((_, delta) => {
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, visible ? 0.85 : 0, Math.min(1, delta * 2.5))
    const mat = meshRef.current?.material as THREE.MeshStandardMaterial | undefined
    if (mat) mat.opacity = opacityRef.current
  })
  return (
    <mesh ref={meshRef} position={[0, baseY + height / 2, 0]}>
      <cylinderGeometry args={[radius * 1.001, radius * 1.001, height, 32, 1, true]} />
      <meshStandardMaterial color="#c9ccd0" metalness={1} roughness={0.18} transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  )
}

export interface Vessel3DProps {
  shape: 'test-tube' | 'conical-flask'
  liquidColor: LiquidColor
  level: number // 0..1
  precipitate?: { color: LiquidColor; label: string } | null
  mirror?: boolean
  selected?: boolean
  onSelect?: () => void
  label?: string
  position?: [number, number, number]
}

export function Vessel3D({ shape, liquidColor, level, precipitate, mirror, selected, onSelect, label, position = [0, 0, 0] }: Vessel3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!groupRef.current) return
    const targetY = selected ? 0.12 : 0
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, Math.min(1, delta * 5))
  })

  if (shape === 'test-tube') {
    const radius = 0.17
    const bodyHeight = 1.35
    const capRadius = radius
    const bodyBottom = capRadius

    return (
      <group ref={groupRef} position={position} onClick={onSelect}>
        <group onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = onSelect ? 'pointer' : 'default' }} onPointerOut={() => (document.body.style.cursor = 'default')}>
          <mesh position={[0, capRadius, 0]}>
            <sphereGeometry args={[radius, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshPhysicalMaterial {...GLASS_PROPS} />
          </mesh>
          <mesh position={[0, bodyBottom + bodyHeight / 2, 0]}>
            <cylinderGeometry args={[radius, radius, bodyHeight, 32, 1, true]} />
            <meshPhysicalMaterial {...GLASS_PROPS} />
          </mesh>
          <mesh position={[0, bodyBottom + bodyHeight, 0]}>
            <torusGeometry args={[radius, 0.012, 12, 32]} />
            <meshPhysicalMaterial {...GLASS_PROPS} opacity={0.4} />
          </mesh>

          <Liquid colorId={liquidColor} level={level} radius={radius * 0.86} maxHeight={bodyHeight} baseY={bodyBottom - radius * 0.3} />
          {precipitate && <PrecipitateLayer visible colorId={precipitate.color} radius={radius * 0.86} baseY={bodyBottom - radius * 0.3} />}
          <MirrorCoating visible={!!mirror} radius={radius} height={bodyHeight * 0.7} baseY={bodyBottom + bodyHeight * 0.2} />

          {selected && (
            <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius + 0.06, radius + 0.1, 32]} />
              <meshBasicMaterial color="#175c50" transparent opacity={0.55} />
            </mesh>
          )}
        </group>

        {label && (
          <Html position={[0, -0.18, 0]} center distanceFactor={7} className="pointer-events-none select-none">
            <span className="whitespace-nowrap rounded-sm border border-line-strong bg-paper-raised/95 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink shadow-flat">
              {label}
            </span>
          </Html>
        )}
      </group>
    )
  }

  // conical flask
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.56, 0),
    new THREE.Vector2(0.5, 0.14),
    new THREE.Vector2(0.16, 0.82),
    new THREE.Vector2(0.16, 0.95),
    new THREE.Vector2(0.19, 1.12),
  ]
  return (
    <group ref={groupRef} position={position} onClick={onSelect}>
      <mesh onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = onSelect ? 'pointer' : 'default' }} onPointerOut={() => (document.body.style.cursor = 'default')}>
        <latheGeometry args={[points, 40]} />
        <meshPhysicalMaterial {...GLASS_PROPS} />
      </mesh>
      <Liquid colorId={liquidColor} level={level} radius={0.4} maxHeight={0.42} baseY={0.02} />
      {precipitate && <PrecipitateLayer visible colorId={precipitate.color} radius={0.4} baseY={0.02} />}

      {label && (
        <Html position={[0, -0.14, 0]} center distanceFactor={7} className="pointer-events-none select-none">
          <span className="whitespace-nowrap rounded-sm border border-line-strong bg-paper-raised/95 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink shadow-flat">
            {label}
          </span>
        </Html>
      )}
    </group>
  )
}
