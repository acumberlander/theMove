import React, { Component } from 'react'
import './FoodAndDrink.scss';
import GoogleMapsRequest from '../../../Helpers/Data/GoogleAPI/GoogleMapsRequests';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';

export default class FoodAndDrink extends Component {
    state = {
        restaurants: [],
        cafes: [],
        bars: [],
        current: ''
    }

    render() {
        const { restaurants, cafes, bars, current } = this.state;
 
        // function that gets restaurants in Nashville area and stores them into state
        // also changes the 'current' state property to 'restaurants'
        const getNashvilleRestaurants = () => {
            this.setState({ current: 'restaurants' })
            GoogleMapsRequest.getRestaurantsInNashville()
            .then((results) => {
                this.setState({ restaurants: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets cafes in Nashville area and stores them into state
        // also changes the 'current' state property to 'cafes'
        const getNashvilleCafes = () => {
            this.setState({ current: 'cafes' })
            GoogleMapsRequest.getCafesInNashville()
            .then((results) => {
                this.setState({ cafes: [results] })
                    console.log(results);
                }
            )
        }

        // ***** THIS FUNCTION HAS NOT BEEN CREATED YET ***** //
        // function that gets bars in Nashville area and stores them into state
        // also changes the 'current' state property to 'bars'
        const getNashvilleBars = () => {
            this.setState({ current: 'cafes' })
            GoogleMapsRequest.getCafesInNashville()
            .then((results) => {
                this.setState({ cafes: [results] })
                    console.log(results);
                }
            )
        }

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each restaurant item
        const restaurantItemComponents = restaurants.map(restaurant => (
            <InterestTypeCard
              restaurant={restaurant}
              key={restaurant.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each cafe item
        const cafeItemComponents = cafes.map(cafe => (
            <InterestTypeCard
              cafe={cafe}
              key={cafe.id}
            />));

        // ***** NEED TO BUILD INTERESTTYPECARD COMPONENT ***** //
        // function to build out cards for each bar item
        const barItemComponents = bars.map(bar => (
            <InterestTypeCard
              bar={bar}
              key={bar.id}
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
                        <button>
                            <div className="interestTypeCard">
                                <h2>Cafés</h2>
                            </div>
                        </button>
                        <button>
                            <div className="interestTypeCard">
                                <h2>Bars</h2>
                            </div>
                        </button>
                    </div>
                )
            }

            /* NONE OF THE IF STATEMENTS WILL WORK BECAUSE YOU NEED TO BUILD THE INTERESTTYPECARD COMPONENT. */
            /* loads restaurant items in the food and drink interest container 
                if the 'current' property instate is equal to 'restaurants'. */
            if (current === 'restaurants') {
                return (
                    {restaurantItemComponents}
                );
            }

            /* loads cafe items in the food and drink interest container 
                if the 'current' property instate is equal to 'cafes'. */
            if (current === 'cafes') {
                return (
                    {cafeItemComponents}
                )
            }

            /* loads bar items in the food and drink interest container 
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
                    <h1>Food And Drink</h1>
                    <div className="interestTypeContainer">
                        {buildInitialButtons()}
                    </div>
                </div>
            </div>
        )
    }
}
