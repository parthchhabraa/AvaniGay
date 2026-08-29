import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { Suspense, type ReactNode } from 'react'
import { PageLoading } from '../ui/PageLoading'

interface LabCanvasProps {
  children: ReactNode
  cameraPosition?: [number, number, number]
  target?: [number, number, number]
  allowRotate?: boolean
  height?: string
}

export function LabCanvas({
  children,
  cameraPosition = [0, 1.6, 4.2],
  target = [0, 0, 0],
  allowRotate = true,
  height = '100%',
}: LabCanvasProps) {
  return (
    <div style={{ height }} className="relative overflow-hidden bg-paper-sunken">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: cameraPosition, fov: 38 }}
      >
        <color attach="background" args={['#00000000']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 5, 3]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#bcd9e6" />
        <pointLight position={[0, 2, -2]} intensity={0.25} color="#e7c93f" />

        <Suspense fallback={null}>{children}</Suspense>

        <ContactShadows position={[0, -0.001, 0]} opacity={0.35} scale={10} blur={2.2} far={2} resolution={512} />
        <OrbitControls
          enabled={allowRotate}
          target={target}
          enablePan={false}
          enableZoom={true}
          minDistance={2.4}
          maxDistance={7}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.05}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.55}
        />
      </Canvas>
    </div>
  )
}

export function LabCanvasFallback() {
  return <PageLoading label="Preparing 3D scene" />
}
