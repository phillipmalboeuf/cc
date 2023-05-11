'use client'

import { FC, FunctionComponent, RefAttributes, useContext, useEffect, useRef, useState } from 'react'
import { SVGRenderer } from 'three-stdlib'
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Canvas, Color, useFrame, useLoader } from '@react-three/fiber'
import {
  Center,
  Extrude,
  PresentationControls,
} from '@react-three/drei'

import styles from '@//styles/3d.module.scss'
import { BoxGeometry, DoubleSide, ExtrudeGeometry, Group, Mesh, Shape, Vector3 } from 'three'


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
        setColor(svgData.paths[0].color)
        setShapes(svgData.paths.map(p => p.toShapes(p.color.r === 1 || false)))
      }
    }
  }, [])

  return <figure className={full ? styles.full : undefined} ref={ref}>
    {shapes && color && <Canvas style={size}>
      <ambientLight intensity={0.1} color={color} />
      <directionalLight position={[0, 0, 5]} color={color} />

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

export const OBJ: FunctionComponent<{
  href: string
  full?: boolean
  size?: {
    width: number
    height: number
  }
}> = ({ href, full, size }) => {
  const ref = useRef<HTMLDivElement>()
  const [obj, setOBJ] = useState<Group>()

  useEffect(() => {
    if (ref.current) {
      const loader = new OBJLoader();

      console.log(href)
      loader.loadAsync(href).then(objData => {
        console.log(objData)
        // setColor(svgData.paths[0].color)
        setOBJ(objData)
      });
    }
  }, [])
  

  // const obj = useLoader(OBJLoader, href)

  return <figure className={full ? styles.full : undefined} style={{ backgroundColor: '#D2D2D2' }} ref={ref}>
    {obj && <Canvas style={size}>
      <ambientLight intensity={0.1} color={'#D2D2D2'} />
      <directionalLight position={[0, 0, 5]} color={'#D2D2D2'} />
      
      <Presentation obj={obj} scale={0.02} color={'#D2D2D2'} />
    </Canvas>}
  </figure>
}

export const Presentation: FunctionComponent<{
  obj: Group
  scale: number
  color: Color
}> = ({ obj, scale, color }) => {
  const ref = useRef<Mesh>()
  useFrame((state, delta) => (ref.current.rotation.y += delta / 2))

  return <PresentationControls>
    <mesh scale={scale} ref={ref}>
      <Center>
        <primitive object={obj}>
          <meshStandardMaterial color={color} />
        </primitive>
      </Center>
    </mesh>
  </PresentationControls>
}