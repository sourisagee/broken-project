import { Outlet, useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import type { UserAttributes } from '../../types/authTypes';

interface MainPageProps {
  user: UserAttributes | null;
}

export default function MainPage({ user }: MainPageProps): React.JSX.Element {
  const location = useLocation();
  const isMainPage: boolean = location.pathname === '/';

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container mt-4">
        <Outlet />
        {isMainPage && (
          <div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>Кто мы?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  Привет! <strong>StoryMuse</strong> – это приложение для писателей и тех, кто хочет
                  поделиться своими идеями.
                  <br />
                  <br />
                  Здесь пользователи могут разместить свои идеи и получить возможность воплотить их
                  в реальность, а авторы произведений – вдохновиться и связаться с автором задумки
                  для подробного обсуждения концепта, имеющихся наработок и дальнейшего
                  сотрудничества.
                </Accordion.Body>
              </Accordion.Item>

              {!user && (
                <div>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Как мне начать пользоваться приложением?</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      Пожалуйста, <strong>зарегистрируйтесь или авторизуйтесь</strong> для доступа к
                      приложению.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <strong>Какой функционал будет мне доступен после авторизации?</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <p>
                          <strong>Для авторов идей и вдохновителей:</strong>
                        </p>
                        <ul>
                          <li>Создание, редактирование, удаление ваших идей</li>
                          <li>Просмотр всех размещенных в приложении идей</li>
                        </ul>
                      </div>

                      <div>
                        <p>
                          <strong>Для писателей и авторов произведений:</strong>
                        </p>
                        <ul>
                          <li>Просмотр всех доступных идей, опубликованных вдохновителями</li>
                          <li>
                            Получение контактов автора понравившейся идеи для ее дальнейшего
                            обсуждения и сотрудничества
                          </li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              )}
            </Accordion>
          </div>
        )}
      </main>
    </div>
  );
}
