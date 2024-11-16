import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, list, search, newspaper, person, chatbubbles } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import './NavegationBar.css'

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
    <IonTabBar slot="bottom" className="navigation-bar">
      <IonTabButton
        tab="inicio"
        onClick={() => history.push('/home')}
        className={`nav-button ${location.pathname === '/home' ? 'active' : ''}`}
      >
        <IonIcon icon={home} />
        <IonLabel className="nav-label">Inicio</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="actividades"
        onClick={() => history.push('/actividades')}
        className={`nav-button ${isActive('/actividades') ? 'active' : ''}`}
      >
        <IonIcon icon={list} />
        <IonLabel className="nav-label">Actividades</IonLabel>
      </IonTabButton>

      <IonTabButton
                tab="buscar"
          onClick={() => history.push('/buscador')}
        className={`nav-button ${location.pathname === '/buscador' ? 'active' : ''}`}
      >
          <IonIcon icon={search} />
        <IonLabel className="nav-label">Buscador</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="noticias"
        onClick={() => history.push('/noticias')}
        className={`nav-button ${isActive('/noticias') ? 'active' : ''}`}
      >
        <IonIcon icon={newspaper} />
        <IonLabel className="nav-label">Noticias</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="foro"
        onClick={() => history.push('/foro')}
        className={`nav-button ${isActive('/foro') ? 'active' : ''}`}
      >
        <IonIcon icon={chatbubbles} />
        <IonLabel className="nav-label">Foro</IonLabel>
      </IonTabButton>

      <IonTabButton
        tab="cuenta"
        onClick={() => history.push('/cuenta')}
        className={`nav-button ${isActive('/cuenta') ? 'active' : ''}`}
      >
        <IonIcon icon={person} />
        <IonLabel className="nav-label">Cuenta</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
}

export default Navbar;