import { IonContent, IonPage, IonText, IonButton } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const handleIniciarSesion = () => {
    history.push('/iniciarSesion'); 
  };

  return (
    <IonPage>
      <IonContent fullscreen className="contenido">
        <div className="contenidoCentro">
          <IonText className="titulo">DoSports</IonText>
          <IonButton expand="block" className="botonIniciar" onClick={handleIniciarSesion}>
            Iniciar Sesión
          </IonButton>
        </div>
        <IonText className="crearCuenta">
          ¿No tienes una cuenta? <a href="/registro">Crear Cuenta</a>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
