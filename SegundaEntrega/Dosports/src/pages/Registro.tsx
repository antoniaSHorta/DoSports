import React,{ useState } from 'react';
import { IonContent, IonPage,IonCard, IonCardContent,IonItem,IonLabel,IonSelect,IonSelectOption,IonInput,IonText,IonButton} from '@ionic/react';
import './Registro.css';
import Head from '../components/HeadIcon';
import { useHistory } from 'react-router-dom';

const Registro: React.FC = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({
        region: '',
        comuna: '',
        usuario: '',
        correo: '',
        password: '',
        confirmPassword: ''
      });
    
      const [error, setError] = useState('');
    
      const validarCorreo = (correo: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(correo);
      };

      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });
      };
      const handleRegister = () => {
        if (!userData.region || !userData.correo || !userData.comuna || !userData.usuario || !userData.password || !userData.confirmPassword) {
          setError('Por favor completa todos los campos');
        } else if (!validarCorreo(userData.correo)) {
            setError('El formato del correo no es válido');
        } else if (userData.password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
        } else if (userData.password !== userData.confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError('');
          console.log('Datos de registro:', userData);
          history.push('/inicio');
          
        }
      }

      return (
        <IonPage>
          <Head />
          <IonContent className="ion-padding">
            <div className="registro-container">
              <IonCard className="registro-form-card">
                <IonCardContent>
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Usuario</IonLabel>
                    <IonInput
                      type="text"
                      name="usuario"
                      value={userData.usuario}
                      placeholder="Ingresa tu nombre de usuario"
                      onIonChange={handleChange}
                    />
                  </IonItem>
    
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Correo</IonLabel>
                    <IonInput
                      type="email"
                      name="correo"
                      value={userData.correo}
                      placeholder="Ingresa tu correo"
                      onIonChange={handleChange}
                    />
                  </IonItem>
    
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Región</IonLabel>
                    <IonSelect
                      name="region"
                      value={userData.region}
                      placeholder="Selecciona tu región"
                      onIonChange={handleChange}
                    >
                      <IonSelectOption value="Arica y Parinacota">Arica y Parinacota</IonSelectOption>
                      <IonSelectOption value="Tarapacá">Tarapacá</IonSelectOption>
                      <IonSelectOption value="Antofagasta">Antofagasta</IonSelectOption>
                      <IonSelectOption value="Atacama">Atacama</IonSelectOption>
                      <IonSelectOption value="Coquimbo">Coquimbo</IonSelectOption>
                      <IonSelectOption value="O'Higgins">O'Higgins</IonSelectOption>
                      <IonSelectOption value="Maule">Maule</IonSelectOption>
                      <IonSelectOption value="Ñuble">Ñuble</IonSelectOption>
                      <IonSelectOption value="La Araucanía">La Araucanía</IonSelectOption>
                      <IonSelectOption value="Los Ríos">Los Ríos</IonSelectOption>
                      <IonSelectOption value="Los Lagos">Los Lagos</IonSelectOption>
                      <IonSelectOption value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</IonSelectOption>
                      <IonSelectOption value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</IonSelectOption>
                    </IonSelect>
                  </IonItem>
    
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Comuna</IonLabel>
                    <IonInput
                      type="text"
                      name="comuna"
                      value={userData.comuna}
                      placeholder="Ingresa tu comuna"
                      onIonChange={handleChange}
                    />
                  </IonItem>
    
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      name="password"
                      value={userData.password}
                      placeholder="Ingresa tu contraseña"
                      onIonChange={handleChange}
                    />
                  </IonItem>
    
                  <IonItem className="registro-form-item">
                    <IonLabel position="stacked">Confirmar Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      placeholder="Confirma tu contraseña"
                      onIonChange={handleChange}
                    />
                  </IonItem>
    
                  {error && (
                    <div className="registro-error-container">
                      <IonText color="danger">
                        <p className="registro-error-message">{error}</p>
                      </IonText>
                    </div>
                  )}
    
                  <div className="registro-button-container">
                    <IonButton expand="block" className="registro-button" onClick={handleRegister}>
                      Registrarse
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      );
    };
export default Registro;