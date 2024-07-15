import { DataTypes, Model, Optional } from 'sequelize';
import todoSequelize from '../setup/database';
import { UserAttributes } from '../../interfaces/db-models/UserAttributes';

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'profileImgUrl'> {}

// Define the Todo model class
class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public profileImgUrl!: string;

  // Timestamps
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    profileImgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'Users', sequelize: todoSequelize },
);

export default UserModel;
