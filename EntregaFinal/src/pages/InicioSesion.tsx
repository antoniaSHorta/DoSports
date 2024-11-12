import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage,IonCard, IonRouterLink, IonCardContent,IonItem,IonLabel,IonInput,IonText,IonButton} from '@ionic/react';

import Head from '../components/HeadIcon';
import './InicioSesion.css';

const InicioSesion: React.FC = () =>{
    const history = useHistory();

    const IrRegistro = () =>{
      history.push('/registrar')
    };
    const [credentials, setCredentials] = useState({
      usuario: '',
      contrasena: '',
    });

    
    const [error, setError] = useState('');
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setCredentials({
        ...credentials,
        [name]: value
      });
    };
  
    const handleLogin = async () => {
      if (!credentials.usuario || !credentials.contrasena) {
        setError('Por favor completa todos los campos');
      } 
      else {
        setError('');
        try{
          const response = await fetch('http://localhost:3000/api/autenticacion/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
          
          const data = await  response.json();

          if(response.ok){
            console.log('Inicio de sesion exitoso:', data);
            history.push('/home');
          }
          else{
            setError(data.message || 'Error al iniciar sesión');
          }
        } catch (error){
          setError('Error al conectar con el servidor');
        }
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
                    name="contrasena"
                    value={credentials.contrasena}
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
          <IonText className="crearCuentaInicio">¿No tienes una cuenta?<IonRouterLink onClick={IrRegistro} className= "crear" > Crear Cuenta</IonRouterLink>
        </IonText>
        </IonContent>
      </IonPage>
    );
  };

export default InicioSesion;