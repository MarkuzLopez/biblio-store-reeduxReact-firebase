import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// importacion de redux 
import { compose  } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


class Navbar extends Component { 
    
    state = {
        usuarioAutenticado : false
     }

    // este componente remplaza al componentwill recibe props 
    static getDerivedStateFromProps(props, state) {
    // console.log("TCL: Navbar -> getDerivedStateFromProps -> props", yjoprops)
     
    const { auth } =  props;
     
     if(auth.uid) { 
        return { usuarioAutenticado : true }
     } else { 
        return { usuarioAutenticado : false }
     }
    }

  /// cerrar session 
  cerrarSesssion = () => {
      const {firebase } = this.props;
      firebase.logout();
  }

  render() { 

    // obtener el usuaarioi autenticaado, mediante el state
    const { usuarioAutenticado } = this.state;

    // extraer los daatos de autenticacion 
     const { auth } = this.props;

    return( 
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
            <nav className="navbar navbar-light" >
                <span className="navbar-brand mb-0 h1">
                    Administrar De Bibliotecass
                </span>
            </nav>            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">

                {/* condicionar que si el usuario esta autenticado de manera correcta mmuestre el menu de  suscriptores y libros de lo contrario no lo muestre mediante el operado ternario donde  ? = si, y : =  no  */}

                {
                    usuarioAutenticado ? (

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/suscriptores'} className="nav-link" >
                                    Suscriptores
                        </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link" >
                                    Libros
                        </Link>
                            </li>
                        </ul>
                    ) : null }

                    {/* // si el usuaario esta autenticado se muestrara en el navbar el correo electronic o de donde se logueo */}
                    { usuarioAutenticado ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="#!" className="nav-link text-light">
                                    {auth.email}
                                </a>
                            </li>

                            <li className="nav-item">
                                <button type="button" className="btn btn-danger" onClick={this.cerrarSesssion} >Cerrar Session</button>
                            </li>
                        </ul>
                     ):null }
            </div>
        </nav>
    )
  }
}

export default compose(
    firestoreConnect(), 
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar);