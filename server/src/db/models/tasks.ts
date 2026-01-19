import { DataTypes, Sequelize, Model } from 'sequelize';
import { TaskAttributes, TaskCreationAttributes, DbModels } from '../../types';

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  declare id: number;
  declare title: string;
  declare genre: string;
  declare description: string;
  declare user_id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: DbModels): void {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
}

export default (sequelize: Sequelize): typeof Task => {
  Task.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      genre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks',
    },
  );

  return Task;
};