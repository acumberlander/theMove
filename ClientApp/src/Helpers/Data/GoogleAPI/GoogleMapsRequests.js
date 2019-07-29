// import axios from 'axios';
// import apiKeys from '../apiKeys.js';
import './style.scss';

// const baseUrl = apiKeys.googleMaps.baseUrl;
// const apiKey = apiKeys.googleMaps.apiKey;

const getRestaurantsInNashville = () => new Promise((resolve, reject) => {
    // axios.get(`${baseUrl}restaurants+in+Nashville&key=${apiKey}`)
    //     .then((results) => {
    //         console.log(results);
    //         resolve(results);
    //     })
    //     .catch((error) => {
    //         reject(error);
    //     })
});

export default { getRestaurantsInNashville };