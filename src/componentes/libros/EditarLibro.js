import React, { Component } from 'react';

/// importacion de redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

/// react router dom
import { Link } from 'react-router-dom';

// renderizando el spinner
import Spinner from '../Shared/Spinner';
import Swal from 'sweetalert2';

class EditarLibro extends Component { 

    /// utilizar loss ref, pra aactualizar los libross y crear un nuevo onjeto 

    tituloRef = React.createRef();
    ISBNRef = React.createRef();
    editorialRef = React.createRef();
    existenciaRef = React.createRef();

    /// metodo para actualzar los libross datos.
    updateLibro = (e) => {
        e.preventDefault();

        const libroActualizar = {
            titulo: this.tituloRef.current.value,
            ISBN: this.ISBNRef.current.value,
            editorial: this.editorialRef.current.value,
            existencia: this.existenciaRef.current.value
        }

        console.log(libroActualizar);
        
        const {firestore, history, libro } =  this.props;

        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizar ).then(() => { 
            Swal.fire('Libro Actualizado Correctamente', '', 'success');
            history.push('/');
        })
    }


    render() {        

        const { libro} = this.props;
        
        if(!libro) return <Spinner />

        return(
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver a Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''}
                        Editar Libro
                    </h2>
                    <div className="row justify-content-center" >
                        <div className="col-md-8 mt-5" >
                            <form onSubmit={this.updateLibro} >
                                <div className="form-group">
                                    <label>Titulo: </label>
                                    <input type="text" className="form-control" name="titulo" placeholder="Titulo o Nombre de Libro" 
                                        required
                                        defaultValue={libro.titulo}
                                        ref={this.tituloRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN: </label>
                                    <input type="text" className="form-control" name="ISBN" placeholder="Titulo o Nombre de Libro" 
                                        required
                                        defaultValue={libro.ISBN}
                                        ref={this.ISBNRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial: </label>
                                    <input type="text" className="form-control" name="editorial" placeholder="Titulo o Nombre de Libro" 
                                        required
                                        defaultValue={libro.editorial}
                                        ref={this.editorialRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia: </label>
                                    <input type="number" className="form-control" name="existencia" placeholder="Titulo o Nombre de Libro" 
                                        required
                                        defaultValue={libro.existencia}
                                        ref={this.existenciaRef}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Actualizar Libro"
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

export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs: 'libro',
            doc: props.match.id
        }
    ]),
    connect(({ firestore : {ordered}}, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
) (EditarLibro);