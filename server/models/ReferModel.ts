import {DataTypes, InitOptions, Model, ModelAttributes} from 'sequelize'
import sequelize from './sequelize'

const options: InitOptions = {
  sequelize,
  modelName: 'Refer',
  tableName: 'refers'
}

const attributes: ModelAttributes = {
  referId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  experience: DataTypes.INTEGER,
  intro: DataTypes.TEXT,
  leetCodeUrl: DataTypes.STRING,
  thirdPersonIntro: DataTypes.TEXT,
  referLinks: DataTypes.TEXT,
  status: DataTypes.STRING
}

class ReferModel extends Model {}

ReferModel.init(attributes, options)

export default ReferModel
