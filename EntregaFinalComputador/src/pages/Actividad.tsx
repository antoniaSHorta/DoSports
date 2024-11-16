import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Actividad.css';

interface Actividad {
    idActividad: number;
    nombreActividad: string;
    descripcion: string;
    fechaActividad: string;
    resumen: string;
}

const Actividad: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [actividad, setActividad] = useState<Actividad | null>(null);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error' | ''>('');

    useEffect(() => {
        const fetchActividad = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/actividades/${id}`);
                if (!response.ok) {
                    throw new Error('Actividad no encontrada');
                }
                const data = await response.json();
                setActividad(data);
            } catch (error) {
                console.error('Error al obtener la actividad:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividad();
    }, [id]);

    const handleInscribirse = async () => {
        const usuarioActual = localStorage.getItem('usuario');
        const idUsuario = usuarioActual ? JSON.parse(usuarioActual).id : null;
    
        if (!idUsuario) {
            setMensaje('Debes iniciar sesión para inscribirte');
            setTipoMensaje('error');
            return;
        }
    
        if (actividad) {
            try {
                const response = await fetch('http://localhost:3000/api/actividades/inscribir', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        idUsuario: idUsuario, 
                        idActividad: actividad.idActividad 
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    setMensaje(`Te has inscrito exitosamente en ${actividad.nombreActividad}`);
                    setTipoMensaje('success');
                } else {
                    setMensaje(data.message);
                    setTipoMensaje('error');
                }
            } catch (error) {
                setMensaje('Error al conectar con el servidor');
                setTipoMensaje('error');
            }
        }
    };
    if (loading) {
        return (
            <IonPage>
                <Head />
                <IonContent>
                    <h2>Cargando...</h2>
                </IonContent>
                <Navbar />
            </IonPage>
        );
    }

    if (!actividad) {
        return (
            <IonPage>
                <Head />
                <IonContent>
                    <h2>Actividad no encontrada o finalizada</h2>
                </IonContent>
                <Navbar />
            </IonPage>
        );
    }

    return (
        <IonPage>
            <Head />
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{actividad?.nombreActividad}</IonCardTitle>
                        <IonCardSubtitle>{actividad?.fechaActividad}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent style={{color: 'black'}}>
                        <p>{actividad?.descripcion}</p>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <IonButton onClick={handleInscribirse}>Inscribirme</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
                
                {mensaje && (
                    <div className="asesoramiento-container">
                        <div className={mensaje.includes('inscrito exitosamente') ? 'mensaje-exito' : 'mensaje-error'}>
                            <p>{mensaje}</p>
                        </div>
                    </div>
                )}
            </IonContent>
            <Navbar />
        </IonPage>
    );
};

export default Actividad;