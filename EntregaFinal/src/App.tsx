import {Route} from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Inicial from './pages/Inicial';
import InicioSesion from './pages/InicioSesion';
import Registrar from './pages/Registrar';


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

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path = "/" component = {Inicial} />
      <Route path = "/iniciosesion" component = {InicioSesion} />
      <Route path = "/registrar" component = {Registrar} />
    </IonReactRouter>
  </IonApp>
);

export default App;
