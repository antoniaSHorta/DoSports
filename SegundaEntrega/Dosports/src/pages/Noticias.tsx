import React from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader,IonItem,IonRouterLink,IonCardTitle, IonCardContent, IonThumbnail, IonLabel, IonButton, IonList } from '@ionic/react';
import noticiasData from '../assets/noticias.json'; 
import './Noticias.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Noticias: React.FC = () => {
  return (
    <IonPage>
      <Head /> 
      <IonContent>
        <IonList>
          {noticiasData.map((noticia) => (
            <IonCard key={noticia.id}>
              <IonCardHeader>
                <IonCardTitle>{noticia.title}</IonCardTitle>
                <IonLabel>{noticia.date}</IonLabel>
              </IonCardHeader>
              <IonCardContent>
              <IonList>
                <IonItem>
                  <IonThumbnail slot="start">
                  <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
                  </IonThumbnail>

                  <div style={{ flex: 1 }}>
                    <p>{noticia.resumen}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <IonRouterLink routerLink={`/noticia/${noticia.id}`}>
                      <IonButton>Leer más</IonButton>
                  </IonRouterLink>
                  </div>

                </IonItem>
              </IonList>
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
