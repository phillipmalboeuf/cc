import { Asset } from 'contentful'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { OBJ, SVG } from './3d'

export const Media: FunctionComponent<{
  media: Asset
  sizes: string
  fill: boolean
  contain?: boolean
  no3D?: boolean
}> = ({ media, sizes, fill, contain, no3D }) => {
  return media?.fields.file ? <>
    {(media.fields.file.contentType === 'image/svg+xml' && !no3D)
      ? <SVG svg={`https:${media.fields.file.url}`} load size={!fill ? { width: media.fields.file.details.image.width, height: media.fields.file.details.image.height } : undefined} />
      : (media.fields.file.contentType === 'application/x-tgif' && !no3D)
        ? <OBJ href={`https:${media.fields.file.url}`} size={!fill ? { width: media.fields.file.details.image.width, height: media.fields.file.details.image.height } : undefined} />
        : <Image src={`https:${media.fields.file.url}`} 
          fill={fill}
          {...!fill && { width: media.fields.file.details.image.width, height: media.fields.file.details.image.height }}
          sizes={sizes}
          style={{ objectFit: contain ? 'contain' : 'cover' }}
          alt={media.fields.title} />}

        {/* <OBJ href={`https:${media.fields.file.url}`} size={!fill ? { width: media.fields.file.details.image.width, height: media.fields.file.details.image.height } : undefined} /> */}
  </> : null
}