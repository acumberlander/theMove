import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getClubsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/clubs%20in%20Nashville`)
        .then((results) => {
            const clubArray = results.data.results
            resolve(clubArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getBarsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/bars%20in%20Nashville`)
        .then((results) => {
            const barArray = results.data.results
            resolve(barArray);
        })
        .catch((error) => {
            reject(error);
        })
});

export default { getClubsInNashville, getBarsInNashville };