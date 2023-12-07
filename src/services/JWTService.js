const getToken = () => {
    return localStorage.getItem('id_token')
}
const saveToken = (token) => {
    localStorage.setItem('id_token' , token);
}
const destroyToken = () => {
    localStorage.removeItem('id_token');
}

export default {getToken , saveToken , destroyToken}