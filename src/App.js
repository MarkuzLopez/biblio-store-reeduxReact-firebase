import React from 'react';

// Rutas 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux 
import store from './store';
import { Provider } from 'react-redux';

// componentes Suscriptores
import Suscriptores from './componentes/suscriptores/Suscriptores';
import MostrarSuscriptor from './componentes/suscriptores/Mostrarsuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import Navbar from './componentes/Shared/Navbar';

/// componentes Libros
import Libros from './componentes/libros/libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';

// importacion de auth, login, regisster etc.
import Login from './/componentes/auth/Login';

// importacion de proteccion de rutas, para que no puedan acceder y tambien los que si
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
  return (
   <Provider store={store} >
      <Router>
       <Navbar />
      <div className="container">
        <Switch>

          <Route exact path="/" component={ UserIsAuthenticated (Libros)} />
          <Route exact path="/libros/nuevo" component={ UserIsAuthenticated (NuevoLibro)} />
          <Route exact path="/libros/mostrar/:id" component={ UserIsAuthenticated (MostrarLibro)} />          
          <Route exact path="/libros/editar/:id" component={UserIsAuthenticated (EditarLibro)} />
          <Route exact path="/libros/prestamo/:id" component={ UserIsAuthenticated (PrestamoLibro)} />


          <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)} />        
          <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
          <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
          <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)} />

          <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />  
        </Switch>
      </div>
    </Router>
   </Provider>
  );
}

export default App;
