import React, { Component } from 'react'
import FoodAndDrinkRequests from '../../../Helpers/Data/GoogleRequests/FoodAndDrinkRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';
import './FoodAndDrink.scss';

export default class FoodAndDrink extends Component {
    state = {
        restaurants: [],
        cafes: [],
        bars: [],
        current: '',
    }

    render() {
        const { restaurants, cafes, bars, current } = this.state;
        const itineraryId = this.props.location.itineraryId;
        const locationId = this.props.location.location;

        console.log(locationId);
        // function that gets restaurants in Nashville area and stores them into state
        // also changes the 'current' state property to 'restaurants'
        const getNashvilleRestaurants = () => {
            this.setState({ current: 'restaurants' })
            FoodAndDrinkRequests.getRestaurantsInNashville()
            .then((results) => {
                this.setState({ restaurants: results })
                }
            )
        }

        // function that gets cafes in Nashville area and stores them into state
        // also changes the 'current' state property to 'cafes'
        const getNashvilleCafes = () => {
            this.setState({ current: 'cafes' })
            FoodAndDrinkRequests.getCafesInNashville()
            .then((results) => {
                this.setState({ cafes: results })
                }
            )
        }

        // function that gets bars in Nashville area and stores them into state
        // also changes the 'current' state property to 'bars'
        const getNashvilleBars = () => {
            this.setState({ current: 'bars' })
            FoodAndDrinkRequests.getBarsInNashville()
            .then((results) => {
                this.setState({ bars: results })
                }
            )
        }

        // function to build out cards for each restaurant item
        const restaurantItemComponents = restaurants.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                itineraryId={itineraryId}
                locationId={locationId}
                interestTypeId={1}
            />));

        // function to build out cards for each cafe item
        const cafeItemComponents = cafes.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                itineraryId={itineraryId}
                locationId={locationId}
                interestTypeId={2}
            />));

        // function to build out cards for each bar item
        const barItemComponents = bars.map(item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                itineraryId={itineraryId}
                locationId={locationId}
                interestTypeId={3}
            />));

        /* function that builds the intial buttons for the options: Restaurants, Cafés, and Bars */
        const buildInitialButtons = () => {
            if (current === '') {
                return(
                    <div className="interestTypeDiv">
                        <button onClick={getNashvilleRestaurants}>
                            <div className="interestTypeCard">
                                <h2>Restaurants</h2>
                            </div>
                        </button>
                        <button onClick={getNashvilleCafes}>
                            <div className="interestTypeCard">
                                <h2>Cafés</h2>
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

            /* loads restaurant items in the food and drink interest container 
                if the 'current' property instate is equal to 'restaurants'. */
            if (current === 'restaurants') {
                return (
                    <div>
                        {restaurantItemComponents}
                    </div>
                );
            }

            /* loads cafe items in the food and drink interest container 
                if the 'current' property instate is equal to 'cafes'. */
            if (current === 'cafes') {
                return (
                    <div>
                        {cafeItemComponents}
                    </div>
                )
            }

            /* loads bar items in the food and drink interest container 
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
                            <h1>Food and Drink</h1>
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
