import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
const Cuenta: React.FC = () => {
  return (
    <IonPage>
      <Head />
      <IonContent>
        <p>Gestiona tu cuenta y configuración aquí.</p>
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Cuenta;