import { useEffect, useState } from 'react';
import { TaskApi } from '../../entities/TaskApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form, Modal } from 'react-bootstrap';
import type { UserAttributes } from '../../types/authTypes';
import type { TaskAttributes, UpdateTaskData } from '../../types/taskTypes';
import { UserApi } from '../../entities';

interface OneTaskPageProps {
  user: UserAttributes | null;
}

const INITIAL_FORM_DATA: UpdateTaskData = {
  title: '',
  genre: '',
  description: '',
};

export default function OneTaskPage({ user }: OneTaskPageProps): React.JSX.Element {
  const { taskId } = useParams();
  const numTaskId = Number(taskId);

  const [formData, setFormData] = useState<UpdateTaskData>(INITIAL_FORM_DATA);
  const [currentTask, setCurrentTask] = useState<TaskAttributes | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [taskOwnerContacts, setTaskOwnerContacts] = useState<TaskOwnerContacts>();
  const [showContactsModal, setShowContactsModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentTask = async (): Promise<void> => {
      if (!numTaskId || isNaN(numTaskId)) return;

      try {
        const response = await TaskApi.getById(numTaskId);

        if (response.data) {
          console.log(response.data);

          setCurrentTask(response.data);
          setFormData({
            title: response.data.title,
            genre: response.data.genre,
            description: response.data.description,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentTask();
  }, [numTaskId]);

  const handleUpdate = async (): Promise<void> => {
    if (!currentTask) return;

    try {
      await TaskApi.updateById(numTaskId, formData);

      setEditMode(false);

      const response = await TaskApi.getById(numTaskId);
      setCurrentTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await TaskApi.deleteById(numTaskId);

      setShowDeleteModal(false);
      navigate('/userTasks');
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactsRequest = async (): Promise<void> => {
    try {
      if (!currentTask) return;

      const currentTaskOwnerId: number = currentTask.user_id;

      const response = setShowContactsModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentTask) return <div>Поиск идеи...</div>;

  const isOwner = user && currentTask.user_id === user.id;

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={8} xl={6} className="mb-3">
            <Card className="h-100">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Текущая идея</h3>
              </Card.Header>

              <Card.Body>
                <Card.Title className="fs-6">
                  <h5>Идея №{currentTask.id}</h5>
                </Card.Title>

                {editMode ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Название:</Form.Label>
                    <Form.Control
                      name="title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <Form.Label>Жанр:</Form.Label>
                    <Form.Control
                      name="genre"
                      value={formData.genre || ''}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    />

                    <Form.Label>Описание:</Form.Label>
                    <Form.Control
                      name="description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </Form.Group>
                ) : (
                  <Card.Text>
                    <strong>Название:</strong> {currentTask.title} <br />
                    <strong>Жанр:</strong> {currentTask.genre} <br />
                    <strong>Описание:</strong> {currentTask.description} <br />
                  </Card.Text>
                )}
              </Card.Body>

              {user && user.role === 'writer' && (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <Button onClick={() => setShowContactsModal(true)} variant={'primary'}>
                    Связаться с автором
                  </Button>
                </div>
              )}

              {isOwner && (
                <Card.Footer className="d-flex justify-content-center">
                  {editMode ? (
                    <>
                      <Button variant="success" size="sm" onClick={handleUpdate} className="me-2">
                        Сохранить
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setEditMode(false)}>
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setEditMode(true)}
                        className="me-2"
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Удалить
                      </Button>
                    </>
                  )}
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>

        {isOwner && (
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Подтверждение удаления</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы уверены, что хотите удалить идею "{currentTask.title}"?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Отмена
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {user && user.role === 'writer' && (
          <Modal show={showContactsModal} onHide={() => setShowContactsModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Контакты автора идеи</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>Имя вдохновителя:</strong> {currentTask.User.username} <br />
              <strong>Email вдохновителя:</strong> {currentTask.User.email} <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowContactsModal(false)}>
                Закрыть
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}
