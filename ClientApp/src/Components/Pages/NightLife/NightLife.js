import React, { Component } from 'react';
import NightLifeRequests from '../../../Helpers/Data/GoogleRequests/NightLifeRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';
import './NightLife.scss';

export default class NightLife extends Component {
    state = {
        clubs: [],
        bars: [],
        current: ''
    }

    render() {
        const { clubs, bars, current } = this.state;
        const itineraryId = this.props.location.state;
 
        // function that gets clubs in Nashville area and stores them into state
        // also changes the 'current' state property to 'clubs'
        const getNashvilleClubs = () => {
            this.setState({ current: 'clubs' })
            NightLifeRequests.getClubsInNashville()
            .then((results) => {
                this.setState({ clubs: results })
                    console.log(results);
                }
            )
        }

        // function that gets bars in Nashville area and stores them into state
        // also changes the 'current' state property to 'bars'
        const getNashvilleBars = () => {
            this.setState({ current: 'bars' })
            NightLifeRequests.getBarsInNashville()
            .then((results) => {
                this.setState({ bars: results })
                    console.log(results);
                }
            )
        }

        // function to build out cards for each club item
        const clubItemComponents = clubs.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                interestTypeId={6}
            />));

        // function to build out cards for each bar item
        const barItemComponents = bars.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                interestTypeId={7}
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

            /* loads club items in the leisure interest container 
                if the 'current' property instate is equal to 'clubs'. */
            if (current === 'clubs') {
                return (
                    <div>
                        {clubItemComponents}
                    </div>
                );
            }

            /* loads bar items in the leisure interest container 
                if the 'current' property instate is equal to 'bars'. */
            if (current === 'bars') {
                return (
                    <div>
                        {barItemComponents}
                    </div>
                )
            }
        }

        return (
            <div>
                <div className="interestContainer">
                <div className="row">
                            <div className="arrowDiv col-4">
                                <Link to={`/thingstodo/${itineraryId}`}>
                                    <img className="backArrow" src={BackArrow} alt="back"></img>
                                </Link>
                            </div>
                            <div className="interestHeaderDiv col-8">
                                <h1>Night Life</h1>
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
