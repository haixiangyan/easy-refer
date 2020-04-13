import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export default function (sequelize: Sequelize, DataTypes: any) {
  class ReferModel extends Model {
    public static associate(models: any) {
      models.Refer.hasOne(models.Resume)
      models.Refer.belongsTo(models.Job)
      models.Refer.belongsTo(models.User, {as: 'referer'})
      models.Refer.belongsTo(models.User, {as: 'referee'})
    }
  }

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
