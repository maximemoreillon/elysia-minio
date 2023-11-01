import { minioClient } from "../minioClient"

const MINIO_BUCKET = "elysia-example"

export const storeFile = async (file: File) => {
  const fileArrayBuffer = await file.arrayBuffer()
  const metadata = {}
  await minioClient.putObject(
    MINIO_BUCKET,
    file.name,
    Buffer.from(fileArrayBuffer),
    metadata
  )
  return { size: file.size, name: file.name }
}

const readStream = (dataStream: any) =>
  new Promise((resolve, reject) => {
    const buffer: any[] = []
    dataStream.on("data", (chunk: any) => {
      buffer.push(chunk)
    })
    dataStream.on("end", () => {
      resolve(buffer)
    })
    dataStream.on("error", (err: any) => {
      reject(err)
    })
  })

export const getFile = async (filename: string) => {
  const dataStream = await minioClient.getObject(MINIO_BUCKET, filename)
  const buffer: any = await readStream(dataStream)
  return new Blob(buffer)
}
