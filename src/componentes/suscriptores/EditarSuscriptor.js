import React, { Component } from 'react';
import Swal from 'sweetalert2';

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

class EditarSuscriptor extends Component {

    /// creamos las variables para la actuaalizacion 


    // nombreInput =  React.createRef();
    // apellidoInput = React.createRef();
    // carreraInput = React.createRef();
    // codigoInput =  React.createRef();

    constructor() {
        super();
        this.state = {
            form: {
                nombre: '',
                apellido: '',
                carrera: '',
                codigo: ''
            },
            // loadData: false
        }
        // para bindear y no pierda la reeferencia 
        this.onChangeForm=this.onChangeForm.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            console.log("TCL: EditarSuscriptor -> componentDidMount -> this.props.match.params.id", this.props.match.params.id)
            // Llamada a laa BD ctrl + cmd + l y la variable a imprimir
        }
    }

    /// TODO Es invocado inmediatamente después de que el componente se haya actualizado.
    /// TODO Aquí es donde podemos manejar el componente ya renderizado y actualizado en el DOM.
    componentDidUpdate(prevProps) {
        const { suscriptor } = this.props
        console.log(prevProps.suscriptor);
        console.log(this.props.suscriptor);
        
        // detectar que hay caambios para que ssolo entre una vez
        if (prevProps.suscriptor !== this.props.suscriptor) {
          //  console.log('Entra')
            this.setData(suscriptor);
        }
    }

    onChangeForm(name){
        var form = Object.assign({}, this.state.form);
        form[name.target.name] = name.target.value;
        this.setState({
            form
        })
    }

    setData(suscriptor) {
        const { apellido, carrera, codigo, nombre } = suscriptor
        this.setState({
            form: {
                nombre: nombre,
                apellido: apellido,
                carrera: carrera,
                codigo: codigo
            }
        })
    }


    // creamos laa funcion para actuliazar desde la baase de datos 
    editarSuscrptor = e => {
        e.preventDefault();
        const suscriptorActualizado = this.state.form;
        const {firestore, history, suscriptor} =  this.props;
        console.log(suscriptorActualizado);
        
         /// actualiar con el nuevo objeto y redireccionarlo a la lissta 
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizado).then(() => {
            Swal.fire('suscriptor Actualizado Correctamente', '', 'success')
            history.push('/suscriptores')
        })
        
        //e.preventDefault();
        // nuevo objeto a actualizar
        // const suscriptorActualizado = {
        //     nombre: this.nombreInput.current.value,
        //     apellido: this.apellidoInput.current.value,
        //     carrera: this.carreraInput.current.value,
        //     codigo: this.codigoInput.current.value,
        // }
        // console.log(suscriptorActualizado);

        ///  extraer firestore y hisstory de propss 
        // const { suscriptor, firestore, history } = this.props;
        // console.log(this.props);


        /// actualiar con el nuevo objeto y redireccionarlo a la lissta 
        // firestore.update({
        //     collection: 'suscriptores',
        //     doc: suscriptor.id
        // }, suscriptorActualizado).then(() => {
        //     Swal.fire('suscriptor Actualizado Correctamente', '', 'success')
        //     history.push('/suscriptores')
        // })


    }


    render() {
        //console.log(this.props.suscriptor);
        /// const { suscriptor } = this.props
        const { nombre, apellido, carrera, codigo } = this.state.form

        // validaar si viene definido o  no viene naadaa 
        if (!this.state.form) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        Volver al Listado
            </Link>
                </div>
                <div className="col-12" >
                    <h2>
                        <i className="fas fas fa-pencil-alt"></i> {''}
                        Editar Suscriptor
                </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarSuscrptor} >
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input type="text" className="form-control" name="nombre" placeholder="Nombre suscriptor" required
                                        // ref={this.nombreInput}
                                        value={nombre}
                                        onChange={this.onChangeForm}
                                        // defaultValue={suscriptor.nombre} 
                                        />
                                </div>
                                <div className="form-gropu">
                                    <label>Apellido: </label>
                                    <input type="text" className="form-control" name="apellido" placeholder="Apellidos" required
                                        // ref={this.apellidoInput}
                                        value={apellido}
                                        onChange={this.onChangeForm}
                                        // defaultValue={suscriptor.apellido} 
                                        />
                                </div>
                                <div className="form-gropu">
                                    <label>Carrera: </label>
                                    <input type="text" className="form-control" name="carrera" placeholder="Carrera" required
                                        // ref={this.carreraInput}
                                        value={carrera}
                                        onChange={this.onChangeForm}
                                        // defaultValue={suscriptor.carrera} 
                                        />
                                </div>
                                <div className="form-gropu">
                                    <label>Código: </label>
                                    <input type="text" className="form-control" name="codigo" placeholder="Codigo" required
                                        // ref={this.codigoInput}
                                        value={codigo}
                                        onChange={this.onChangeForm}
                                        // defaultValue={suscriptor.codigo} 
                                        />
                                </div>
                                <br />
                                <input
                                    type="submit"
                                    value="Actualizar Suscriptor"
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

EditarSuscriptor.propTypes = {
    suscriptor: PropTypes.object.isRequired
}

export default compose(

    firestoreConnect(props => [
        {
            collection: 'suscriptores',
            storeAs: 'suscriptor',
            doc: props.match.id
        }
    ]),

    connect(({ firestore: { ordered } }, props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);