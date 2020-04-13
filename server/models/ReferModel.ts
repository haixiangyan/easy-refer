import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'
import {ResumeModel} from '~/server/models/ResumeModel'
import {JobModel} from '~/server/models/JobModel'
import {UserModel} from '~/server/models/UserModel'

export class ReferModel extends Model {
  public referId!: string
  public name!: string | null
  public email!: string | null
  public phone!: string | null
  public experience!: number | null
  public intro!: string | null
  public leetCodeUrl!: string | null
  public thirdPersonIntro!: string | null
  public referLinks!: string | null
  public status!: string | null

  public readonly resume?: ResumeModel
  public readonly job?: JobModel
  public readonly referer?: UserModel
  public readonly referee?: UserModel

  public static associate(db: any) {
    db.Refer.hasOne(db.Resume)
    db.Refer.belongsTo(db.Job)
    db.Refer.belongsTo(db.User, {as: 'referer'})
    db.Refer.belongsTo(db.User, {as: 'referee'})
  }
}

export default function (sequelize: Sequelize, DataTypes: any) {
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

  ReferModel.init(attributes, options)

  return ReferModel
}
