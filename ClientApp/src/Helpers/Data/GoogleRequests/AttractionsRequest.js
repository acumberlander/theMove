import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getAttractionsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/attractions%20in%20Nashville`)
        .then((results) => {
            const attractionArray = results.data.results
            resolve(attractionArray);
        })
        .catch((error) => {
            reject(error);
        })
});

export default { getAttractionsInNashville }