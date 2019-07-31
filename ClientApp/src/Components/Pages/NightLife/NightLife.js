import React, { Component } from 'react';
import GoogleMapsRequest from '../../../Helpers/Data/GoogleAPI/GoogleMapsRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';

export default class NightLife extends Component {
    state = {
        clubs: [],
        bars: [],
        current: ''
    }

    render() {
        const { clubs, bars, current } = this.state;
 
        // function that gets clubs in Nashville area and stores them into state
        // also changes the 'current' state property to 'clubs'
        const getNashvilleClubs = () => {
            this.setState({ current: 'clubs' })
            GoogleMapsRequest.getArtInNashville()
            .then((results) => {
                this.setState({ clubs: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets bars in Nashville area and stores them into state
        // also changes the 'current' state property to 'bars'
        const getNashvilleBars = () => {
            this.setState({ current: 'bars' })
            GoogleMapsRequest.getBarsInNashville()
            .then((results) => {
                this.setState({ bars: [results] })
                    console.log(results);
                }
            )
        }

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each club item
        const clubItemComponents = clubs.map(club => (
            <InterestTypeCard
              club={club}
              key={club.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each bar item
        const barItemComponents = bars.map(bar => (
            <InterestTypeCard
              bar={bar}
              key={bar.id}
            />));

        /* function that builds the intial buttons for the options: Clubs and Bars */
        const buildInitialButtons = () => {
            if (current === '') {
                return(
                    <div className="interestTypeDiv">
                        <button onClick={getNashvilleClubs}>
                            <div className="interestTypeCard">
                                <h2>Clubs</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleBars}>
                            <div className="interestTypeCard">
                                <h2>Bars</h2>
                            </div>
                        </button>
                    </div>
                )
            }

            /* NONE OF THE IF STATEMENTS WILL WORK BECAUSE YOU NEED TO BUILD THE INTERESTTYPECARD COMPONENT. */
            /* loads club items in the leisure interest container 
                if the 'current' property instate is equal to 'clubs'. */
            if (current === 'clubs') {
                return (
                    {clubItemComponents}
                );
            }

            /* loads bar items in the leisure interest container 
                if the 'current' property instate is equal to 'bars'. */
            if (current === 'bars') {
                return (
                    {barItemComponents}
                )
            }
        }

        return (
            <div>
                <div className="interestContainer">
                    <h1>Night Life</h1>
                    <div className="interestTypeContainer">
                        {buildInitialButtons()}
                    </div>
                </div>
            </div>
        )
    }
}
