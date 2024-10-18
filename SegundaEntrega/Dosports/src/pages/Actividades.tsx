import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Actividades: React.FC = () => {
  return (
    <IonPage>
    <Head />
      <IonContent>
        <p>Aquí puedes ver todas las actividades disponibles.</p>
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Actividades;