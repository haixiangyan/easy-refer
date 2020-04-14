import {DataTypes} from 'sequelize'
import {
  AllowNull,
  Column,
  Default,
  HasMany,
  HasOne,
  PrimaryKey,
  Table,
  Unique,
  Model,
  ForeignKey
} from 'sequelize-typescript'
import JobModel from './JobModel'
import ReferModel from './ReferModel'
import ResumeModel from './ResumeModel'

@Table({tableName: 'users'})
class UserModel extends Model<UserModel> {
  // 字段
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataTypes.UUID)
  public userId!: string

  @Unique
  @Column(DataTypes.STRING)
  public email!: string

  @Column(DataTypes.INTEGER)
  public experience!: number | null

  @Column(DataTypes.STRING)
  public name!: string | null

  @Column(DataTypes.TEXT)
  public intro!: string | null

  @Column(DataTypes.STRING)
  public leetCodeUrl!: string | null

  @Column(DataTypes.TEXT)
  public thirdPersonIntro!: string | null

  @Column(DataTypes.STRING)
  public phone!: string | null

  @Default('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')
  @Column(DataTypes.STRING)
  public avatar: string = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

  // 外键
  @ForeignKey(() => JobModel)
  @Column(DataTypes.UUID)
  public readonly jobId!: string | null

  // 关系
  @HasOne(() => JobModel)
  public readonly job?: JobModel

  @HasMany(() => ReferModel)
  public readonly referList?: ReferModel[]

  @HasMany(() => ResumeModel)
  public readonly resumeList?: ResumeModel[]
}

export default UserModel
