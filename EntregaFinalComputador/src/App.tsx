import {Route} from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Inicial from './pages/Inicial';
import InicioSesion from './pages/InicioSesion';
import Registrar from './pages/Registrar';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Actividades from './pages/Actividades';
import Actividad from './pages/Actividad';
import Buscador from './pages/Buscador';
import Foro from './pages/Foro';
import Cuenta from './pages/Cuenta';
import Historial from './pages/Historial';
import Asesoramiento from './pages/Asesoramiento';
import ForoDetalle from './pages/ForoDetalle';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css'; 
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path = "/" component = {Inicial} />
      <Route path="/iniciosesion" component={InicioSesion} />
      <Route path="/registrar" component={Registrar} />
      <Route path="/home" component={Home} />
      <Route exact path="/noticias" component={Noticias} />
      <Route path="/noticias/:id" component={Noticias} />
      <Route path="/actividades" component={Actividades} />
      <Route path="/actividad/:id" component={Actividad} />
      <Route path="/buscador" component={Buscador} />
      <Route path="/cuenta" component={Cuenta}/>
      <Route path="/historial" component={Historial} />
      <Route path="/asesoramiento" component={Asesoramiento} />
      <Route exact path="/foro" component={Foro} />
      <Route path="/foro/:idForo" component={ForoDetalle} />
      
    </IonReactRouter>
  </IonApp>
);

export default App;
