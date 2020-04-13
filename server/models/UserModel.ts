import {DataTypes, InitOptions, Model, ModelAttributes} from 'sequelize'
import sequelize from './sequelize'

const options: InitOptions = {
  sequelize,
  modelName: 'User',
  tableName: 'users'
}

const attributes: ModelAttributes = {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  experience: DataTypes.INTEGER,
  name: DataTypes.STRING,
  intro: DataTypes.TEXT,
  leetCodeUrl: DataTypes.STRING,
  thirdPersonIntro: DataTypes.TEXT,
  phone: DataTypes.STRING,
  avatarUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
  }
}

class UserModel extends Model {}

UserModel.init(attributes, options)

export default UserModel
