// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt6TK7jlYU84cbugZZTbHlAz34_oUIx80",
    authDomain: "authagricola.firebaseapp.com",
    projectId: "authagricola",
    storageBucket: "authagricola.firebasestorage.app",
    messagingSenderId: "930441865799",
    appId: "1:930441865799:web:c75cbc2365ce9fdff81f62",
    measurementId: "G-XBNR4HX29Z"
};

function inicializarApp() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    window.auth = getAuth(app)
}

// Metodos de Autenticacion
async function inicioSesion(email, password) {

    inicializarApp()

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user.email
    } catch (error) {
        throw new Error("Error Inicio Sesion " + error.message)
    }
}

async function registrarse(email, password) {
    
    inicializarApp()

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return userCredential.user.email
    } catch (error) {
        throw new Error("Error Registro " + error.message)
    }
}


 async function cambiarContrasena(email) {
    
    inicializarApp()

    try {
        await sendPasswordResetEmail(auth, email)
        return true
    } catch (error) {
        throw new Error("Error Cambio de contrasena " + error.message)
    }
}

export { inicioSesion, registrarse, cambiarContrasena }