import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getEventsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/events%20in%20Nashville`)
        .then((results) => {
            const eventArray = results.data.results
            resolve(eventArray);
        })
        .catch((error) => {
            reject(error);
        })
});

export default { getEventsInNashville }