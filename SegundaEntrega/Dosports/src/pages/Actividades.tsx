import React from 'react';
import { IonContent,IonRouterLink, IonPage,IonCard,IonButton,IonCardSubtitle,IonCardHeader,IonCardTitle,IonCardContent} from '@ionic/react';
import './Actividades.css';
import  actividadesData from '../assets/actividades.json';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Actividades: React.FC = () => {


  return (
    <IonPage>
    <Head />
      <IonContent>
      {actividadesData.map((actividad)=> (
      <IonCard key = {actividad.id}>
        <IonCardHeader>
          <IonCardTitle>{actividad.title}</IonCardTitle>
          <IonCardSubtitle>{actividad.date}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>{actividad.resumen}</IonCardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft:'10px', marginBottom:'10px'}}>          
        
        <IonRouterLink routerLink={`/actividad/${actividad.id}`}>
            <IonButton>Más Información</IonButton>
        </IonRouterLink>
        </div>
      </IonCard>
      ))};
      </IonContent>
      <Navbar></Navbar>
    </IonPage>

  );
};

export default Actividades;