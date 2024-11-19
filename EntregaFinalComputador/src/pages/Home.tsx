import { IonContent, IonPage, IonCardHeader,IonCard, IonCardContent, IonRouterLink, IonButton, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail, IonSkeletonText } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

interface Noticia {
  idNoticias: number;
  title: string;
  image: string;
  resumen: string;
  date: string;
  description: string;
}

interface Slide {
  id: number;
  imagen: string;
  titulo: string;
}

const slides: Slide[] = [
  {
      id: 1,
      imagen: 'https://i0.wp.com/obarbanza.gal/wp-content/uploads/2021/09/deportes.jpg?fit=1200%2C675&ssl=1',
      titulo: 'Bienvenido a DoSports !'
  },
  {
      id: 2,
      imagen: 'https://cdn.sortiraparis.com/images/80/94880/835001-best-of-2022-les-exploits-sportifs-de-nos-francais-cette-annee.jpg',
      titulo: 'Descubre nuevas actividades'
  },
  {
      id: 3,
      imagen: 'https://img.freepik.com/fotos-premium/composicion-diversos-equipos-deportivos-fitness-juegos_93675-82046.jpg',
      titulo: 'Únete a la comunidad'
  }
];

const Home: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
          setLoading(true);
          const respuestaNoticias = await fetch('http://localhost:3000/api/noticias/destacadas');
          if (!respuestaNoticias.ok) {
              throw new Error('Error al cargar las noticias');
          }
          const dataNoticias = await respuestaNoticias.json();
          setNoticias(dataNoticias);
      } catch (error) {
          console.error('Error al cargar datos:', error);
          setError(error instanceof Error ? error.message : 'Error al cargar los datos');
      } finally {
          setLoading(false);
      }
  };

      cargarDatos();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <Head />
        <IonContent>
          <div className="loading-container">
            <IonSkeletonText animated style={{ width: '100%', height: '200px' }} />
            {[1, 2, 3].map((item) => (
              <IonCard key={item}>
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: '60%' }} />
                  <IonSkeletonText animated style={{ width: '80%' }} />
                </IonCardContent>
              </IonCard>
            ))}
          </div>
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
          <div className="error-container">
            <p className="error-message">{error}</p>
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
            <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                navigation
                className="home-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="slide-container">
                            <img src={slide.imagen} alt={slide.titulo} className="slide-image" />
                            <h2 className="slide-title">{slide.titulo}</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="noticias-section">
                <h2 className="noticias-title">Noticias Destacadas</h2>
                {noticias.length > 0 ? (
                    noticias.map((noticia) => (
                        <IonCard key={noticia.idNoticias} className="noticia-card">
                            <IonCardHeader>
                                <IonCardTitle className='tituloHome'>{noticia.title}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonThumbnail style ={{marginBottom:'20px'}}slot="start">
                                    <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
                                </IonThumbnail>
                                <p style ={{color:'black',marginBottom:'10px'}}>{noticia.resumen}</p>
                                <IonRouterLink routerLink={`/noticias/${noticia.idNoticias}`}>
                                    <IonButton>Leer más</IonButton>
                                </IonRouterLink>
                            </IonCardContent>
                        </IonCard>
                    ))
                ) : (
                    <div className="no-noticias">
                        <p>No hay noticias disponibles</p>
                    </div>
                )}
            </div>
        </IonContent>
        <Navbar />
    </IonPage>
);
};

export default Home;