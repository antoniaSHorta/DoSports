import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage,IonCard, IonCardContent,IonItem,IonLabel,IonInput,IonText,IonButton} from '@ionic/react';

import Head from '../components/HeadIcon';
import './IniciarSesion.css';


const IniciarSesion: React.FC = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
      usuario: '',
      password: '',
    });
    
    const [error, setError] = useState('');
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setCredentials({
        ...credentials,
        [name]: value
      });
    };
  
    const handleLogin = () => {
      if (!credentials.usuario || !credentials.password) {
        setError('Por favor completa todos los campos');
      } else {
        setError('');
        console.log('Datos de inicio de sesión:', credentials);
        
        history.push('/inicio'); 
      }
    };
  
    return (
      <IonPage>
        <Head />
        <IonContent className="ion-padding">
          <div className="login-container">
            <IonCard className="login-form-card">
              <IonCardContent>
                <IonItem className="login-form-item">
                  <IonLabel position="stacked">Usuario</IonLabel>
                  <IonInput
                    type="text"
                    name="usuario"
                    value={credentials.usuario}
                    placeholder="Ingresa tu nombre de usuario"
                    onIonChange={handleChange}
                  />
                </IonItem>
  
                <IonItem className="login-form-item">
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Ingresa tu contraseña"
                    onIonChange={handleChange}
                  />
                </IonItem>
  
                {error && (
                  <div className="login-error-container">
                    <IonText color="danger">
                      <p className="login-error-message">{error}</p>
                    </IonText>
                  </div>
                )}
  
                <div className="login-button-container">
                  <IonButton className="login-button" expand="block" onClick={handleLogin}>
                    Iniciar Sesión
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  

export default IniciarSesion;