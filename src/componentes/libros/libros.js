import React from 'react';
import Swal from 'sweetalert2';
// importacion de redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

/// react router dom
import { Link } from 'react-router-dom';

// renderizando el spinner
import Spinner from '../Shared/Spinner';

// importacion de proptypes
import PropTypes from 'prop-types';

const Libros = ({libros, firestore}) => { 
    
    if(!libros) return <Spinner />

    /// eliminar Libro
     const eliminarLibro = id => {
        console.log(id);

        Swal.fire({
            title: 'Estas seguro de eliminarlo?',            
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!'
          }).then((result) => {
            if (result.value) {
            // utilizando firestore, paara eliminar 
            firestore.delete({
                collection : 'libros',
                doc: id
            })
            }
        })
     } 

    return( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to={'/libros/nuevo'} className="btn btn-primary" >
                <i className="fas fa-plus"></i> {''}
                    Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                <i className="fas fa-book"></i> {''}
                Libros
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-align bg-primary" >
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencias</th>
                        <th>Disonibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link to={`/libros/mostrar/${libro.id}`} className="btn btn-success btn-block" >
                                <i className="fas fa-angle-double-right"></i> {' '}
                                    Mas información
                                </Link>
                                <button type="button" onClick={ () => eliminarLibro(libro.id)} className="btn btn-danger btn-block" >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Libros.propTypes = {
    firestore : PropTypes.object.isRequired,
    libros : PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'libros' }]),
    connect((state, props) => ({
        libros : state.firestore.ordered.libros
    }))
    // console.log("TCL: state", state)
)(Libros);
