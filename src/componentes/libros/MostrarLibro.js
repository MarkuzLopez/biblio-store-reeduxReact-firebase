import React, { Component } from 'react';

// importacion de redux
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

/// react router dom
import { Link } from 'react-router-dom';

// renderizando el spinner
import Spinner from '../Shared/Spinner';

class MostrarLibro extends Component {
    
    devolverLibro = (codigo) => {        
        console.log(codigo);
        ///  extraaer fierstore
        const { firestore } =  this.props;

        // realizar una copia del libro
        const libroAcrtualizado = { ...this.props.libro};

        // eiminar la persona que estaa realizando la devoluciobn de prestado, mientras sseaa diferente de los demas id que lo elimine 
        const prestados =  libroAcrtualizado.prestados.filter(element =>  element.codigo !== codigo );

        /// obetener todos los libros, presttados menos el que tiene el id que recibe el metodo, el cual se a eliminado.
        libroAcrtualizado.prestados =  prestados;
        
        /// actualizar en firebase 
       // console.log(libroAcrtualizado);
        
        firestore.update({
            collection: 'libros',
            doc: libroAcrtualizado.id
        }, libroAcrtualizado)

        
    }
    
    render() {
        // validaar que no venga indfinido y que tenga informacion 
        const {libro} = this.props;
        
        if(!libro) return <Spinner />

        // validar el prestamo del libro.
        let btnPrestamo;
        if(libro.existencia - libro.prestados.length > 0 ) {            
            btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`} className="btn btn-success my-3">
                Solicitar Prestamo
            </Link>
        }else {
            btnPrestamo = null;
        }
        
        return(
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                    <i className="fas  fa-arrow-circle-left"></i> {' '}
                    Volver a Listado
                    </Link>
                </div>
                <div className="col-md-6" >
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-info float-right" >
                        <i className="fas fa-pencil-alt" ></i>{' '}
                        Editar Libro
                    </Link>
                </div>
                <hr className="mx-8 w-100"/>
                <div className="col-12" >
                    <h2 className="mb-4">                
                        {libro.titulo}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {''}
                        {libro.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {''}
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {''}
                        {libro.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Disponible:
                        </span> {''}
                        {libro.existencia - libro.prestados.length }
                    </p>
                    {/* BOTON PARA SOLICITAR EL PRESTANMOS DEL LIBRO  */}
                    {btnPrestamo}

                    {/* muestra las personas que tienen los libros.  */}
                    <h3 className="my-2">Personsa que tienen el Libro Prestaado</h3>                    
                    {libro.prestados.map( prestado  => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">{prestado.nombre} {prestado.apellido}</h4>
                            
                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:
                                     </span>{' '}
                                     {prestado.codigo}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Carrera: 
                                    </span>{' '}
                                    {prestado.carrera}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud: 
                                    </span>{' '}
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>

                            <div className="card-footer">
                                <button type="button" className="btn btn-success font-weight-bold" onClick={() => this.devolverLibro(prestado.codigo) } >
                                    Realizar Devolución
                                </button>
                            </div>

                        </div>
                    ))}
                    
                </div>
            </div>
        )
    }
}

export default compose(
   
    firestoreConnect( props => [{
       collection : 'libros',
       storeAs: 'libro',
       doc: props.match.params.id
   }]),

   connect(( {firestore : {ordered}}, props) => ({
       libro :ordered.libro && ordered.libro[0]
   }))

)(MostrarLibro);