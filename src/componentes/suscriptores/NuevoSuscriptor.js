import React, {Component} from 'react';
import Swal from 'sweetalert2';
/// rutas 
import { Link } from 'react-router-dom';

// firestore
import { firestoreConnect } from 'react-redux-firebase';

// importacion de proptypes para documentcion de codigo
import PropTypes from 'prop-types'

class NuevoSuscriptor extends Component { 

    state = {
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: '',
    }

    // agregar un nuevo suscriptor a la base 
    agregarSuscriptor = e  => { 
        e.preventDefault();

        /// extraer los valortes del state
        const nuevoSuscriptor = this.state;
        // console.log(nuevoSuscriptor);
        
        // extareer firestore de props
        // console.log(this.props.firestore);        
        const { firestore, history } = this.props;

        /// guardar en la base de datos
        firestore.add({ collection : 'suscriptores'}, nuevoSuscriptor).then(() => {
            Swal.fire('Suscriptor Creado Correctamente', '', 'success');
            history.push('/suscriptores');
        }).catch(e => console.error(e))

    }

   leerDato = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
   }

    render() {
        return( 
            <div className="row">
                <div className="col-12 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>
                    Volver al Listado
                </Link>
                </div>
                <div className="col-12" >
                    <h2>
                        <i className="fas fa-user-plus"></i> {' '}
                        Nuevo Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarSuscriptor} >
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input type="text" className="form-control" name="nombre" placeholder="Nombre suscriptor" required 
                                    onChange={this.leerDato}
                                    value={this.state.nombre} />
                                </div>
                                <div className="form-gropu">
                                    <label>Apellido: </label>
                                    <input type="text" className="form-control" name="apellido" placeholder="Apellidos" required 
                                    onChange={this.leerDato} 
                                    value={this.state.apellido} />
                                </div>
                                <div className="form-gropu">
                                    <label>Carrera: </label>
                                    <input type="text" className="form-control" name="carrera" placeholder="Carrera" required 
                                    onChange={this.leerDato} 
                                    value={this.state.carrera} />
                                </div>         
                                <div className="form-gropu">
                                    <label>Código: </label>
                                    <input type="text" className="form-control" name="codigo" placeholder="Codigo" required 
                                    onChange={this.leerDato} 
                                    value={this.state.codigo} />
                                </div>
                                <input 
                                    type="submit"
                                    value="Agregar Suscriptor"
                                    className="btn btn-success"
                                />                          
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

NuevoSuscriptor.propTypes = { 
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect() (NuevoSuscriptor);