import { QueryInterface, Sequelize } from 'sequelize';

interface TaskSeedData {
  title: string;
  genre: string;
  description: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

const seeder = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    try {
      const tasks: TaskSeedData[] = [
        {
          title: 'Забытый город под водой',
          genre: 'Фэнтези',
          description:
            'Археолог обнаруживает древний город, скрытый на дне океана, где обитают потомки атлантов',
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Часы, которые останавливают время',
          genre: 'Мистика',
          description:
            'Антиквар находит карманные часы, способные замораживать время, но за каждую остановку он теряет часть памяти',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Последний библиотекарь',
          genre: 'Постапокалипсис',
          description:
            'В мире, где книги запрещены, последний библиотекарь пытается сохранить знания человечества',
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Фотограф, видящий прошлое',
          genre: 'Драма',
          description:
            'Фотограф обнаруживает, что может видеть прошлое людей через их фотографии, что приводит его к расследованию старого преступления',
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Садовник, выращивающий эмоции',
          genre: 'Магический реализм',
          description:
            'В особом саду растут цветы, которые воплощают человеческие эмоции: розы любви, кактусы ревности, ирисы печали',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Убийства в НеоТокио',
          genre: 'Киберпанк-детектив',
          description:
            'Частный детектив с киберимплантами расследует серию убийств среди корпоративной элиты будущего Токио',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Призрачный экспресс сквозь измерения',
          genre: 'Фантастика',
          description:
            'Поезд, который путешествует между параллельными реальностями, подбирая пассажиров, потерявшихся в пространстве-времени',
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Кондитер, создающий воспоминания',
          genre: 'Романтика',
          description:
            'Кондитер готовит десерты, которые позволяют людям заново пережить самые счастливые моменты их жизни',
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Тайное общество хранителей снов',
          genre: 'Приключения',
          description:
            'Подросток обнаруживает, что является наследником древнего общества, защищающего мир снов от кошмаров',
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Ангел, потерявший веру в человечество',
          genre: 'Философская проза',
          description:
            'Ангел, наблюдающий за людьми веками, решает стать смертным, чтобы понять, почему они продолжают бороться',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert('Tasks', tasks, {});
    } catch (error) {
      console.error('❌ Error seeding tasks:', error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    try {
      await queryInterface.bulkDelete('Tasks', {}, {});
    } catch (error) {
      console.error('❌ Error removing task seed data:', error);
      throw error;
    }
  },
};

export default seeder;
