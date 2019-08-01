import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getArtInNashville = () => new Promise((resolve, reject) => {
	axios.get(`${baseUrl}/places/search/art%20in%20Nashville`)
		.then((results) => {
			const artArray = results.data.results
			resolve(artArray);
		})
		.catch((error) => {
			reject(error);
		})
});

const getParksInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/parks%20in%20Nashville`)
        .then((results) => {
            const parkArray = results.data.results
            resolve(parkArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getMuseumsInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/museums%20in%20Nashville`)
        .then((results) => {
            const museumArray = results.data.results
            resolve(museumArray);
        })
        .catch((error) => {
            reject(error);
        })
});



export default {
	getParksInNashville,
	getArtInNashville,
	getMuseumsInNashville
}