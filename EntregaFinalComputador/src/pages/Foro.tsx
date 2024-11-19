import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import { useHistory } from 'react-router-dom';
import Navbar from "../components/Navegationbar";
import Head from '../components/HeadIcon';
import './Foro.css';

interface Foro {
  idForo: number;
  titulo: string;
  descripcion: string;
}

const Foro: React.FC = () => {
  const [foros, setForos] = useState<Foro[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useHistory();

  useEffect(() => {
    cargarForos();
  }, []);

  const cargarForos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/iniciosesion');
        return;
      }

      setLoading(true);
      const response = await fetch('http://localhost:3000/api/foros', {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        router.push('/iniciosesion');
        return;
      }

      if (!response.ok) throw new Error('Error al cargar foros');
      const data = await response.json();
      setForos(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los foros');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <Head />
        <IonContent>
          <h2 style={{marginLeft:'20px'}}>Cargando...</h2>
        </IonContent>
        <Navbar />
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <Head />
        <IonContent>
          <h2 style={{marginLeft:'20px'}}>Error: {error}</h2>
        </IonContent>
        <Navbar />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Head />
      <IonContent>
        <div className="foro-container">
          {foros.map((foro) => (
            <IonCard key={foro.idForo}>
              <IonCardHeader>
                <IonCardTitle>{foro.titulo}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p style={{marginBottom:'20px'}}>{foro.descripcion}</p>
                <IonButton 
                  expand="block"
                  onClick={() => router.push(`/foro/${foro.idForo}`)}
                >
                  Entrar al foro
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Foro;