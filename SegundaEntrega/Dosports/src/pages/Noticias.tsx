import React from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonLabel, IonItem, IonButton, IonList } from '@ionic/react';
import slidesData from '../assets/noticias.json'; import './Noticias.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';
import './Noticias.css';

const Noticias: React.FC = () => {
  return (
    <IonPage>
      <Head /> 
      <IonContent>
        <IonList>
          {slidesData.map((noticia) => (
            <IonCard key={noticia.id}>
              <IonThumbnail slot="start">
                <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
              </IonThumbnail>
              <IonCardHeader>
                <IonCardTitle>{noticia.title}</IonCardTitle>
                <IonLabel>{noticia.date}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
                <p>{noticia.description}</p>
                <IonButton>Leer más</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Noticias;
