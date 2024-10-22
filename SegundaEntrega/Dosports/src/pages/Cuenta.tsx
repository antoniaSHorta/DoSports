import React from 'react';
import { IonContent, IonPage, IonList, IonItem, IonButton, IonRouterLink, IonLabel } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Cuenta.css';

const Cuenta: React.FC = () => {
  return (
    <IonPage>
      <Head />

      <IonContent>
        <IonList className="alinear">
          <IonItem className="cuenta-item">
            <IonRouterLink routerLink={`/historial`}>
              <IonLabel className="letras">Historial</IonLabel>
            </IonRouterLink>
          </IonItem>
          <IonItem className="cuenta-item">
            <IonRouterLink routerLink={`/asesoramiento`}>
              <IonLabel className="letras">Asesoramiento</IonLabel>
            </IonRouterLink>
          </IonItem>
          <IonItem className="cuenta-item">
            <IonRouterLink routerLink={`/home`}>
              <IonButton className="boton-cerrar" expand="full">Cerrar Sesión</IonButton>
            </IonRouterLink>
          </IonItem>
        </IonList>
      </IonContent>

      <Navbar />
    </IonPage>
  );
};

export default Cuenta;
