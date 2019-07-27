import React, { Component } from 'react';
import GoogleMapsRequest from '../../../Helpers/Data/GoogleAPI/GoogleMapsRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';

export default class Entertainment extends Component {
    state = {
        current: '',
        theaters: [],
        liveMusic: []
    }

    render() {
        const { theaters, liveMusic, current } = this.state;
 
        // function that gets theaters in Nashville area and stores them into state
        // also changes the 'current' state property to 'theaters'
        const getNashvilleTheaters = () => {
            this.setState({ current: 'theaters' })
            GoogleMapsRequest.getTheatersInNashville()
            .then((results) => {
                this.setState({ theaters: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets live music in Nashville area and stores them into state
        // also changes the 'current' state property to 'liveMusic'
        const getNashvilleLiveMusic = () => {
            this.setState({ current: 'live music' })
            GoogleMapsRequest.getLiveMusicInNashville()
            .then((results) => {
                this.setState({ liveMusic: [results] })
                    console.log(results);
                }
            )
        }

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each restaurant item
        const theaterItemComponents = theaters.map(theater => (
            <InterestTypeCard
              theater={theater}
              key={theater.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each cafe item
        const liveMusicItemComponents = liveMusic.map(liveMusic => (
            <InterestTypeCard
              liveMusic={liveMusic}
              key={liveMusic.id}
            />));

        /* function that builds the intial buttons for the options: Restaurants, Cafés, and Bars */
        const buildInitialButtons = () => {
            if (current === '') {
                return(
                    <div className="interestTypeDiv">
                        <button onClick={getNashvilleTheaters}>
                            <div className="interestTypeCard">
                                <h2>Movies</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleLiveMusic}>
                            <div className="interestTypeCard">
                                <h2>Live Music</h2>
                            </div>
                        </button>
                    </div>
                )
            }

            /* NONE OF THE IF STATEMENTS WILL WORK BECAUSE YOU NEED TO BUILD THE INTERESTTYPECARD COMPONENT. */
            /* loads theater items in the entertainment interest container 
                if the 'current' property in state is equal to 'theaters'. */
            if (current === 'theaters') {
                return (
                    {theaterItemComponents}
                );
            }

            /* loads liveMusic items in the entertainment interest container 
                if the 'current' property in state is equal to 'live music'. */
            if (current === 'live music') {
                return (
                    {liveMusicItemComponents}
                )
            }
        }

        return (
            <div>
                <div className="interestContainer">
                    <h1>Entertainment</h1>
                    <div className="interestTypeContainer">
                        {buildInitialButtons()}
                    </div>
                </div>
            </div>
        )
    }
}