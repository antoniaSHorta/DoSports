import { IonContent,IonPage,IonCard,IonCardContent,IonItemDivider,IonCardHeader,IonButton,IonCardTitle,IonItem,IonLabel,IonList,IonThumbnail,} from '@ionic/react';

import { Swiper, SwiperSlide } from 'swiper/react';  
import { Pagination, Autoplay, Navigation } from 'swiper/modules';  
import 'swiper/css';  
import 'swiper/css/pagination';  
import slidesData from '../assets/datos.json';  


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

      <IonCard>
      <IonCardHeader>
        <IonCardTitle>Noticias destacadas</IonCardTitle>
        <IonItemDivider></IonItemDivider>
      </IonCardHeader>
      <IonCardContent>
        <IonList>

          <IonItem>
            <IonThumbnail slot="start">
            <img alt="foto noticia" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Título noticia 1</IonLabel>
            <IonButton >Leer más</IonButton>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="foto noticia" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Título noticia 2</IonLabel>
            <IonButton >Leer más</IonButton>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="foto noticia" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Título noticia 3</IonLabel>
            <IonButton >Leer más</IonButton>
          </IonItem>

          </IonList>
      </IonCardContent>
      </IonCard>

      </IonContent>

      <Navbar></Navbar>
    </IonPage>
  );
};

export default Inicio;
