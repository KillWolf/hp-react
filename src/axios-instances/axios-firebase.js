import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://hpilegaard-a0d34.firebaseio.com/'
});

export default instance;