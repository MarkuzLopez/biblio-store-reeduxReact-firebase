import React, { Component } from 'react';

// importacion de redux
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

///  lijnk
import { Link } from 'react-router-dom';

import Spinner from '../Shared/Spinner';
import FichaSuscriptor from './FichaSuscriptor';


class PrestamoLibro extends Component { 

    state = {
        noResultados: false,
        busqueda: '',
        resultado: {  }
    }

    buscarAlumno = e => {
        e.preventDefault();

        //obtener el vaalor a buscar
        const { busqueda } = this.state;   

        // extraer firestore  
        const  { firestore } =  this.props;

        // hacer la consulta 
        const collection = firestore.collection('suscriptores');
        const consulta  = collection.where('codigo', '==', busqueda).get();

        /// leer los resultados 
        consulta.then( resp => {        
            if (resp.empty) { 
            /// no hay resuñtados
            this.setState({ 
                noResultados: true,
                resultado: { }
            })
                       
            } else { 
                const datos =  resp.docs[0];                
                this.setState({
                    noResultados: false,
                    resultado: datos.data()
                })
            }  
        })         
    }

    leerDato = e => {        
        this.setState({ 
            [e.target.name] : e.target.value
        })        
    }


    /// alamcenar los datos del alumno para solicitar el libro.
    solicitarPrestamo = () => {
        // obtebner el suscriptor por medio del resultado que arroja la busqueda 
        const susscriptor  =  this.state.resultado;

        // fecha de laa solicitud
        susscriptor.fecha_solicitud =  new Date().toLocaleDateString();

        // obtener ek librio 
        const  libroactulizado  =  this.props.libro;

        /// agregar el sucriptor al libro 
        libroactulizado.prestados.push(susscriptor);

        /// obtener firestore y history de props para la consulta y el redireccionamiento.
        const {firestore, history, libro} = this.props;

        // aalamcenar en la BD 
        firestore.update({ 
            collection: 'libros',
            doc: libro.id
        }, libroactulizado).then( () => { 
            history.push('/');
        } )
        
    }

    render() {

        const { libro } =  this.props;

        if(!libro) return <Spinner />


        /// extraer los datos del alumno del state. 
        const { noResultados, resultado} = this.state;

        // valriable para el boton de solicitar
        let fichaAalumno, btnSolicitar;

        // ssi exisste el nombre 
        if(resultado.nombre) { 
            
            fichaAalumno = <FichaSuscriptor alumno={resultado}  />

            btnSolicitar = <button type="button" className="btn btn-success btn-block" onClick={this.solicitarPrestamo}>
                Solicitar Presstamos
            </button>
        } else  { 
            fichaAalumno = null;
            btnSolicitar =  null;
        }
        

        return(
            <div className="row" >
                <div className="col-12 mb-4">
                <Link to={'/'} className="btn btn-secondary" >
                <i className="fas  fa-arrow-circle-left"></i> {''}
                    Volver al Listado
                </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>
                        Solicitar Prestmamo : {libro.titulo}
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form onSubmit={this.buscarAlumno}                                
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Busca el Suscriptor por Código
                                </legend>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="busqueda"
                                        className="form-control"
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input value="Buscar Alumno" type="submit" className="btn btn-success btn-block"/>
                            </form>

                            {/* mostrar la ficha del alumno y el boton para solicitar el prestamo, obviamente si existe de lo contraario no muesstra nada */}
                            {fichaAalumno}
                            {btnSolicitar}

                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}

export default compose( 
    firestoreConnect( props => [ 
        {
            collection : 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]), connect(({ firestore: { ordered }}, props ) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro);