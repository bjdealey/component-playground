import type { ReactNode } from 'react'
import Dropzone from '../Dropzone/Dropzone'
import FileRow from '../FileRow/FileRow'
import IconBadge from '../IconBadge/IconBadge'
import styles from './UploadList.module.css'

export interface UploadListProps {
  /** Files separated by `;`, each `name|size|progress|status|kind`. */
  files?: string
  /** Drop area — compose a `<Dropzone />` here. */
  dropzone?: ReactNode
  showDropzone?: boolean
  width?: number
  gap?: number
  rowPadding?: number
  iconSize?: number
  radius?: number
  borderWidth?: number
  accentColor?: string
  doneColor?: string
  failedColor?: string
  background?: string
  borderColor?: string
  nameColor?: string
  metaColor?: string
  nameSize?: number
  metaSize?: number
}

interface Upload {
  name: string
  size: string
  progress: number
  status: 'uploading' | 'done' | 'failed'
  kind: string
}

export function parseFiles(files: string): Upload[] {
  return files
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [name = '', size = '', progress = '0', status = 'uploading', kind = 'FILE'] = chunk.split('|')
      const clean = status.trim()
      return {
        name: name.trim(),
        size: size.trim(),
        progress: Number(progress.trim()) || 0,
        status: clean === 'done' || clean === 'failed' ? clean : 'uploading',
        kind: kind.trim(),
      }
    })
}

const KIND_COLOR: Record<string, string> = {
  PDF: '#dc2626',
  PNG: '#0284c7',
  ZIP: '#d97706',
  CSV: '#15803d',
}

/** A `Dropzone` above real `FileRow`s — a composite of composites. */
export default function UploadList({
  files = 'brief.pdf|248 KB|100|done|PDF;hero@2x.png|1.4 MB|64|uploading|PNG;archive.zip|18 MB|0|failed|ZIP',
  dropzone,
  showDropzone = true,
  width = 380,
  gap = 10,
  rowPadding = 12,
  iconSize = 34,
  radius = 10,
  borderWidth = 1,
  accentColor = '#4f46e5',
  doneColor = '#15803d',
  failedColor = '#dc2626',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  nameColor = '#17191c',
  metaColor = '#9aa1ab',
  nameSize = 13,
  metaSize = 11.5,
}: UploadListProps) {
  const uploads = parseFiles(files)

  return (
    <div className={styles.list} style={{ width, gap }}>
      {showDropzone &&
        (dropzone ?? (
          <Dropzone
            width={width}
            files=""
            minHeight={110}
            radius={radius}
            borderWidth={borderWidth}
            background={background}
            borderColor={borderColor}
            titleColor={nameColor}
            hintColor={metaColor}
            accentColor={accentColor}
          />
        ))}

      {uploads.map((upload, index) => (
        <FileRow
          key={`${upload.name}-${index}`}
          name={upload.name}
          meta={upload.size}
          progress={upload.progress}
          status={upload.status}
          width={width}
          padding={rowPadding}
          radius={radius}
          borderWidth={borderWidth}
          background={background}
          borderColor={borderColor}
          nameColor={nameColor}
          metaColor={metaColor}
          nameSize={nameSize}
          metaSize={metaSize}
          barColor={accentColor}
          doneColor={doneColor}
          failedColor={failedColor}
          icon={
            <IconBadge
              glyph={upload.kind}
              size={iconSize}
              shape="rounded"
              radius={radius}
              background={KIND_COLOR[upload.kind.toUpperCase()] ?? '#6b7280'}
              fontScale={0.32}
            />
          }
        />
      ))}
    </div>
  )
}
