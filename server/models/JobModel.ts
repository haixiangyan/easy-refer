import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'
import {UserModel} from '~/server/models/UserModel'
import {ReferModel} from '~/server/models/ReferModel'

export class JobModel extends Model {
  public jobId!: string
  public company!: string | null
  public requiredFields!: string | null
  public deadline!: string | null
  public expiration!: number | null
  public referTotal!: number | null
  public source!: string | null

  public readonly referer?: UserModel
  public readonly referList?: ReferModel[]

  public static associate(models: any) {
    models.Job.belongsTo(models.User, {as: 'referer'})
    models.Job.hasMany(models.Refer)
  }
}

export default function (sequelize: Sequelize, DataTypes: any) {
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

  JobModel.init(attributes, options)

  return JobModel
}
