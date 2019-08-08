import React, { Component } from 'react'
import BackendRequests from '../../../Helpers/Data/BackendRequests/BackendRequests';
import LocationItem from '../../LocationItem/LocationItem';
import { Button } from 'reactstrap';
import './ItineraryLocations.scss';

export default class ItineraryLocations extends Component {
    state = {
        isPending: true,
        locations: [],
        location: {}
    }

    itineraryId = this.props.location.state;
    locationId = this.state.location.id;

    componentDidMount(){
        BackendRequests.getLocationsByItinerary(this.itineraryId)
        .then((results) => {
            let locationArray = results.data;
            for(let i=0;i<locationArray.length;i++) {
                let htmlAttrVal = locationArray[i].html_attr;
                let photoRefVal = locationArray[i].photo_ref;
                let address = locationArray[i].address;
                let lat = locationArray[i].latitude;
                let lng = locationArray[i].longitude;
                let locationName = locationArray[i].locationName;
                let price_level = locationArray[i].price;

                // sets each location object to the same format it was when
                // it was received from the Google Api specifically for the
                // price level int variable
                locationArray[i].price = price_level;

                // sets each location object to the same format it was when
                // it was received from the Google Api specifically for the
                // location name string variable
                locationArray[i].name = locationName;

                // sets each location object to the same format it was when
                // it was received from the Google Api specifically for the
                // address string variable
                locationArray[i].formatted_address = address;

                // sets each location object to the same format it was when
                // it was received from the Google Api specifically for the
                // latitude and longitude property variables
                locationArray[i].geometry = {
                    "location": {
                        "lat": lat,
                        "lng": lng
                    }
                };

                // sets each location object to the same format it was when
                // it was received from the Google Api specifically for the
                // photos array variable
                locationArray[i].photos = [
                    {
                        "height": 700,
                        "html_attributions": [htmlAttrVal],
                        "photo_reference": photoRefVal,
                        "width": 1000
                    }
                ];
            }
            this.setState({ locations: locationArray });
        })
    }

    deleteLocation = () => {
        BackendRequests.deleteLocation(this.locationId)
        .then(() =>{
            BackendRequests.getLocationsByItinerary(this.itineraryId)
            .then(results => {
                console.log("It's running!")
                let locationArray = results.data;
                this.setState({ locations: locationArray})
            })
        })
    }



    render() {
        const { locations } = this.state;

        const interestTypeItemComponents = locations.map(item => (
            <LocationItem
                item={item}
                key={item.id}
                itineraryId={this.itineraryId}
                locationId={this.locationId}
                deleteLocation={this.deleteLocation}
            />
        ));

        return (
            <div id="itineraryLocationsDiv">
                <div className="headerAndButtonDiv">
                    <h1 id="itineraryLocationsHeader">{"Locations for Itinerary"}</h1>
                    <div id="addItineraryButtonDiv3">
                        <Button onClick={this.addNewItinerary} className="addItineraryButton2">
                            +    
                        </Button>
                    </div>
                </div>
                {interestTypeItemComponents}
            </div>
        )
    }
}
