import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, Torus, Box, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

/* ── Mouse tracker passed as shared ref ──────────────────── */
function MouseTracker({ mouseRef }) {
  const { size } = useThree()
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [size, mouseRef])
  return null
}

/* ── Holographic core sphere ─────────────────────────────── */
function HoloCore({ mouseRef }) {
  const outerRef = useRef()
  const wireRef = useRef()
  const glowRef = useRef()
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = mouseRef.current.x * 0.18
    const my = mouseRef.current.y * 0.18

    if (groupRef.current) {
      groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-my - groupRef.current.rotation.x) * 0.05
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12
      outerRef.current.rotation.z = Math.sin(t * 0.3) * 0.15
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.18
      wireRef.current.rotation.z = -t * 0.1
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.08 + Math.sin(t * 1.2) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer chrome shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          roughness={0.1}
          metalness={1.0}
          envMapIntensity={0.5}
          emissive="#0d1f40"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.65, 20, 20]} />
        <meshBasicMaterial
          color="#4f8ef7"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* ── Orbiting tech elements ──────────────────────────────── */
function OrbitingElements({ mouseRef }) {
  const groupRef = useRef()
  const items = useMemo(() => [
    { radius: 2.8, speed: 0.35, yOffset: 0.3, scale: 0.18, color: '#4f8ef7', shape: 'box', tilt: 0.4 },
    { radius: 3.4, speed: -0.22, yOffset: -0.4, scale: 0.14, color: '#00d4ff', shape: 'oct', tilt: -0.3 },
    { radius: 3.0, speed: 0.18, yOffset: 0.6, scale: 0.12, color: '#8b5cf6', shape: 'box', tilt: 0.6 },
    { radius: 2.6, speed: -0.40, yOffset: -0.2, scale: 0.16, color: '#38bdf8', shape: 'oct', tilt: -0.5 },
    { radius: 3.6, speed: 0.28, yOffset: 0.1, scale: 0.10, color: '#a78bfa', shape: 'box', tilt: 0.2 },
  ], [])

  const refs = useRef(items.map(() => ({ group: null, mesh: null })))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = mouseRef.current.x * 0.1
    if (groupRef.current) {
      groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.03
    }
    refs.current.forEach((r, i) => {
      const item = items[i]
      if (r.group) {
        r.group.position.x = Math.cos(t * item.speed + i * 1.2) * item.radius
        r.group.position.z = Math.sin(t * item.speed + i * 1.2) * item.radius
        r.group.position.y = item.yOffset + Math.sin(t * 0.5 + i) * 0.2
      }
      if (r.mesh) {
        r.mesh.rotation.x = t * 0.4
        r.mesh.rotation.y = t * 0.6
      }
    })
  })

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group
          key={i}
          ref={el => { if (refs.current[i]) refs.current[i].group = el }}
          rotation={[item.tilt, 0, 0]}
        >
          {item.shape === 'box' ? (
            <Box
              ref={el => { if (refs.current[i]) refs.current[i].mesh = el }}
              args={[item.scale, item.scale, item.scale]}
            >
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.6}
                roughness={0.1}
                metalness={0.8}
              />
            </Box>
          ) : (
            <Octahedron
              ref={el => { if (refs.current[i]) refs.current[i].mesh = el }}
              args={[item.scale]}
            >
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.5}
                roughness={0.05}
                metalness={0.9}
                wireframe
              />
            </Octahedron>
          )}
        </group>
      ))}
    </group>
  )
}

/* ── Glowing torus rings ─────────────────────────────────── */
function TorusRings({ mouseRef }) {
  const rings = [
    { radius: 2.2, tube: 0.008, speed: 0.3, color: '#4f8ef7', opacity: 0.5, tiltX: 0, tiltZ: 0 },
    { radius: 2.8, tube: 0.006, speed: -0.2, color: '#00d4ff', opacity: 0.35, tiltX: Math.PI / 3, tiltZ: 0.2 },
    { radius: 3.5, tube: 0.005, speed: 0.15, color: '#8b5cf6', opacity: 0.25, tiltX: -Math.PI / 5, tiltZ: -0.3 },
  ]
  const refs = useRef(rings.map(() => null))
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = mouseRef.current.x * 0.06
    if (groupRef.current) {
      groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.025
    }
    refs.current.forEach((r, i) => {
      if (r) r.rotation.y = t * rings[i].speed
    })
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <group key={i} rotation={[ring.tiltX, 0, ring.tiltZ]}>
          <Torus
            ref={el => refs.current[i] = el}
            args={[ring.radius, ring.tube, 4, 256]}
          >
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity}
              side={THREE.DoubleSide}
            />
          </Torus>
        </group>
      ))}
    </group>
  )
}

/* ── Particle field ──────────────────────────────────────── */
function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#4f8ef7" size={0.035} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ── Floating grid plane ─────────────────────────────────── */
function GridPlane() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = -3.5 + Math.sin(s.clock.getElapsedTime() * 0.3) * 0.2
    }
  })
  return (
    <gridHelper
      ref={ref}
      args={[24, 24, '#1a3a6b', '#0f2040']}
      position={[0, -3.5, 0]}
    />
  )
}

/* ── Main exported scene ─────────────────────────────────── */
export default function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 })

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <MouseTracker mouseRef={mouseRef} />

        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[6, 6, 4]} intensity={1.0} color="#4f8ef7" />
        <directionalLight position={[-6, -4, -4]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#00d4ff" distance={12} decay={2} />
        <pointLight position={[4, -2, -2]} intensity={0.6} color="#4f8ef7" distance={10} decay={2} />

        {/* Scene objects */}
        <Stars radius={100} depth={50} count={2500} factor={2} fade saturation={0.3} speed={0.4} />
        <GridPlane />
        <HoloCore mouseRef={mouseRef} />
        <TorusRings mouseRef={mouseRef} />
        <OrbitingElements mouseRef={mouseRef} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
