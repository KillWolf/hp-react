import axios from '../../axios-instances/axios-firebase'

let authenticated = false;
let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpxZDpBz1iykbUQXxB-bUX-tiQRzpnabA';

const tokenTimer = (timer) => {
    setTimeout(() => {
        authenticated = false;
    }, timer * 1000)
} 
export const checkAuthentication = () => {
    return authenticated ? true : false;
}

export const authenticateUser = (email, password) => {
    axios.post(url, { email: email, password: password, returnSecureToken: true })
        .then(response => {
            authenticated = true;
            tokenTimer(response.expiresIn)
            console.log(response);
        })
        .catch(error => {
            authenticated = false;
            console.log(error);
        })

}
