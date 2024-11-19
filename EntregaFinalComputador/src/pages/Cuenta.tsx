import React from 'react';
import { IonContent, IonPage, IonList, IonItem, IonButton, IonRouterLink, IonLabel, IonIcon } from '@ionic/react';
import { timeOutline, personOutline,helpCircleOutline,clipboardOutline,logOutOutline } from 'ionicons/icons';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';


const Cuenta: React.FC = () => {
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div style={{marginTop:'10px'}}  className="cuenta-container">
          <IonList >
            <IonItem className="cuenta-item" routerLink="/editarcuenta">
                <IonIcon icon={personOutline} slot="start" className="cuenta-icon" />
                <IonLabel>Editar Perfil</IonLabel>
            </IonItem>
            <IonItem className="cuenta-item" routerLink="/historial">
              <IonIcon icon={timeOutline} slot="start" className="cuenta-icon" />
              <IonLabel>Historial de Actividades</IonLabel>
            </IonItem>

            <IonItem className="cuenta-item" routerLink="/asesoramiento">
              <IonIcon icon={clipboardOutline} slot="start" className="cuenta-icon" />
              <IonLabel>Solicitar Asesoramiento</IonLabel>
            </IonItem>

            <IonItem 
              className="cuenta-item" 
              style={{ cursor: 'pointer' }} 
              onClick={cerrarSesion}
            >
              <IonIcon icon={logOutOutline} slot="start" className="cuenta-icon" />
              <IonLabel color="danger">Cerrar Sesión</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Cuenta;