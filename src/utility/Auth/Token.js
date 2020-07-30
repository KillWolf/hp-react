import axios from '../../axios-instances/axios-firebase'

let authenticationObject = { token: false, errorResponse: null };
let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpxZDpBz1iykbUQXxB-bUX-tiQRzpnabA';

export const resetAuthentication = () => {
    authenticationObject = { token: authenticationObject.token ? authenticationObject.token : false, errorResponse: null };
}
export const checkAuthentication = () => {
    return authenticationObject;
}

export const getToken = () => {
    return authenticationObject.token;
}

export const authenticateUser = (email, password, onAuth) => {
    axios.post(url, { email: email, password: password, returnSecureToken: true })
        .then(response => {
            authenticationObject.token = response.data.idToken;
            tokenTimer(response.data.expiresIn)
            onAuth();
        })
        .catch(error => {
            authenticationObject.token = false;
            authenticationObject.errorResponse = formatErrorMessage(error.response.data.error.message);
            onAuth();
        })

}


const tokenTimer = (timer) => {
    setTimeout(() => {
        authenticationObject.token = false;
    }, timer * 1000)
}

const formatErrorMessage = (message) => {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Forkert adgangskode, prøv igen.";
        case "EMAIL_NOT_FOUND":
            return "Email ikke skrevet korrekt, prøv igen.";
        default: 
            return `Ukendt fejl. Prøv igen, eller kontakt sønnike. Fejl: ${message}`
    }
}


