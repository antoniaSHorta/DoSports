import React, { useState } from 'react';
import { IonContent, IonPage,IonCard, IonCardContent,IonItem,IonLabel,IonToast,IonInput,IonText,IonButton} from '@ionic/react';
import Head from '../components/HeadIcon';
import Navbar from "../components/Navegationbar";
import './Asesoramiento.css';

const Asesoramiento: React.FC = () => {
  const [asesoramientoData, setAsesoramientoData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    estado: 'pendiente', 
  });

  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState(''); 
  const [mensajeError, setMensajeError] = useState(''); 

  const validarCorreo = (correo: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  const validarFecha = (fecha: string) => {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    return fechaRegex.test(fecha);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAsesoramientoData({
      ...asesoramientoData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const errorMessage = validarDatos(asesoramientoData);
    if (errorMessage) {
      setError(errorMessage);
      return; 
    }
    setError('');
    console.log('Datos de asesoramiento:', asesoramientoData);

   
    const isAgendado = true; 

    if (isAgendado) {
      setMensajeExito('Asesoramiento agendado con éxito. Espera la confirmación.');
      setMensajeError(''); 
    } else {
      setMensajeError('No se pudo agendar el asesoramiento. Inténtalo nuevamente.');
      setMensajeExito(''); 
    }
  };

  const validarDatos = (data: typeof asesoramientoData) => {
    if (!data.nombre || !data.email || !data.fecha) {
      return 'Por favor completa todos los campos';
    }
    if (!validarCorreo(data.email)) {
      return 'El formato del correo no es válido';
    }
    if (!validarFecha(data.fecha)) {
      return 'El formato de la fecha debe ser YYYY-MM-DD';
    }
    return '';
  };

  return (
    <IonPage>
      <Head />
      <IonContent className="ion-padding">
        <div className="asesoramiento-container">
          <IonCard className="asesoramiento-form-card">
            <IonCardContent>
              <IonItem className="asesoramiento-form-item">
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  type="text"
                  name="nombre"
                  value={asesoramientoData.nombre}
                  placeholder="Ingresa tu nombre"
                  onIonChange={handleChange}
                />
              </IonItem>

              <IonItem className="asesoramiento-form-item">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  name="email"
                  value={asesoramientoData.email}
                  placeholder="Ingresa tu correo"
                  onIonChange={handleChange}
                />
              </IonItem>

              <IonItem className="asesoramiento-form-item">
                <IonLabel position="stacked">Fecha</IonLabel>
                <IonInput
                  type="text"
                  name="fecha"
                  value={asesoramientoData.fecha}
                  placeholder="DD/MM/AAAA"
                  onIonChange={handleChange}
                />
              </IonItem>

              {error && (
                <div className="asesoramiento-error-container">
                  <IonText color="danger">
                    <p className="asesoramiento-error-message">{error}</p>
                  </IonText>
                </div>
              )}

              <div className="asesoramiento-button-container">
                <IonButton expand="block" className="asesoramiento-button" onClick={handleSubmit}>
                  Agendar Asesoramiento
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          <IonToast
            isOpen={!!mensajeExito}
            onDidDismiss={() => setMensajeExito('')}
            message={mensajeExito}
            duration={2000}
            position="top"
            color="success"
          />

          <IonToast
            isOpen={!!mensajeError}
            onDidDismiss={() => setMensajeError('')}
            message={mensajeError}
            duration={2000}
            position="top"
            color="danger"
          />
        </div>
      </IonContent>
      <Navbar></Navbar>
    </IonPage>
  );
};

export default Asesoramiento;
