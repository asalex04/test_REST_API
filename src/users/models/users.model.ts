import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table
export class User extends Model {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare name: string
}
