import {DataTypes, InitOptions, Model, ModelAttributes} from 'sequelize'
import sequelize from './sequelize'

const options: InitOptions = {
  sequelize,
  modelName: 'Job',
  tableName: 'jobs'
}

const attributes: ModelAttributes = {
  jobId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  company: DataTypes.STRING,
  requiredFields: DataTypes.STRING,
  deadline: DataTypes.DATE,
  expiration: DataTypes.INTEGER,
  referTotal: DataTypes.INTEGER,
  source: DataTypes.STRING
}

class JobModel extends Model {}

JobModel.init(attributes, options)

export default JobModel
