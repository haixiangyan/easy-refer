import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export default function (sequelize: Sequelize, DataTypes: any) {
  class ResumeModel extends Model {
    public static associate(models: any) {
      models.Resume.belongsTo(models.User)
      models.Resume.belongsTo(models.Refer)
    }
  }

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

  ResumeModel.init(attributes, options)

  return ResumeModel
}
