import {DataTypes} from 'sequelize'
import UserModel from './UserModel'
import ReferModel from './ReferModel'
import {AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript'

@Table({tableName: 'jobs'})
class JobModel extends Model<JobModel> {
  // 字段
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataTypes.UUID)
  public jobId!: string

  @Column(DataTypes.STRING)
  public company!: string | null

  @Column(DataTypes.STRING)
  public requiredFields!: string | null

  @Column(DataTypes.DATE)
  public deadline!: Date | null

  @Column(DataTypes.INTEGER)
  public expiration!: number | null

  @Column(DataTypes.INTEGER)
  public referTotal!: number | null

  @Column(DataTypes.STRING)
  public source!: string | null

  // 外键
  @ForeignKey(() => UserModel)
  public readonly refererId!: string | null

  // 关系
  @BelongsTo(() => UserModel)
  public readonly referer?: UserModel

  @HasMany(() => ReferModel)
  public readonly referList?: ReferModel[]
}

export default JobModel
