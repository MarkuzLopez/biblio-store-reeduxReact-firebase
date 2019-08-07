import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';    
import 'firebase/firestore';

/// condifgurar firestore.
const firebaseConfig = {
    apiKey: "AIzaSyBpmxDc1SRzwGcyfdsOXgDYRzeoBDPIIQI",
    authDomain: "mark-db.firebaseapp.com",
    databaseURL: "https://mark-db.firebaseio.com",
    projectId: "mark-db",
    storageBucket: "mark-db.appspot.com",
    messagingSenderId: "540911772417",
    appId: "1:540911772417:web:22c82d96529d4929"
}

/// inicializar firebase 
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux 
const rrfConfio = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhacer con composse de redux y firestore
const createStoreWithFirebase = compose (
    reactReduxFirebase(firebase, rrfConfio),
    reduxFirestore(firebase)
)(createStore);

/// Reducers 
const rootReducer =  combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer
})

// state inicial 
const initialState = {};

// Create el store.
const store =  createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;