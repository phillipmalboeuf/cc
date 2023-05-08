'use client'

import { FC, FunctionComponent, RefAttributes, useContext, useEffect, useRef, useState } from 'react'
import { SVGRenderer } from 'three-stdlib'
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import { Canvas, Color, useFrame, useLoader } from '@react-three/fiber'
import {
  Center,
  Extrude,
} from '@react-three/drei'

import styles from '@//styles/3d.module.scss'
import { BoxGeometry, DoubleSide, ExtrudeGeometry, Mesh, Shape, Vector3 } from 'three'


export const SVG: FunctionComponent<{
  svg: string
  full?: boolean
  load?: boolean
  size?: {
    width: number
    height: number
  }
}> = ({ svg, load, full, size }) => {
  const [shapes, setShapes] = useState<Shape[][]>([])
  const [color, setColor] = useState<Color>()
  const ref = useRef<HTMLDivElement>(null!)
  // const [gl] = useState(() => new SVGRenderer() as unknown as THREE.WebGLRenderer)

  useEffect(() => {
    if (ref.current) {
      const loader = new SVGLoader();

      if (load) {
        loader.loadAsync(svg).then(svgData => {
          setColor(svgData.paths[0].color)
          setShapes(svgData.paths.map(p => p.toShapes(p.color.r === 1 || true)))
        });
      } else {
        const svgData = loader.parse(svg);
        console.log(svgData.paths[0].color)
        setColor(svgData.paths[0].color)
        setShapes(svgData.paths.map(p => p.toShapes(p.color.r === 1 || false)))
      }
    }
  }, [])

  return <figure className={full ? styles.full : undefined} ref={ref}>
    {shapes && color && <Canvas style={size}>
      <ambientLight intensity={0.1} color={color} />
      <directionalLight position={[0, 0, 5]} color={color} />
      {/* <Box /> */}
      <ExtrudeSVG shapes={shapes} scale={full ? 0.01 : 0.03} color={color} />
    </Canvas>}
  </figure>
}

export const ExtrudeSVG: FunctionComponent<{
  shapes: Shape[][]
  scale: number
  color: Color
}> = ({ shapes, scale, color }) => {
  const mesh = useRef<Mesh>();

  useFrame(({ clock, pointer }) => {
    mesh.current.rotation.y = pointer.x
    mesh.current.rotation.x = -pointer.y
    mesh.current.scale.z = pointer.y*8 || 0.01
  })

  return <>
    <mesh ref={mesh}>
      <Center scale={scale} rotation={[Math.PI,0,0]} >
      {shapes?.map((shape, i) => <Extrude key={i} args={[shape, {
        depth: 20
      }]}>
        <meshStandardMaterial color={color} />
      </Extrude>)}
      </Center>
    </mesh>
  </>
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