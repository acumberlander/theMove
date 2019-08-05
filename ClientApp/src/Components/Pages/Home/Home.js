import React, { Component } from 'react';
import BackendRequests from '../../../Helpers/Data/BackendRequests/BackendRequests';
import ItineraryItem from '../../ItineraryItem/ItineraryItem';
import { Button } from 'reactstrap';
import './Home.scss';

export default class Home extends Component {
    state = {
        itinerary: {
            userId: 1, 
            itineraryName: "", 
            itineraryId: 0
        },
        itineraries: []
    }

    // function that sets the state of the itineraries property with existing itineraries
    // it also deletes any itineraries without locations from the database and from state
    displayItineraries = () => {
        BackendRequests.getItinerariesByUser(1)
        .then((results) => {
            const itineraryArray = results.data;
            for (let i = 0; i < itineraryArray.length; i++) {
                if (itineraryArray[i].locations.length === 0) {
                    BackendRequests.deleteItinerary(itineraryArray[i].id)
                    itineraryArray.splice(i)
                }
            }
            if (results != null) {
                this.setState({isEmpty: false, itineraries: itineraryArray})
            }
        })
    }

    // runs the functions within on page load
    componentDidMount() {
        this.displayItineraries();
    }


    componentDidUpdate() {
        BackendRequests.getItinerariesByUser(1)
        .then((results) => {
            let itineraryArray = results.data;
            this.setState({itineraries: itineraryArray})
        })
    }

    // function that adds a new itinerary to the database
    // and takes the user to a new page while also passing the itinerary id
    addNewItinerary = () => {
        BackendRequests.addNewItinerary(this.state.itinerary)
        .then((results) => {
            const newItinerary = results.data;
            this.setState({itinerary: newItinerary})
            this.props.history.push(`/thingsToDo/${newItinerary.id}`)
        })
    }

    deleteItinerary = (itineraryId) => {
        BackendRequests.deleteItinerary(itineraryId)
        BackendRequests.getItinerariesByUser(1)
        .then((results) => {
            let itineraryArray = results.data
            this.setState({itineries: itineraryArray})
        })
    }


    populateHomePage = () => {
        const { itineraries } = this.state;
        const itineraryItemComponents = itineraries.map(itinerary => (
            <ItineraryItem 
                itinerary={itinerary}
                key={itinerary.id}
                deleteItinerary={this.deleteItinerary}
            />
        ));
        
        if (itineraries.length === 0) {
            return(
                <div id="addItineraryButtonDiv">
                    <Button onClick={this.addNewItinerary} className="addItineraryButton">
                        +    
                    </Button>
                </div>
            );
        } else {
            return(
                <div>
                    <div id="headerAndButtonDiv">
                        <h1 id="homeHeader">Itineraries</h1>
                        <div id="addItineraryButtonDiv2">
                            <Button onClick={this.addNewItinerary} className="addItineraryButton">
                                +    
                            </Button>
                        </div>
                    </div>
                    <div className="itineraryItems">
                        {itineraryItemComponents}
                    </div>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="homeContainer">
               {this.populateHomePage()}
            </div>
        )
    }
}
