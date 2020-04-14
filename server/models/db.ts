import dotenv from 'dotenv'
import path from 'path'
import winston, {Logger} from 'winston'
import {Sequelize} from 'sequelize-typescript'
import UserModel from './UserModel'
import JobModel from './JobModel'
import ReferModel from './ReferModel'
import ResumeModel from './ResumeModel'
// 解析 .env 文件
const parseEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env')
  const result = dotenv.config({
    path: envPath
  })

  if (result.error) {
    throw result.error
  }
}

// 创建 Winston Logger
const initLogger = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
      new winston.transports.File({filename: 'error.log', level: 'error'}),
      new winston.transports.File({filename: 'combined.log'})
    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }

  return logger
}

// 创建连接实例
const initDB = (logger: Logger) => {
  const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env

  if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error('环境变量不存在')
  }

  const sequelize = new Sequelize({
    database: DB_NAME,
    dialect: 'mysql',
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    storage: ':memory:',
    models: [UserModel, JobModel, ReferModel, ResumeModel],
    logging: msg => logger.info(msg),
  })

  // Test connection
  sequelize.authenticate()
    .then(() => console.log('成功连接数据库'))
    .catch((error) => console.log('无法连接数据库: ', error))

  return sequelize
}

// 开始读入 Model
parseEnv()
const logger = initLogger()
const db = initDB(logger)
db.sync({force: true}).then(() => console.log('成功同步数据库'))

export default db