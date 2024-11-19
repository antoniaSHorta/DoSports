import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard,IonText,IonList,IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Historial.css';

interface Actividad {
  idActividad: number;
  nombreActividad: string;
  fechaActividad: string;
  estado: string;
}

const Historial: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [error, setError] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const history = useHistory();

  const cargarHistorial = async () => {
    try {
      const usuarioString = localStorage.getItem('usuario');
      if (!usuarioString) {
        history.push('/iniciosesion');
        return;
      }

      const usuario = JSON.parse(usuarioString);
      const token = localStorage.getItem('token');

      if (!token) {
        history.push('/iniciosesion');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/historial/${usuario.id}`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error al obtener historial');
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      setError('Error al cargar el historial');
    }
  };

  const cancelarInscripcion = async (idActividad: number) => {
    try {
      const usuarioString = localStorage.getItem('usuario');
      const token = localStorage.getItem('token');
      
      if (!usuarioString || !token) {
        history.push('/iniciosesion');
        return;
      }

      const usuario = JSON.parse(usuarioString);

      const response = await fetch(
        `http://localhost:3000/api/actividades/cancelar/${idActividad}/${usuario.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensaje('Inscripción cancelada exitosamente');
        cargarHistorial();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error al cancelar la inscripción');
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, [history]);

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="historial-container">
          <h2 className="historial-title">Historial de Actividades</h2>
          
          {error && (
            <div className="mensaje-error">
              <IonText color="danger">{error}</IonText>
            </div>
          )}
          
          {mensaje && (
            <div className="mensaje-exito">
              <IonText color="success">{mensaje}</IonText>
            </div>
          )}

          <IonList>
            {actividades.map((actividad) => (
              <IonCard key={actividad.idActividad} className="actividad-card">
                <IonCardHeader>
                  <IonCardTitle style={{fontWeight: '600'}}>{actividad.nombreActividad}</IonCardTitle>
                  <IonCardSubtitle>
                    Fecha: {actividad.fechaActividad}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className={`estado-badge ${actividad.estado.toLowerCase()}`}>
                    {actividad.estado}
                  </div>
                  {actividad.estado === 'Pendiente' && (
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() => cancelarInscripcion(actividad.idActividad)}
                      className="boton-cancelar"
                    >
                      Eliminar
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Historial;