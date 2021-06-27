
import { useHistory, useParams } from 'react-router-dom';

import Modal from 'react-modal';
import { Fragment } from 'react';

import logoImg from '../assets/image/logo.svg';
import deleteImg from '../assets/image/delete.svg';
import checkImg from '../assets/image/check.svg';
import answerImg from '../assets/image/answer.svg';


import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';

import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { useState } from 'react';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }


  async function handleDeleteQuestion(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
          <div className="content">
            <img src={logoImg} alt="Letmeask" />
            <div>
              <RoomCode code={roomId}/>
              <Button
                isOutlined
                onClick={handleEndRoom}
              >Encerrar sala</Button>
            </div>
          </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span> }
        </div>


        <div className="question-list">
          {questions.map(question => {
            return(
              <Fragment>
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar Pergunta como respondida" />
                    </button>
                  
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setQuestionIdModalOpen(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
                <Modal
                  isOpen={questionIdModalOpen === question.id}
                  onRequestClose={() => setQuestionIdModalOpen(undefined)}
                  overlayClassName="overlay-modal"
                  bodyOpenClassName="modal-body"

                  style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    content: {
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      left: '0',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '20px',
                      width: '590px',
                      margin: '0 auto',
                      height: '362px',
                      
                    }
                  }}
                >
                  <div className="modal-content">
                    <img src={deleteImg} alt="Deletar uma pergunta" />
                    <h2>Excluir pergunta</h2>
                    <p>
                      Tem certeza que você deseja excluir esta pergunta?
                    </p>
                    <div className="buttons-modal">
                      <button onClick={() => setQuestionIdModalOpen(undefined)} >cancelar</button>
                      <button className="button-modal-delete" onClick={() => handleDeleteQuestion(question.id)}>Sim, excluir</button>
                    </div>
                  </div>
                </Modal>
              </Fragment>
            );
          })}
        </div>
      </main>


    </div>
  );
}