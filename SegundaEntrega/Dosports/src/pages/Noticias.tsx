import React from 'react';
import { IonContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Noticias: React.FC = () => {
  return (
    <IonPage>
      <Head /> 
      <IonToolbar>
        <IonTitle>NOTICIAS</IonTitle>
      </IonToolbar>
      <IonContent>
        <p>REVISA LAS NOTICIAS MAS IMPORTANTES DEL MUNDO</p>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Noticias;
