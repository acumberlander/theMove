import React, { Component } from 'react';
import BackendRequests from '../../../Helpers/Data/BackendRequests/BackendRequests';
import ItineraryItem from '../../ItineraryItem/ItineraryItem';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.scss';

export default class Home extends Component {
    state = {
        isEmpty: true,
        itinerary: {
            userId: 1, 
            itineraryName: "", 
            itineraryId: 0
        },
        itineraries: []
    }

    componentDidMount() {
        BackendRequests.getItinerariesByUser(1)
        .then((results) => {
            const itineraryArray = results.data;
            if (results != null) {
                this.setState({isEmpty: false, itineraries: itineraryArray})
            }
        })
    }

    addNewItinerary = () => {
        BackendRequests.addNewItinerary(this.state.itinerary)
        .then((results) => {
            const newItinerary = results.data;
            this.setState({itinerary: newItinerary})
            this.props.history.push(`/thingsToDo/${newItinerary.id}`)
        })
    }

    
    populateHomePage = () => {
        const itineraryItemComponents = this.state.itineraries.map(itinerary => (
            <ItineraryItem 
                itinerary={itinerary}
                key={itinerary.id}
            />
        ));
        const { itinerary } = this.state;
        return(
            <div>
                <div id="addItineraryButtonDiv">
                    {/* <Link 
                        to={{
                        pathname: "/thingstodo",
                        state: { itinerary }
                        }}> */}
                        <Button onClick={this.addNewItinerary} className="addItineraryButton">
                            +    
                        </Button>
                    {/* </Link> */}
                    <div className="itineraryItems">
                        {itineraryItemComponents}
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div>
               {this.populateHomePage()}
            </div>
        )
    }
}
