import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/react';
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
  const usuarioActual = localStorage.getItem('usuario') 
    ? JSON.parse(localStorage.getItem('usuario') || '{}') 
    : null;

  useEffect(() => {
    const cargarHistorial = async () => {
      if (!usuarioActual?.id) return;

      try {
        const response = await fetch(`http://localhost:3000/api/historial/${usuarioActual.id}`);
        if (!response.ok) throw new Error('Error al cargar el historial');
        const data = await response.json();
        setActividades(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    cargarHistorial();
  }, [usuarioActual?.id]);

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="historial-container">
          <h2 className="historial-titulo">Historial actividades</h2>
          {actividades.map((actividad) => (
            <IonCard key={actividad.idActividad} className="historial-card">
              <IonCardHeader>
                <IonCardTitle>{actividad.nombreActividad}</IonCardTitle>
                <IonCardSubtitle>
                  Fecha: {new Date(actividad.fechaActividad).toLocaleDateString()}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className={`estado-badge ${actividad.estado.toLowerCase()}`}>
                  {actividad.estado}
                </div>
              </IonCardContent>
            </IonCard>
          ))}
          {actividades.length === 0 && (
            <div className="no-actividades">
              No has participado en ninguna actividad aún
            </div>
          )}
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};


export default Historial;