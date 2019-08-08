import axios from 'axios';
import data from '../apiKeys';

const baseUrl = data.data.baseUrl;

/**** CALLS FOR LOCATIONS ****/

// function that posts a new location to the database
const addNewLocation = location => axios.post(`${baseUrl}/locations/createLocation`, location);

// function that gets single location from database based off location id
const getSingleLocation = id => axios.get(`	${baseUrl}/locations/getLocationById/${id}`);

// function that gets locations from database based off itinerary id
const getLocationsByItinerary = itineraryId => axios.get(`${baseUrl}/locations/getLocationsByItinerary/${itineraryId}`)

// function that updates location in database off location id
const updateLocation = (location) => axios.put(`${baseUrl}/locations/updateLocation`, location);

// function that deletes location in database based off location id
const deleteLocation = id => axios.delete(`${baseUrl}/locations/deleteLocation/${id}`);

/**** CALLS FOR ITINERARIES ****/

// function that posts a new location to the database
const addNewItinerary = itinerary => axios.post(`${baseUrl}/itineraries/createItinerary`, itinerary);

// function that gets locations from database based off user id
const getItinerariesByUser = userId => axios.get(`${baseUrl}/itineraries/getItinerariesByUser/${userId}`)

// function that updates location in database based off location id
const updateItinerary = (id, itinerary) => axios.put(`${baseUrl}/itineraries/updateItinerary/${id}`, itinerary);

// function that deletes location in database based off location id
const deleteItinerary = id => axios.delete(`${baseUrl}/itineraries/deleteItinerary/${id}`);

/**** CALLS FOR INTERESTS ****/

// function that gets interests from database based off user id
const getUserInterests = userId => axios.get(`${baseUrl}/interests/getInterestsByUser/${userId}`);


export default {
	addNewLocation,
	getSingleLocation,
	getLocationsByItinerary,
	updateLocation,
	deleteLocation,
	addNewItinerary,
	getItinerariesByUser,
	updateItinerary,
	deleteItinerary,
	getUserInterests
}