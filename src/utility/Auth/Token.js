import axios from '../../axios-instances/axios-firebase'

let token = null;
let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpxZDpBz1iykbUQXxB-bUX-tiQRzpnabA';

const tokenTimer = (timer) => {
    setTimeout(() => {
        token = false;
    }, timer * 1000)
} 
export const checkAuthentication = () => {
    return token ? true : false;
}

export const getToken = () => {
    return token;
}

export const authenticateUser = (email, password, onAuth) => {
    axios.post(url, { email: email, password: password, returnSecureToken: true })
        .then(response => {
            token = response.data.idToken;
            tokenTimer(response.data.expiresIn)
            onAuth();
        })
        .catch(error => {
            token = false;
        })

}
