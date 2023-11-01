import * as Minio from "minio"

export const {
  MINIO_ENDPOINT = "172.16.98.151",
  MINIO_PORT = "9000",
  MINIO_ACCESS_KEY = "miniouser",
  MINIO_SECRET_KEY = "miniopassword",
} = process.env

export const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: Number(MINIO_PORT),
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
  useSSL: false,
})
