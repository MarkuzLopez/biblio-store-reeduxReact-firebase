import React, { Component } from 'react';

// importacion de firebasseConnect 
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component { 
    state =  { 
        email: '', 
        password: ''
    }

    iniciarSession = e  => { 
        e.preventDefault();

        // extrae firebase 
        console.log(this.props.firebase);
        const {firebase} = this.props;

        // extraer el sstate 
        const { email, password } = this.state;

        // autenticar el usuario 
        firebase.login({ 
            email, 
            password
        }).then( ressultado => { 
            console.log('Usuaairo autenticaado correctamente');            
        }).catch(error =>  { 
            console.log('0Hubo un error', error);            
        })
        
    }

    leerDatos = e => { 
        this.setState({ 
            [e.target.name] : e.target.value  
        })       
    }

    render() { 
        return( 
            <div className=" row justify-content-center">
                <div className="col-md-5" >
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i>{' '}
                                Iniciar Sessión
                            </h2>
                            <form onSubmit={this.iniciarSession} >
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text" className="form-control" name="email" required
                                    value={this.state.email}
                                    onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Passwor: </label>
                                    <input type="password" className="form-control" name="password" required
                                    value={this.state.password}
                                    onChange={this.leerDatos}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" value="Iniciar Sesssion" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default firebaseConnect() (Login); 