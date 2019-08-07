import React, { Component } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// firestore
import { firestoreConnect } from 'react-redux-firebase';

// importacion de proptypes para documentcion de codigo
import PropTypes from 'prop-types'

class NuevoLibro extends Component {

    /// agregando el state 
    constructor() {
        super();
       this.state = {
            form: {
              titulo: '',
              ISBN: '',
              editorial: '',
              existencia: 0
            } 
          }
        this.leerDatoLibro=this.leerDatoLibro.bind(this);
    }


    leerDatoLibro = name => {
        var form = Object.assign({}, this.state.form);
        form[name.target.name] =  name.target.value;
        this.setState({
            form
        })
    }

    agregarLibro = (libro) => { 
        libro.preventDefault();

        const nuevoLibro = this.state.form;        
        
        /// pasar el arreglo de presstados
        nuevoLibro.prestados = [];
        // console.log("TCL: NuevoLibro -> agregarLibro -> nuevoLibro", nuevoLibro);

        // obtener firestore, y hisstory para riderecionar una vez que ssse guarde.
        const {firestore, history} = this.props;
       
        /// guardaar el nuevo libro
        firestore.add({ collection: 'libros' }, nuevoLibro).then( () => { 
            Swal.fire('Libro Agregado Correctamente', '', 'success');
            history.push('/');
        }).catch(e => console.error(e));

    }

    
    
    render() { 
        
        const {titulo, ISBN, editorial, existencia } = this.state.form;

        return(
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12" >
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Nuevo Libro
                    </h2>
                    <div className="row justify-content-center" >
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarLibro} >
                                 <div className="form-group">
                                    <label>Titulo: </label>
                                    <input type="text" className="form-control" name="titulo" placeholder="Titulo" required 
                                    value={titulo}
                                    onChange={this.leerDatoLibro}
                                     />
                                </div>
                                <div className="form-group">
                                    <label>ISBN: </label>
                                    <input type="text" className="form-control" name="ISBN" placeholder="ISBN" required 
                                    value={ISBN}
                                    onChange={this.leerDatoLibro}
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Editorial: </label>
                                    <input type="text" className="form-control" name="editorial" placeholder="Editorial " required 
                                    value={editorial}
                                    onChange={this.leerDatoLibro}
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Existencia: </label>
                                    <input type="number" min="0" className="form-control" name="existencia" placeholder="Existencia" required 
                                    value={existencia}
                                    onChange={this.leerDatoLibro}
                                     />
                                </div>
                                <input
                                    type="submit"
                                    value="Agregar Libro"
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

NuevoLibro.propTypes = {
    firestore : PropTypes.object.isRequired
} 

export default firestoreConnect() (NuevoLibro);