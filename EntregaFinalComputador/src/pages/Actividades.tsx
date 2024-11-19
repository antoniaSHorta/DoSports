import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonRouterLink } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

interface Actividad {
    idActividad: number;
    nombreActividad: string;
    descripcion: string;
    fechaActividad: string;
    resumen: string;
}

const Actividades: React.FC = () => {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [error, setError] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const fetchActividades = async () => {
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

                const response = await fetch('http://localhost:3000/api/actividades', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 403) {
                    history.push('/iniciosesion');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Error al obtener actividades');
                }

                const data = await response.json();
                setActividades(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                setError('Error al cargar las actividades');
            }
        };

        fetchActividades();
    }, [history]);

    if (error) {
        return (
            <IonPage>
                <Head />
                <IonContent>
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                </IonContent>
                <Navbar />
            </IonPage>
        );
    }

    return (
        <IonPage>
            <Head />
            <IonContent>
                {actividades && actividades.length > 0 ? (
                    actividades.map((actividad) => (
                        <IonCard key={actividad.idActividad}>
                            <IonCardHeader>
                                <IonCardTitle style={{fontWeight: '600'}}>{actividad.nombreActividad}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p style={{color: 'black'}}>{actividad.resumen}</p>
                                <p>Fecha: {actividad.fechaActividad}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <IonRouterLink routerLink={`/actividad/${actividad.idActividad}`}>
                                        <IonButton>Ver más</IonButton>
                                    </IonRouterLink>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    ))
                ) : (
                    <div className="no-actividades">
                        <p>No hay actividades disponibles</p>
                    </div>
                )}
            </IonContent>
            <Navbar />
        </IonPage>
    );
};

export default Actividades;