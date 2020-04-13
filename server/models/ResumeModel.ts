import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export class ResumeModel extends Model {
  public static associate(db: any) {
    db.Resume.belongsTo(db.User)
    db.Resume.belongsTo(db.Refer)
  }
}

export default function (sequelize: Sequelize, DataTypes: any) {
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
