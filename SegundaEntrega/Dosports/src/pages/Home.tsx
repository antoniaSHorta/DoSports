import { IonContent,IonPage, IonText,IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="contenido">
        <div className="contenidoCentro">
          <IonText className="titulo">DoSports</IonText>
          <IonButton expand="block" className="botonIniciar">Iniciar Sesión</IonButton>
        </div>
        <IonText className="crearCuenta">¿No tienes una cuenta? <a href="#">Crear Cuenta</a>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
