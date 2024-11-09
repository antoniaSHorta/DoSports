import { IonContent, IonPage, IonText, IonButton,IonRouterLink  } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Inicial.css';

const Inicial: React.FC = () => {
  const history = useHistory();

  const IrIniciarSesion = () => {
    history.push('/iniciosesion'); 
  };

  const IrRegistro = () =>{
    history.push('/registrar')
  };
  return (
    <IonPage>
      <IonContent fullscreen className="contenido">
        <div className="contenidoCentro">
          <IonText className="titulo">DoSports</IonText>
          <IonButton expand="block" className="botonIniciar" onClick={IrIniciarSesion}>
            Iniciar Sesión
          </IonButton>
        </div>
        <IonText className="crearCuenta">
          ¿No tienes una cuenta?
        <IonRouterLink onClick={IrRegistro} className= "crear" > Crear Cuenta</IonRouterLink>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Inicial;
