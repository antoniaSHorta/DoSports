import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Inicio.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Inicio: React.FC = () => {
  return (
    <IonPage>
       <Head />
      <IonContent>
        <p>Contenido de la página de inicio</p>
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Inicio;
