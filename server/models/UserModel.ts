import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export class UserModel extends Model {
  public static associate(db: any) {
    db.User.hasOne(db.Job)
    db.User.hasMany(db.Refer)
    db.User.hasMany(db.Resume)
  }
}

export default function (sequelize: Sequelize, DataTypes: any) {
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

  UserModel.init(attributes, options)

  return UserModel
}
