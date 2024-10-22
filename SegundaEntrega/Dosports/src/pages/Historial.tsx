import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import historialData from '../assets/historial.json'; 

const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<any[]>([]);

  useEffect(() => {
    setHistorial(historialData);
  }, []);

  return (
    <IonPage>
      <Head />
      <IonContent>
        <IonCardTitle style={{marginLeft:'15px',marginBottom:'30px',marginTop:'30px'}}>Historial de Actividades</IonCardTitle>
        {historial.length === 0 ? (
          <p>No tienes actividades inscritas o realizadas.</p>
        ) : (
          historial.map((actividad) => (
            <IonCard key={actividad.id}>
              <IonCardHeader>
                <IonCardTitle>{actividad.title}</IonCardTitle>
                <IonCardSubtitle>{actividad.date}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
              <p style={{color: actividad.completed ? 'green' : 'red'}}> Estado: {actividad.completed ? 'Completada' : 'Inscrito/a'}</p>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Historial;
