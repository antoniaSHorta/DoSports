import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonTextarea, IonSelect, IonSelectOption, IonLabel, IonItem, IonModal, IonFab, IonFabButton, IonIcon,IonCardSubtitle } from '@ionic/react';
import { add } from 'ionicons/icons';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Asesoramiento.css';

interface Consulta {
  idConsulta: number;
  tipo: string;
  descripcion: string;
  estado: string;
  fechaHora: string;
  respuesta?: string;
}

const Asesoramiento: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nuevaConsulta, setNuevaConsulta] = useState({
    tipo: '',
    descripcion: '',
    fechaHora: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);

  useEffect(() => {
    cargarConsultas();
    cargarHorariosDisponibles();
  }, []);

  const cargarConsultas = async () => {
    const usuarioActual = localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario') || '{}')
      : null;

    if (!usuarioActual?.id) return;

    try {
      const response = await fetch(`http://localhost:3000/api/asesoramiento/consultas/${usuarioActual.id}`);
      if (!response.ok) throw new Error('Error al cargar consultas');
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar las consultas');
    }
  };

  const cargarHorariosDisponibles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/asesoramiento/horarios');
      if (!response.ok) throw new Error('Error al cargar horarios');
      const data = await response.json();
      setHorariosDisponibles(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los horarios disponibles');
    }
  };

  const enviarConsulta = async () => {
    const usuarioActual = localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario') || '{}')
      : null;

    if (!usuarioActual?.id) {
      setError('Debes iniciar sesión para enviar una consulta');
      return;
    }

    if (!nuevaConsulta.tipo || !nuevaConsulta.descripcion || !nuevaConsulta.fechaHora) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/asesoramiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: usuarioActual.id,
          ...nuevaConsulta
        })
      });

      if (!response.ok) throw new Error('Error al enviar la consulta');
      
      setMensaje('Tu consulta ha sido enviada exitosamente');
      setNuevaConsulta({ tipo: '', descripcion: '', fechaHora: '' });
      setIsModalOpen(false);
      cargarConsultas();
    } catch (error) {
      console.error('Error:', error);
      setError('Error al enviar la consulta');
    }
  };

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="asesoramiento-container">
          <h2 className="asesoramiento-titulo">Asesoramiento Deportivo</h2>
          
          <div className="consultas-existentes">
            <h3>Mis Consultas</h3>
            {consultas.map((consulta) => (
              <IonCard key={consulta.idConsulta} className="consulta-card">
                <IonCardHeader>
                  <IonCardTitle>{consulta.tipo}</IonCardTitle>
                  <IonCardSubtitle>
                    Fecha: {new Date(consulta.fechaHora).toLocaleString()}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>{consulta.descripcion}</p>
                  <div className={`estado-badge ${consulta.estado.toLowerCase()}`}>
                    {consulta.estado}
                  </div>
                  {consulta.respuesta && (
                    <div className="respuesta-section">
                      <p><strong>Respuesta:</strong> {consulta.respuesta}</p>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => setIsModalOpen(true)}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>

          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonContent>
              <div className="nueva-consulta-form">
                <h3>Nueva Consulta</h3>
                <IonItem>
                  <IonLabel position="stacked">Tipo de Consulta</IonLabel>
                  <IonSelect 
                    value={nuevaConsulta.tipo}
                    onIonChange={e => setNuevaConsulta({...nuevaConsulta, tipo: e.detail.value})}
                  >
                    <IonSelectOption value="entrenamiento">Entrenamiento</IonSelectOption>
                    <IonSelectOption value="lesiones">Lesiones</IonSelectOption>
                    <IonSelectOption value="nutricion">Nutrición</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Horario Disponible</IonLabel>
                  <IonSelect 
                    value={nuevaConsulta.fechaHora}
                    onIonChange={e => setNuevaConsulta({...nuevaConsulta, fechaHora: e.detail.value})}
                  >
                    {horariosDisponibles.map(horario => (
                      <IonSelectOption key={horario} value={horario}>
                        {new Date(horario).toLocaleString()}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonTextarea
                    value={nuevaConsulta.descripcion}
                    onIonChange={e => setNuevaConsulta({...nuevaConsulta, descripcion: e.detail.value || ''})}
                    rows={4}
                  />
                </IonItem>

                {error && <p className="error-message">{error}</p>}
                {mensaje && <p className="success-message">{mensaje}</p>}
                
                <IonButton expand="block" onClick={enviarConsulta}>
                  Solicitar Asesoramiento
                </IonButton>
                <IonButton expand="block" fill="clear" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </IonButton>
              </div>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Asesoramiento;