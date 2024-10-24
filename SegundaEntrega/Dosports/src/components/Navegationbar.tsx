import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, list, search, newspaper, person, chatbubbles } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

function Navbar() {
  const history = useHistory(); 
  const location = useLocation(); 

  const isActive = (path: string) => {
    switch(path) {
      case '/actividades':
        return location.pathname === '/actividades'|| location.pathname.startsWith('/actividad');
      case '/noticias':
        return location.pathname === '/noticias' || location.pathname.startsWith('/noticia'); 
      case '/cuenta':
        return location.pathname === '/cuenta'|| location.pathname.startsWith('/asesoramiento')|| location.pathname.startsWith('/historial'); 
      case '/foro': 
      return location.pathname === '/foro'|| location.pathname.startsWith('/foro');
        
    }
  };

  return (
    <IonTabBar slot="bottom">
      <IonTabButton
        tab="inicio"
        onClick={() => history.push('/inicio')}
        style={{ color: location.pathname === '/inicio' ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={home} />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="actividades"
        onClick={() => history.push('/actividades')}
        style={{ color: isActive('/actividades') ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={list} />
        <IonLabel>Actividades</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="buscar"
        onClick={() => history.push('/buscador')}
        style={{ color: location.pathname === '/buscador' ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={search} />
        <IonLabel>Buscador</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="noticias"
        onClick={() => history.push('/noticias')}
        style={{ color: isActive('/noticias') ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={newspaper} />
        <IonLabel>Noticias</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="foro"
        onClick={() => history.push('/foro')}
        style={{ color: isActive('/foro') ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={chatbubbles} />
        <IonLabel>Foro</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="cuenta"
        onClick={() => history.push('/cuenta')}
        style={{ color: isActive('/cuenta') ? 'blue' : 'gray' }} 
      >
        <IonIcon icon={person} />
        <IonLabel>Cuenta</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

export default Navbar;
