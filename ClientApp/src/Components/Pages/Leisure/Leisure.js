import React, { Component } from 'react';
import LeisureRequests from '../../../Helpers/Data/GoogleRequests/LeisureRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';
import './Leisure.scss';


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
            LeisureRequests.getArtInNashville()
            .then((results) => {
                this.setState({ art: results })
                    console.log(results);
                }
            )
        }

        // function that gets parks in Nashville area and stores them into state
        // also changes the 'current' state property to 'parks'
        const getNashvilleParks = () => {
            this.setState({ current: 'parks' })
            LeisureRequests.getParksInNashville()
            .then((results) => {
                this.setState({ parks: results })
                    console.log(results);
                }
            )
        }

        // function that gets museums in Nashville area and stores them into state
        // also changes the 'current' state property to 'museums'
        const getNashvilleMuseums = () => {
            this.setState({ current: 'museums' })
            LeisureRequests.getMuseumsInNashville()
            .then((results) => {
                this.setState({ museums: results })
                    console.log(results);
                }
            )
        }

        // function to build out cards for each art item
        const artItemComponents = art.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each park item
        const parkItemComponents = parks.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each museum item
        const museumItemComponents = museums.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
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

            /* loads art items in the leisure interest container 
                if the 'current' property instate is equal to 'art'. */
            if (current === 'art') {
                return (
                    <div>
                        {artItemComponents}
                    </div>
                );
            }

            /* loads park items in the leisure interest container 
                if the 'current' property instate is equal to 'parks'. */
            if (current === 'parks') {
                return (
                    <div>
                        {parkItemComponents}
                    </div>
                )
            }

            /* loads museum items in the leisure interest container 
                if the 'current' property instate is equal to 'museums'. */
            if (current === 'museums') {
                return (
                    <div>
                        {museumItemComponents}       
                    </div>
                )
            }
        }

        return (
            <div>
                <div className="interestContainer">
                <div className="row">
                        <div className="arrowDiv col-4">
                            <Link to="/thingstodo">
                                <img className="backArrow" src={BackArrow} alt="back"></img>
                            </Link>
                        </div>
                        <div className="interestHeaderDiv col-8">
                            <h1>Leisure</h1>
                        </div>
                        </div>
                    <div className="interestTypeContainer">
                        {buildInitialButtons()}
                    </div>
                </div>
            </div>
        )
    }
}
