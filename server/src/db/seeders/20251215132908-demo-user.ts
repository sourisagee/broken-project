import bcrypt from 'bcrypt';
import { QueryInterface, Sequelize } from 'sequelize';

interface UserSeedData {
  username: string;
  email: string;
  password: string;
  role: 'writer' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

const seeder = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    const user1Password = await bcrypt.hash('12345678Qq!', 10);
    const user2Password = await bcrypt.hash('12345678Qq!', 10);
    const user3Password = await bcrypt.hash('12345678Qq!', 10);
    const user4Password = await bcrypt.hash('12345678Qq!', 10);

    const users: UserSeedData[] = [
      {
        username: 'emily',
        email: 'emily@example.com',
        password: user1Password,
        role: 'writer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'john',
        email: 'john@example.com',
        password: user2Password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane',
        email: 'jane@example.com',
        password: user3Password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'robin',
        email: 'robin@example.com',
        password: user4Password,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    await queryInterface.bulkDelete('Users', {}, {});

    console.log('✅ Users seed reverted');
  },
};

export default seeder;
