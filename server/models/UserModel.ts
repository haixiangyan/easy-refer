import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'
import {JobModel} from '~/server/models/JobModel'
import {ReferModel} from '~/server/models/ReferModel'
import {ResumeModel} from '~/server/models/ResumeModel'

export class UserModel extends Model {
  public userId!: string
  public email!: string
  public experience!: number | null
  public name!: string | null
  public intro!: string | null
  public leetCodeUrl!: string | null
  public thirdPersonIntro!: string | null
  public phone!: string | null
  public avatar: string = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // 预先定义 include
  public readonly job?: JobModel
  public readonly ReferList?: ReferModel[]
  public readonly ResumeList?: ResumeModel[]

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
