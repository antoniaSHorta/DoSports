import { IonContent,IonPage,IonCard,IonCardContent,IonRouterLink,IonButton,IonCardTitle,IonItem,IonLabel,IonList,IonThumbnail,} from '@ionic/react';

import { Swiper, SwiperSlide } from 'swiper/react';  
import { Pagination, Autoplay, Navigation } from 'swiper/modules';  
import 'swiper/css';  
import 'swiper/css/pagination';  
import slidesData from '../assets/datos.json';  
import  noticiasData from '../assets/noticias.json';


import './Inicio.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';


const Inicio: React.FC = () => {
  return (
    <IonPage>
      <Head />
      <IonContent>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}  
        spaceBetween={30}
        slidesPerView={1}
        loop={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}  
        pagination={{ clickable: true }}  
        navigation={true}  
      >
      {slidesData.map(slide => (
        <SwiperSlide key={slide.id}>
        <img src={slide.image} alt={slide.title} />
        <h2>{slide.title}</h2>
        </SwiperSlide>
      ))}
      </Swiper>
      
      <IonCardTitle style={{marginLeft:'30px'}}>Noticias destacadas</IonCardTitle>
      {noticiasData.map((noticia) => (
      <IonCard key={noticia.id}>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonThumbnail slot="start">
            <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
            </IonThumbnail>
            <IonLabel>{noticia.title}</IonLabel>
            <IonRouterLink routerLink={`/noticia/${noticia.id}`}>
                      <IonButton>Leer más</IonButton>
            </IonRouterLink>
          </IonItem>
          </IonList>
      </IonCardContent>
      </IonCard>
      ))}
      </IonContent>

      <Navbar></Navbar>
    </IonPage>
  );
};

export default Inicio;
