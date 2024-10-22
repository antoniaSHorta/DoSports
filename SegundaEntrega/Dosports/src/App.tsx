import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import Actividades from './pages/Actividades';
import Buscar from './pages/Buscador';
import Noticias from './pages/Noticias';
import Foro from './pages/Foro';  
import Cuenta from './pages/Cuenta'; 
import IniciarSesion from './pages/IniciarSesion'; 
import Registro from './pages/Registro'; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home/>
        </Route>
        <Route exact path="/iniciarSesion">
          <IniciarSesion/>
        </Route>
        <Route exact path="/inicio">
          <Inicio/>
        </Route>
        <Route exact path="/actividades">
          <Actividades/>
        </Route>
        <Route exact path="/buscador">
          <Buscar/>
        </Route>
        <Route exact path="/noticias">
          <Noticias/>
        </Route>
        <Route exact path="/foro">
          <Foro/>
        </Route>
        <Route exact path="/registro">
          <Registro/>
        </Route>
        <Route exact path="/cuenta">
          <Cuenta/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
