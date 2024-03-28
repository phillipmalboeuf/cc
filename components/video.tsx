'use client'

import { Asset } from 'contentful'
import Image from 'next/image'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import styles from '@/styles/video.module.scss'
import { SVG } from './svgs'

export const Video: FunctionComponent<{
  media: Asset
}> = ({ media }) => {
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const element = useRef<HTMLVideoElement>()

  return <>
    <figure className={styles.video}>
      <SVG />
      <video className={ready ? styles.ready : undefined} ref={element} src={media.fields.file.url} controls={false} autoPlay={false} playsInline loop muted={muted} onCanPlay={e => {
        e.currentTarget.play()
        setReady(true)
      }} />
      <nav>
        <div>
          {/* <button onClick={() => element?.current.requestFullscreen()}>Full Screen</button>
          <button onClick={() => setMuted(!muted)}>Sound {muted ? 'On' : 'Off'}</button> */}
        </div>

        <a href='#skip'>
          <svg width="34" height="14" viewBox="0 0 37 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L18.4043 15.5036L35.8086 1" stroke="white"/></svg>
        </a>

        <div></div>
      </nav>
    </figure>
    <a id="skip" />
  </>
}