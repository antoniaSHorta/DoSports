import React from "react";
import Navbar from "../components/Navegationbar";
import Head from '../components/HeadIcon';
import { IonPage,IonContent,IonCard,IonCardHeader,IonAlert,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton } from "@ionic/react";
import actividadesData from "../assets/actividades.json";
import { useParams } from "react-router-dom";
import  { useState } from "react";

const Actividad: React.FC =() => {

    const {id} = useParams <{id:string}> ();
    console.log(id);
    const actividad = actividadesData.find(a => a.id === parseInt(id));
    const [showAlert, setShowAlert] = useState(false); 
    
    const handleInscribirse = () => {
        if (actividad) { 
            console.log(`Usuario inscrito en la actividad: ${actividad.title}`);
            setShowAlert(true);
        }
    };

    if(!actividad){
        return(
            <IonPage>
                <Head />
                <IonContent>
                    <h2>Actividad no encontrada o finalizada</h2>
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
                <IonCardTitle>{actividad.title}</IonCardTitle>
                <IonCardSubtitle>{actividad.date}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>{actividad.description}</IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft:'10px', marginBottom:'10px'}}>          
                <IonButton onClick={handleInscribirse}>Inscribirme</IonButton>
                </div>
            </IonCard>
            <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Inscripción Exitosa'}
                    message={`Te has inscrito en ${actividad.title}`}
                    buttons={['OK']}
            />
        </IonContent>
        <Navbar></Navbar>
        </IonPage>
    );
};

export default Actividad;