import { Hono } from 'hono'
import { cors } from 'hono/cors'
import simpleGit from 'simple-git'
import { generateSlug } from 'random-word-slugs'
import * as path from 'path';
import  getAllFiles from './utils/GetFiles'
import uploadToS3 from './utils/S3Uploader'
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect()

const app = new Hono(
  
)

app.use('*', cors())

app.post('/upload', async (c) => {
  const {repoUrl} = await c.req.json()
  const id = generateSlug()
  await simpleGit().clone(repoUrl,path.join(__dirname, `./outputs/${id}`))

  const files = getAllFiles(path.join(__dirname,`./outputs/${id}`))

  files.forEach(async file => {
    await uploadToS3(file.slice(__dirname.length + 1), file);
})


await new Promise((resolve) => setTimeout(resolve, 5000))
publisher.lPush("build-queue", id);
 
publisher.hSet("status", id, "uploaded");

  return c.json({
    id: id,
  })
})

app.get('/status', async (c) => {
  const id = c.req.query('id')
  const response = await subscriber.hGet("status", id as string);
  return c.json({
      status: response
  })
})

export default { 
  port: 3000, 
  fetch: app.fetch, 
} 
