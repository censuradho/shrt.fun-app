type QrCodeFormat = 'svg' | 'png' | 'jpg'

function triggerDownload (url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  a.remove()
}

function svgToCanvas (svg: string, width = 512, height = 512): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.width = width
    img.height = height

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas)
    }

    img.onerror = reject
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  })
}

export async function downloadQrCode (svg: string, format: QrCodeFormat, filename = 'qrcode') {
  if (format === 'svg') {
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, `${filename}.svg`)
    URL.revokeObjectURL(url)
    return
  }

  const canvas = await svgToCanvas(svg)

  if (format === 'png') {
    triggerDownload(canvas.toDataURL('image/png'), `${filename}.png`)
  } else if (format === 'jpg') {
    triggerDownload(canvas.toDataURL('image/jpeg', 0.95), `${filename}.jpg`)
  }
}
