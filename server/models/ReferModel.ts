import {InitOptions, Model, ModelAttributes} from 'sequelize'
import {Sequelize} from 'sequelize/types/lib/sequelize'

export class ReferModel extends Model {
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
