import React from "react";
import Navbar from "../components/Navegationbar";
import Head from '../components/HeadIcon';
import { IonPage,IonContent,IonThumbnail,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton } from "@ionic/react";
import noticiasData from '../assets/noticias.json'; 
import { useParams } from "react-router-dom";

const Noticia: React.FC =() => {

    const {id} = useParams <{id:string}> ();
    console.log(id);
    const noticia = noticiasData.find(a => a.id === parseInt(id));

    if(!noticia){
        return(
            <IonPage>
                <Head />
                <IonContent>
                    <h2>Noticia no encontrada</h2>
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
                <IonCardTitle>{noticia.title}</IonCardTitle>
                <IonCardSubtitle>{noticia.date}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                <IonThumbnail slot="start">
                  <img alt={`Imagen de ${noticia.title}`} src={noticia.image} />
                </IonThumbnail>
                <div style={{ flex: 1, marginTop:'20px' }}>
                    <p>{noticia.description}</p>
                </div>
                </IonCardContent>
            </IonCard>
        </IonContent>
        <Navbar></Navbar>
        </IonPage>
    );
};

export default Noticia;