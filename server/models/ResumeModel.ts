import {DataTypes, InitOptions, Model, ModelAttributes} from 'sequelize'
import sequelize from './sequelize'

const options: InitOptions = {
  sequelize,
  modelName: 'Resume',
  tableName: 'resumes'
}

const attributes: ModelAttributes = {
  resumeId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  url: DataTypes.STRING
}

class ResumeModel extends Model {}

ResumeModel.init(attributes, options)

export default ResumeModel
