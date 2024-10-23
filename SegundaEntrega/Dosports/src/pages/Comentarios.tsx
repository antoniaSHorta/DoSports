import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonButton, IonTextarea, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import deportesData from '../assets/deportes.json';  
import './comentarios.css';  

import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Comentarios: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const foro = deportesData.find(f => f.id === parseInt(id));

  const [replies, setReplies] = useState<{ [key: number]: string }>({});

  const handleReplyChange = (commentId: number, value: string) => {
    setReplies(prevReplies => ({
      ...prevReplies,
      [commentId]: value
    }));
  };

  const handleAddReply = (commentId: number) => {
    const commentIndex = foro?.comments.findIndex(c => c.id === commentId);
    if (commentIndex !== undefined && foro) {
      if (!foro.comments[commentIndex].replies) {
        foro.comments[commentIndex].replies = [];
      }
      foro.comments[commentIndex].replies.push(replies[commentId]);
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: ''
      }));
      console.log(`Respuesta agregada al comentario #${commentId}`);
    }
  };

  const handleAddComment = () => {
    console.log("Comentario agregado");
  };

  if (!foro) {
    return <p>Foro no encontrado</p>;
  }

  return (
    <IonPage>
      <Head />
      <IonHeader>
        <IonToolbar>
          <IonTitle>{foro.title}</IonTitle> {/* Muestra el título del foro */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="comments-container">
          <IonCard className="add-comment-card">
            <IonCardHeader>
              <IonCardTitle>Agregar un comentario</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonTextarea placeholder="Escribe tu comentario aquí..."></IonTextarea>
              <IonButton expand="full" onClick={handleAddComment}>Agregar Comentario</IonButton>
            </IonCardContent>
          </IonCard>

          {foro.comments.map(comment => (
            <IonCard key={comment.id} className="comment-card">
              <IonCardHeader>
                <IonCardTitle>Comentario #{comment.id}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{comment.text}</p>
                <div className="replies">
                  <strong>Respuestas:</strong>
                  {comment.replies && comment.replies.length > 0 ? (
                    comment.replies.map((reply, index) => (
                      <IonItem key={index} className="reply-item">
                        <IonLabel>{reply}</IonLabel>
                      </IonItem>
                    ))
                  ) : (
                    <IonLabel>No hay respuestas aún</IonLabel>
                  )}
                </div>

                <div className="reply-section">
                  <IonTextarea
                    placeholder="Escribe una respuesta..."
                    value={replies[comment.id] || ''}
                    onIonChange={e => handleReplyChange(comment.id, e.detail.value!)}
                  ></IonTextarea>
                  <IonButton
                    expand="full"
                    onClick={() => handleAddReply(comment.id)}
                  >
                    Responder
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Comentarios;
