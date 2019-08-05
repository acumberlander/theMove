import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

const getBowlingAlleysInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/bowling%20alleys%20in%20Nashville`)
        .then((results) => {
            const bowlingAlleyArray = results.data.results
            resolve(bowlingAlleyArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getSkatingRinksInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/skating%20rinks%20in%20Nashville`)
        .then((results) => {
            const skatingRinkArray = results.data.results
            resolve(skatingRinkArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getArcadesInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/arcades%20in%20Nashville`)
        .then((results) => {
            const arcadeArray = results.data.results
            resolve(arcadeArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getCinemasInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/cinema%20in%20Nashville`)
        .then((results) => {
            const cinemaArray = results.data.results
            resolve(cinemaArray);
        })
        .catch((error) => {
            reject(error);
        })
});

const getGoKartingInNashville = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/places/search/go%20karting%20in%20Nashville`)
        .then((results) => {
            const goKartArray = results.data.results
            resolve(goKartArray);
        })
        .catch((error) => {
            reject(error);
        })
});



export default {
	getBowlingAlleysInNashville,
	getSkatingRinksInNashville,
	getArcadesInNashville,
	getGoKartingInNashville,
	getCinemasInNashville
}