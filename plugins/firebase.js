import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC4FTHB1wuf-HXBxxbGLstMYz9UamF1WmA",
    authDomain: "nuxt-shopping.firebaseapp.com",
    databaseURL: "https://nuxt-shopping.firebaseio.com",
    projectId: "nuxt-shopping",
    storageBucket: "nuxt-shopping.appspot.com",
    messagingSenderId: "762172088605",
    appId: "1:762172088605:web:fb35993387a481ec11c1f4"
}

let firebaseApp

if (!firebaseApp && !firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig)
}else{
    firebaseApp = firebase.app()
}

export default firebaseApp