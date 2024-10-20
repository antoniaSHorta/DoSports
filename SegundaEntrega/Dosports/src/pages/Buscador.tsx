import React from 'react';
import { IonPage, IonSearchbar, IonContent} from '@ionic/react';
import './Buscador.css';
import Navbar from '../components/Navegationbar';
import Head from '../components/HeadIcon';

const Buscador: React.FC = () => {
  return (
    <IonPage>
      <Head />
      <IonContent className="buscador-content">
        <div className="searchbar-container">
            <IonSearchbar
              className="custom-searchbar"
              placeholder="Buscar"
              showCancelButton="never"
              animated={true}
              debounce={300}
            />
          </div>
      </IonContent>
      <Navbar />
    </IonPage>
  );
};

export default Buscador;