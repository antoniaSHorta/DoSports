import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, list, search, newspaper, person,chatbubbles } from 'ionicons/icons';

/*function Navbar() {
  return (
<IonTabBar slot="bottom">
      <IonTabButton tab="inicio" href="/inicio">
        <IonIcon icon={home} />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton tab="actividades" href="/actividades">
        <IonIcon icon={list} />
        <IonLabel>Actividades</IonLabel>
      </IonTabButton>

      <IonTabButton tab="buscar" href="/buscador">
        <IonIcon icon={search} />
        <IonLabel>Buscador</IonLabel>
      </IonTabButton>

      <IonTabButton tab="noticias" href="/noticias">
        <IonIcon icon={newspaper} />
        <IonLabel>Noticias</IonLabel>
      </IonTabButton>

      <IonTabButton tab="foro" href="/foro">
        <IonIcon icon={chatbubbles} />
        <IonLabel>Foro</IonLabel>
      </IonTabButton>

      <IonTabButton tab="cuenta" href="/cuenta">
        <IonIcon icon={person} />
        <IonLabel>Cuenta</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

export default Navbar;*/
import { useHistory, useLocation } from 'react-router-dom';
function Navbar() {
  const history = useHistory(); // Para la navegación
  const location = useLocation(); // Para obtener la ubicación actual

  return (
    <IonTabBar slot="bottom">
      <IonTabButton
        tab="inicio"
        onClick={() => history.push('/inicio')}
        style={{ color: location.pathname === '/inicio' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={home} />
        <IonLabel>Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="actividades"
        onClick={() => history.push('/actividades')}
        style={{ color: location.pathname === '/actividades' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={list} />
        <IonLabel>Actividades</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="buscar"
        onClick={() => history.push('/buscador')}
        style={{ color: location.pathname === '/buscador' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={search} />
        <IonLabel>Buscador</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="noticias"
        onClick={() => history.push('/noticias')}
        style={{ color: location.pathname === '/noticias' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={newspaper} />
        <IonLabel>Noticias</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="foro"
        onClick={() => history.push('/foro')}
        style={{ color: location.pathname === '/foro' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={chatbubbles} />
        <IonLabel>Foro</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="cuenta"
        onClick={() => history.push('/cuenta')}
        style={{ color: location.pathname === '/cuenta' ? 'blue' : 'gray' }} // Cambia el color
      >
        <IonIcon icon={person} />
        <IonLabel>Cuenta</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

export default Navbar;