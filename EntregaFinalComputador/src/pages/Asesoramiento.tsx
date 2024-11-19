import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonTextarea, IonSelect, IonSelectOption, IonLabel, IonItem, IonModal, IonFab, IonFabButton, IonIcon, IonCardSubtitle } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    cargarConsultas();
    cargarHorariosDisponibles();
  }, []);

  const verificarAutenticacion = () => {
    const token = localStorage.getItem('token');
    const usuarioString = localStorage.getItem('usuario');
    
    if (!token || !usuarioString) {
      history.push('/iniciosesion');
      return null;
    }

    try {
      const usuario = JSON.parse(usuarioString);
      return { token, usuario };
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      history.push('/iniciosesion');
      return null;
    }
  };

  const cargarConsultas = async () => {
    const auth = verificarAutenticacion();
    if (!auth) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/asesoramiento/consultas/${auth.usuario.id}`, {
        headers: {
          'Authorization': auth.token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        history.push('/iniciosesion');
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar consultas');
      }

      setConsultas(data);
      setError('');
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Error al cargar las consultas');
    } finally {
      setLoading(false);
    }
  };

  const cargarHorariosDisponibles = async () => {
    const auth = verificarAutenticacion();
    if (!auth) return;

    try {
      const response = await fetch('http://localhost:3000/api/asesoramiento/horarios', {
        headers: {
          'Authorization': auth.token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        history.push('/iniciosesion');
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar horarios');
      }

      setHorariosDisponibles(data);
      setError('');
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Error al cargar los horarios disponibles');
    }
  };

  const enviarConsulta = async () => {
    const auth = verificarAutenticacion();
    if (!auth) return;

    if (!nuevaConsulta.tipo || !nuevaConsulta.descripcion || !nuevaConsulta.fechaHora) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/asesoramiento', {
        method: 'POST',
        headers: {
          'Authorization': auth.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUsuario: auth.usuario.id,
          ...nuevaConsulta
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar la consulta');
      }

      setMensaje('Tu consulta ha sido enviada exitosamente');
      setNuevaConsulta({ tipo: '', descripcion: '', fechaHora: '' });
      setIsModalOpen(false);
      setError('');
      cargarConsultas();
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Error al enviar la consulta');
    }
  };

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="asesoramiento-container">
          <h2 style={{fontWeight: '600'}}className="asesoramiento-titulo">Asesoramiento Deportivo</h2>
          
          <div className="consultas-existentes">
            <h3 style={{fontWeight: '600'}}>Mis Consultas</h3>
            {consultas.map((consulta) => (
              <IonCard key={consulta.idConsulta} className="consulta-card">
                <IonCardHeader>
                  <IonCardTitle style={{fontWeight: '600'}}>{consulta.tipo}</IonCardTitle>
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