import path from "path"
import dotenv from 'dotenv'

// 解析 .env
export const parseEnv = () => {
  const envPath = path.resolve(__dirname, '../.env')
  const result = dotenv.config({
    path: envPath
  })

  if (result.error) {
    throw result.error
  }
}
