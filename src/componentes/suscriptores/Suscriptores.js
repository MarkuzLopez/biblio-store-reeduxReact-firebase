import React from 'react';
import Swal from 'sweetalert2';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

/// react router dom
import { Link } from 'react-router-dom';

// renderizando el spinner
import Spinner from '../Shared/Spinner';


//importacionde provider para validación
import PropTypes from 'prop-types';

const Suscriptores = ({suscriptores, firestore}) => { 
   //  console.log(suscriptores);

    // todos loss metodos dde firestore 
 //   console.log(firestore);

    // prevenir que no vemgfa null, o indefinido
    if(!suscriptores) return <Spinner />

    // eliminar Suscriptor 
    const eliminarSuscriptor = (id) => {
        console.log('eliminando', id);
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
                collection: 'suscriptores',
                doc : id
            })
            }
        })        

    }

    return(
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to={'/suscriptores/nuevo'} 
                   className="btn btn-primary" >
                    <i className="fas fa-plus"></i>{' '}
                    Nuevo suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>                     
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary" >
                    <tr>
                     <th>
                        Nombre
                     </th>
                     <th>Carrera</th>
                     <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map( resp => (
                        <tr key={resp.id} >
                            <td> {resp.nombre }</td>
                            <td> {resp.carrera} </td>
                            <td>
                                <Link to={`/suscriptores/mostrar/${resp.id}`} className="btn btn-success btn-block" >
                                    <i className="fas fa-angle-double-right"></i> {' '}
                                    Más Información
                                </Link>
                                {/* PARA ELIMINAR Y PASAR UN ID, EN UNA FUNCION ES PRIMOPRDIAL { show: true } PONER EL ARROW FUNCION YA QUE DE LO CONTRARIO, AL INDICAR CON PARENTERSIS BORRAAS TODO */}
                                <button type="button" onClick={ () => eliminarSuscriptor(resp.id)} className="btn btn-danger btn-block">
                                    <i className="fas fa-trash-alt"></i> {' '}
                                    Eliminaar
                                </button>                               
                            </td>
                        </tr>
                    ))}
                </tbody>            
            </table>
        </div>
    )
}

// validar el componenente
Suscriptores.propTypes =  {
    firestore : PropTypes.object.isRequired,
    suscriptores : PropTypes.array
}

export default compose(
    /// potenciadores de store
    firestoreConnect([{ collection : 'suscriptores'}]),
    connect((state, props) => ({
        suscriptores: state.firestore.ordered.suscriptores
    }))
) (Suscriptores);