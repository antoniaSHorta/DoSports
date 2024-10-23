import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonThumbnail } from '@ionic/react';
import deportesData from '../assets/deportes.json'; // Importamos el JSON
import { useHistory } from 'react-router-dom';
import Head from '../components/HeadIcon';
import Navbar from '../components/Navegationbar';

import './Foro.css';

const DeportesList: React.FC = () => {
  const history = useHistory();

  const goToForo = (id: number) => {
    history.push(`/foro/${id}`);
  };

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="custom-card-container">
          {deportesData.map(deporte => (
            <IonCard className="custom-card" key={deporte.id}>
              <IonCardHeader>
                <IonCardTitle>{deporte.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{deporte.resumen}</p>
                <IonButton onClick={() => goToForo(deporte.id)}>Ver Foro</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default DeportesList;