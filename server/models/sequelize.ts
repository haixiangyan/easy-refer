import path from 'path'
import dotenv from 'dotenv'
import {Sequelize} from 'sequelize'

const envPath = path.resolve(__dirname, '../../.env')

// 解析 .env 文件
const result = dotenv.config({
  path: envPath
})

if (result.error) {
  throw result.error
}

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  throw new Error('环境变量不存在')
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  dialect: 'mysql'
})

// Test connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log('Unable to connect to the database:', error))

export default sequelize

