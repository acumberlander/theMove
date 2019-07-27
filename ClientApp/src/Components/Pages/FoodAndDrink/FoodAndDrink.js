import React, { Component } from 'react'
import './FoodAndDrink.scss';
import GoogleMapsRequest from '../../../Helpers/Data/GoogleAPI/GoogleMapsRequests';

export default class FoodAndDrink extends Component {
    state = {
        restaurants: [],
        cafes: [],
        bars: []
    }

    render() {
        const getNashvilleRestaurants = () => {
            GoogleMapsRequest.getRestaurantsInNashville()
                .then((results) => {
                    console.log(results);
                })
        }
        return (
            <div>
                <div className="interestContainer">
                    <h1>Food And Drink</h1>
                    <div className="interestTypeContainer">
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
                    </div>
                </div>
            </div>
        )
    }
}
