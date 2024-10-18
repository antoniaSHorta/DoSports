import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Foro: React.FC = () => {
  return (
    <IonPage>
    <Head /> 
      <IonContent>
        <p>Bienvenido al foro! Comparte y discute temas aquí.</p>
      </IonContent>
      <Navbar></Navbar>

    </IonPage>
  );
};

export default Foro;