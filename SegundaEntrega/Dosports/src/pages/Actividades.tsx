import React from 'react';
import { IonContent, IonPage} from '@ionic/react';
import './Actividades.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Actividades: React.FC = () => {
  return (
    <IonPage>
    <Head />
      <IonContent>
        
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Actividades;