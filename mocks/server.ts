import express from 'express'
import consola from 'consola'
// 路由
import JobsRouter from './routes/jobs'
import RefersRouter from './routes/refers'
import AuthRouter from './routes/auth'
import ResumesRouter from './routes/resumes'
import UploadRouter from './routes/upload'
import UsersRouter from './routes/users'

const app = express()

// app.use(history())
app.use('/api/auth', AuthRouter)
app.use('/api/jobs', JobsRouter)
app.use('/api/refers', RefersRouter)
app.use('/api/resumes', ResumesRouter)
app.use('/api/upload', UploadRouter)
app.use('/api/users', UsersRouter)

const port = 4000
const host = 'localhost'

// Listen the server
app.listen(port, host)
consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
})

