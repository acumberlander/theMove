import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getRestaurantsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/restaurants%20in%20Nashville`)
        .then((results) => {
            const restaurantArray = results.data.results
            resolve(restaurantArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getCafesInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/cafes%20in%20Nashville`)
        .then((results) => {
            const cafeArray = results.data.results
            resolve(cafeArray);
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

export default 
{ 
    getRestaurantsInNashville,
    getCafesInNashville,
    getBarsInNashville
 };