import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './HeadIcon.css';
const Head: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="header-toolbar"> 
        <IonTitle className="header-title">DoSports</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Head;
