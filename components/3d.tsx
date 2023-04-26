'use client'

import { FC, FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { SVGRenderer } from 'three-stdlib'
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  Extrude,
  PerspectiveCamera
} from '@react-three/drei'

import styles from './3d.module.scss'
import { DoubleSide, Mesh, Shape, Vector3 } from 'three'
import { unmountComponentAtNode } from 'react-dom'



export const SVG: FunctionComponent<{
  svg: string
  // children: JSX.Element
}> = ({ svg, ...props }) => {
  const [shapes, setShapes] = useState<Shape[][]>([])
  const ref = useRef<HTMLDivElement>(null!)
  const [gl] = useState(() => new SVGRenderer() as unknown as THREE.WebGLRenderer)
  

  useEffect(() => {
    if (ref.current) {
      const loader = new SVGLoader();
      const svgData = loader.parse(svg);

      setShapes(svgData.paths.map(p => p.toShapes(true)))
    }
  }, [])


  useEffect(() => {
    // if (ref.current && gl) {
    //   ref.current.appendChild(gl.domElement)
    //   return () => {
    //     ref.current.removeChild(gl.domElement)
    //     // unmountComponentAtNode(ref.current)
    //   }
    // }
  }, [])
  

  return <figure className={styles.full} ref={ref}>
    <Canvas>
      {/* <color attach="background" args={['#dedddf']} /> */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      {/* <Box /> */}
      <ExtrudeSVG shapes={shapes} />
    </Canvas>
  </figure>
}

export const ExtrudeSVG: FunctionComponent<{
  shapes: Shape[][]
}> = ({ shapes }) => {
  const mesh = useRef<Mesh>();
  console.log(shapes)
  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   mesh.current.rotation.y = a;
  // })
  return <mesh ref={mesh}>
    <group scale={0.01} position={[-5,1,0]} rotation={[Math.PI,0,0]}>
    {shapes?.map((shape, i) => <Extrude key={i} args={[shape, {
      depth: 20
    }]}>
      {/* <edgesGeometry /> */}
      <meshStandardMaterial color="#F5F500" />
    </Extrude>)}
    </group>
    {/* <meshStandardMaterial side={DoubleSide} polygonOffset
        polygonOffsetFactor={1} /> */}
  </mesh>
}

export const Box: FunctionComponent<{}> = (props) => {
  const mesh = useRef<Mesh>();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    mesh.current.rotation.x = a;
  })

  return <mesh ref={mesh}>
    <boxGeometry />
    <meshBasicMaterial color="royalblue" />
    
    {/* <meshStandardMaterial /> */}
  </mesh>
}