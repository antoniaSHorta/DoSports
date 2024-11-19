import React, { useState} from 'react';
import { IonContent, IonPage,IonText, IonRouterLink,IonCardContent,IonCard,IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Head from '../components/HeadIcon';
import './InicioSesion.css';

const InicioSesion: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try 
      {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ usuario, contrasena }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
          history.push('/home');
        } 

        else 
        {
          setError(data.message);
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      }
    };
    
    // INICIO FRONT END IONIC //
    return (
      <IonPage>
        <Head />
        <IonContent className="ion-padding">
          <div className="login-container">
            <IonCard className="login-form-card">
              <IonCardContent>
                <IonItem className="login-form-item">
                  <IonLabel position="stacked">Usuario</IonLabel>
                  <IonInput type="text" value={usuario} placeholder="Ingresa tu usuario" onIonChange={e => setUsuario(e.detail.value!)} required/>
                </IonItem>
  
                <IonItem className="login-form-item">
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput type="password" value={contrasena} placeholder="Ingresa tu contraseña" onIonChange={e => setContrasena(e.detail.value!)} required />
                </IonItem>
  
                {error && (
                  <div className="login-error-container">
                    <IonText color="danger">
                      <p className="login-error-message">{error}</p>
                    </IonText>
                  </div>
                )}

                <div className="login-button-container">
                <IonButton className="login-button" expand="block" onClick={handleSubmit}>Iniciar Sesión</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
          <IonText className="crearCuentaInicio">¿No tienes una cuenta?<IonRouterLink onClick={() => history.push('/registrar')} className= "crear" > Crear Cuenta</IonRouterLink></IonText>
        </IonContent>
      </IonPage>
    );
  };
  
  export default InicioSesion;