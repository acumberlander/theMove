import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';
import EntertainmentRequests from '../../../Helpers/Data/GoogleRequests/EntertainmentRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import './Entertainment.scss';

export default class Entertainment extends Component {
    state = {
        current: '',
        cinemas: [],
        arcades: [],
        goKarts: [],
        skatingRinks: [],
        bowlingAlleys: []
    }

    render() {
        const {
            cinemas,
            arcades,
            goKarts,
            skatingRinks,
            bowlingAlleys,
            current } = this.state;
 
        // function that gets cinemas in Nashville area and stores them into state
        // also changes the 'current' state property to 'cinemas'
        const getNashvilleCinemas = () => {
            this.setState({ current: 'cinemas' })
            EntertainmentRequests.getCinemasInNashville
            .then((results) => {
                this.setState({ cinemas: results })
                    console.log(results);
                }
            )
        }

        // function that gets arcades in Nashville area and stores them into state
        // also changes the 'current' state property to 'arcades'
        const getNashvilleArcades = () => {
            this.setState({ current: 'arcades' })
            EntertainmentRequests.getArcadesInNashville()
            .then((results) => {
                this.setState({ arcades: results })
                    console.log(results);
                }
            )
        }

        // function that gets bowling alleys in Nashville area and stores them into state
        // also changes the 'current' state property to 'bowling alleys'
        const getNashvilleBowlingAlleys = () => {
            this.setState({ current: 'bowling alleys' })
            EntertainmentRequests.getBowlingAlleysInNashville()
            .then((results) => {
                this.setState({ bowlingAlleys: results })
                    console.log(results);
                }
            )
        }

        // function that gets skating rinks in Nashville area and stores them into state
        // also changes the 'current' state property to 'skating rinks'
        const getNashvilleSkatingRinks = () => {
            this.setState({ current: 'skating rinks' })
            EntertainmentRequests.getSkatingRinksInNashville()
            .then((results) => {
                this.setState({ skatingRinks: results })
                    console.log(results);
                }
            )
        }

        // function that gets go karting in Nashville area and stores them into state
        // also changes the 'current' state property to 'go karting'
        const getNashvilleGoKarting = () => {
            this.setState({ current: 'go karting' })
            EntertainmentRequests.getGoKartingInNashville()
            .then((results) => {
                this.setState({ goKarts: results })
                    console.log(results);
                }
            )
        }

        // function to build out cards for each cinema item
        const cinemaItemComponents = cinemas.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each arcade item
        const arcadeItemComponents = arcades.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each bowlingAlley item
        const bowlingAlleyItemComponents = bowlingAlleys.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each arcade item
        const skatingRinkItemComponents = skatingRinks.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        // function to build out cards for each arcade item
        const goKartItemComponents = goKarts.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        /* function that builds the intial buttons for the options: Bowling Alleys, Cinemas, Skating Rinks, Arcades, and Go-Karting */
        const buildInitialButtons = () => {
            if (current === '') {
                return(
                    <div className="interestTypeDiv">
                        <button onClick={getNashvilleCinemas}>
                            <div className="interestTypeCard">
                                <h2>Movie Theaters</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleGoKarting}>
                            <div className="interestTypeCard">
                                <h2>Go-Karting</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleSkatingRinks}>
                            <div className="interestTypeCard">
                                <h2>Skating Rinks</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleArcades}>
                            <div className="interestTypeCard">
                                <h2>Arcades</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleBowlingAlleys}>
                            <div className="interestTypeCard">
                                <h2>Bowling Alleys</h2>
                            </div>
                        </button>
                    </div>
                )
            }

            /* loads theater items in the entertainment interest container 
                if the 'current' property in state is equal to 'cinemas'. */
            if (current === 'cinemas') {
                return (
                    <div>
                        {cinemaItemComponents}
                    </div>
                );
            }

            /* loads liveMusic items in the entertainment interest container 
                if the 'current' property in state is equal to 'arcades'. */
            if (current === 'arcades') {
                return (
                    <div>
                        {arcadeItemComponents}
                    </div>
                )
            }

            /* loads bowlingAlley items in the entertainment interest container 
                if the 'current' property in state is equal to 'bowling alleys'. */
            if (current === 'bowling alleys') {
                return (
                    <div>
                        {bowlingAlleyItemComponents}
                    </div>
                )
            }

            /* loads skatingRinks items in the entertainment interest container 
                if the 'current' property in state is equal to 'skating rinks'. */
            if (current === 'skating rinks') {
                return (
                    <div>
                        {skatingRinkItemComponents}
                    </div>
                )
            }

            /* loads goKart items in the entertainment interest container 
                if the 'current' property in state is equal to 'go karting'. */
            if (current === 'go karting') {
                return (
                    <div>
                        {goKartItemComponents}
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
                                <h1>Entertainment</h1>
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