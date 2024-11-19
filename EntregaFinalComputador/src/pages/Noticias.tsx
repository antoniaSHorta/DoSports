import React, { useEffect, useState } from "react";
import Navbar from "../components/Navegationbar";
import Head from '../components/HeadIcon';
import { IonPage, IonContent, IonThumbnail, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonRouterLink } from "@ionic/react";
import { useParams } from "react-router-dom";


const Noticia: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [noticias, setNoticias] = useState<any[]>([]);
    const [noticia, setNoticia] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await fetch(`http://localhost:3000/api/noticias/${id}`);
                    if (!response.ok) {
                        throw new Error('Noticia no encontrada');
                    }
                    const data = await response.json();
                    setNoticia(data);
                } else {
                    const response = await fetch('http://localhost:3000/api/noticias');
                    if (!response.ok) {
                        throw new Error('Error al cargar noticias');
                    }
                    const data = await response.json();
                    setNoticias(data);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

    if (!id) {
        return (
            <IonPage>
                <Head />
                <IonContent>
                    <IonCardTitle style={{margin: '20px'}}></IonCardTitle>
                    {noticias.map((noticia) => (
                        <IonCard key={noticia.idNoticias}>
                            <IonCardHeader>
                                <IonCardTitle style={{fontWeight: '600'}}>{noticia.title}</IonCardTitle>
                                <IonCardSubtitle>{new Date(noticia.date).toLocaleDateString()}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent style={{color: 'black'}}>
                                <IonThumbnail  style={{marginBottom: '20px'}}slot="start">
                                    <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
                                </IonThumbnail>
                                <p>{noticia.resumen}</p>
                                <IonRouterLink   routerLink={`/noticias/${noticia.idNoticias}`}>
                                    <IonButton>Leer más</IonButton>
                                </IonRouterLink>
                            </IonCardContent>
                        </IonCard>
                    ))}
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
                        <IonCardTitle style={{fontWeight: '600'}}>{noticia.title}</IonCardTitle>
                        <IonCardSubtitle>{new Date(noticia.date).toLocaleDateString()}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonThumbnail slot="start">
                            <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
                        </IonThumbnail>
                        <div style={{ flex: 1, marginTop: '20px', color:'black' }}>
                            <p>{noticia.description}</p>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
            <Navbar />
        </IonPage>
    );
};

export default Noticia;