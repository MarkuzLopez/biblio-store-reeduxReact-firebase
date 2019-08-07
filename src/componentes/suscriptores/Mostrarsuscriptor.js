import React from 'react';
// importacion de redux
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

/// react router dom
import { Link } from 'react-router-dom';

// renderizando el spinner
import Spinner from '../Shared/Spinner';


//importacionde provider para validación
import PropTypes from 'prop-types';

const MostrarSuscriptor = (props) => { 
  //  console.log(props.suscriptor); 
   
   if(props.suscriptor === undefined) return <Spinner />

   const { id, nombre, apellido ,carrera, codigo } = props.suscriptor;
   
    return(
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fas  fa-arrow-circle-left"></i> {' '}
                    Volver al Listado
                </Link>
            </div>           
            <div className="col-md-6">
                <Link to={`/suscriptores/editar/${id}`} className="btn btn-info float-right" >
                    <i className="fas fa-pencil-alt"></i> {''}
                    Editar Suscriptor
                </Link>
            </div>
            <hr className="mx-8 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">                
                    {nombre} {apellido}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Carrera:                       
                    </span> {' '}
                    {carrera}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Codigo:                         
                    </span> {' '}
                    {codigo}
                </p>
            </div>

        </div>
    )
}

MostrarSuscriptor.propTypes = {
    firestore : PropTypes.object.isRequired
}
 

export default compose(
    firestoreConnect(props => [
        {
            collection : 'suscriptores',
            storeAs : 'suscriptor', // crear un aliass
            doc : props.match.params.id
        }
    ]), 
    connect(( { firestore: { ordered }}, props) => ({
        suscriptor : ordered.suscriptor && ordered.suscriptor[0]
    })) 
)(MostrarSuscriptor);
