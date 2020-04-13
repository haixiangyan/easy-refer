import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export default function (sequelize: Sequelize, DataTypes: any) {
  class JobModel extends Model {
    public static associate(models: any) {
      models.Job.belongsTo(models.User, {as: 'referer'})
      models.Job.hasMany(models.Refer)
    }
  }

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
