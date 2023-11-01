import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { storeFile, getFile } from "./controllers/files"

const schema = {
  body: t.Object({
    file: t.File(),
  }),
}

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get(
    "/files/:filename",
    async ({ params: { filename } }) => await getFile(filename)
  )
  .post("/files", async ({ body: { file } }) => await storeFile(file), schema)
  .listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
