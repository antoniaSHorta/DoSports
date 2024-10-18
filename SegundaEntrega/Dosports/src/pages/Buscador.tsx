import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
const Buscador: React.FC = () => {
  return (
    <IonPage>
      <Head />
      <IonContent>
        <p>Utiliza el buscador para encontrar lo que necesitas.</p>
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Buscador;