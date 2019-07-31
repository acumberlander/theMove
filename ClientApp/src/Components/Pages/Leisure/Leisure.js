import React, { Component } from 'react';
import GoogleMapsRequest from '../../../Helpers/Data/GoogleAPI/GoogleMapsRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';

export default class Leisure extends Component {
    state = {
        art: [],
        parks: [],
        museums: [],
        current: ''
    }

    render() {
        const { art, parks, museums, current } = this.state;
 
        // function that gets art in Nashville area and stores them into state
        // also changes the 'current' state property to 'art'
        const getNashvilleArt = () => {
            this.setState({ current: 'art' })
            GoogleMapsRequest.getArtInNashville()
            .then((results) => {
                this.setState({ art: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets parks in Nashville area and stores them into state
        // also changes the 'current' state property to 'parks'
        const getNashvilleParks = () => {
            this.setState({ current: 'parks' })
            GoogleMapsRequest.getParksInNashville()
            .then((results) => {
                this.setState({ parks: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets museums in Nashville area and stores them into state
        // also changes the 'current' state property to 'museums'
        const getNashvilleMuseums = () => {
            this.setState({ current: 'museums' })
            GoogleMapsRequest.getCafesInNashville()
            .then((results) => {
                this.setState({ museums: [results] })
                    console.log(results);
                }
            )
        }

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each art item
        const artItemComponents = art.map(art => (
            <InterestTypeCard
              art={art}
              key={art.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each park item
        const parkItemComponents = parks.map(park => (
            <InterestTypeCard
              park={park}
              key={park.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each museum item
        const museumItemComponents = museums.map(museum => (
            <InterestTypeCard
              museum={museum}
              key={museum.id}
            />));

        /* function that builds the intial buttons for the options: Art, Parks, and Museums */
        const buildInitialButtons = () => {
            if (current === '') {
                return(
                    <div className="interestTypeDiv">
                        <button onClick={getNashvilleArt}>
                            <div className="interestTypeCard">
                                <h2>Art</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleParks}>
                            <div className="interestTypeCard">
                                <h2>Parks</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleMuseums}>
                            <div className="interestTypeCard">
                                <h2>Museums</h2>
                            </div>
                        </button>
                    </div>
                )
            }

            /* NONE OF THE IF STATEMENTS WILL WORK BECAUSE YOU NEED TO BUILD THE INTERESTTYPECARD COMPONENT. */
            /* loads art items in the leisure interest container 
                if the 'current' property instate is equal to 'art'. */
            if (current === 'art') {
                return (
                    {artItemComponents}
                );
            }

            /* loads park items in the leisure interest container 
                if the 'current' property instate is equal to 'parks'. */
            if (current === 'parks') {
                return (
                    {parkItemComponents}
                )
            }

            /* loads museum items in the leisure interest container 
                if the 'current' property instate is equal to 'museums'. */
            if (current === 'museums') {
                return (
                    {museumItemComponents}
                )
            }
        }

        return (
            <div>
                <div className="interestContainer">
                    <h1>Leisure</h1>
                    <div className="interestTypeContainer">
                        {buildInitialButtons()}
                    </div>
                </div>
            </div>
        )
    }
}
