import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonRouterLink } from '@ionic/react';
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

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/actividades');
                const data = await response.json();
                setActividades(data);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
            }
        };

        fetchActividades();
    }, []);


    return (
        <IonPage>
            <Head />
            <IonContent>
                {actividades.map((actividad) => (
                    <IonCard key={actividad.idActividad}>
                        <IonCardHeader>
                            <IonCardTitle>{actividad.nombreActividad}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent >
                            <p style={{color: 'black'}}>{actividad.resumen}</p>
                            <p>Fecha: {actividad.fechaActividad}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <IonRouterLink routerLink={`/actividad/${actividad.idActividad}`}>
                                    <IonButton>Ver más</IonButton>
                                </IonRouterLink>
                            </div>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
            <Navbar />
        </IonPage>
    );
};

export default Actividades;