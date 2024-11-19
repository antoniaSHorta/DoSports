import React, { useState } from 'react';
import { IonContent, IonPage, IonSearchbar, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonThumbnail, IonLabel, IonButton, IonRouterLink } from '@ionic/react';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Buscador.css';

interface ResultadoBusqueda {
    tipo: 'noticia' | 'actividad' | 'foro';
    id: number;
    titulo: string;
    resumen: string;
    fecha: string;
    imagen?: string;
}

const Buscador: React.FC = () => {
    const [resultados, setResultados] = useState<ResultadoBusqueda[]>([]);
    const [buscando, setBuscando] = useState(false);

    const buscar = async (termino: string) => {
        if (termino.length < 3) {
            setResultados([]);
            return;
        }

        setBuscando(true);
        try {
            const response = await fetch(`http://localhost:3000/api/buscar?termino=${encodeURIComponent(termino)}`);
            const data = await response.json();
            setResultados(data);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        } finally {
            setBuscando(false);
        }
    };

    const getRutaDetalle = (resultado: ResultadoBusqueda) => {
        switch(resultado.tipo) {
            case 'noticia':
                return `/noticias/${resultado.id}`;
            case 'actividad':
                return `/actividad/${resultado.id}`;
            case 'foro':
                return `/foro/${resultado.id}`;
            default:
                return '/';
        }
    };

    return (
        <IonPage>
            <Head />
            <IonContent>
                <IonSearchbar
                    className='searchbar'
                    placeholder="Buscar..."
                    debounce={300}
                    onIonInput={(e) => buscar(e.detail.value || '')}
                />
                <IonList>
                    {resultados.map((resultado) => (
                        <IonCard key={`${resultado.tipo}-${resultado.id}`}>
                            <IonCardHeader>
                                <IonCardTitle style={{fontWeight: '600'}}>{resultado.titulo}</IonCardTitle>
                                <IonLabel>{resultado.fecha}</IonLabel>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    {resultado.imagen && (
                                        <IonThumbnail slot="start">
                                            <img alt={`Imagen de ${resultado.titulo}`} src={resultado.imagen} />
                                        </IonThumbnail>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <p>{resultado.resumen}</p>
                                    </div>
                                    <IonRouterLink routerLink={getRutaDetalle(resultado)}>
                                        <IonButton>
                                            {resultado.tipo === 'noticia' ? 'Leer más' : 'Ver más'}
                                        </IonButton>
                                    </IonRouterLink>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonList>
            </IonContent>
            <Navbar />
        </IonPage>
    );
};
export default Buscador;