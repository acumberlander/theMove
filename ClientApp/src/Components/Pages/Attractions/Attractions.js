import React, { Component } from 'react';
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import AttractionsRequests from '../../../Helpers/Data/GoogleRequests/AttractionsRequest';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';

export default class Attractions extends Component {
    state = {
        attractions: []
    }

    
    // function that gets events in Nashville area and stores them into state
    getNashvilleEvents = () => {
        AttractionsRequests.getAttractionsInNashville()
            .then((results) => {
                this.setState({ attractions: results })
                console.log(results);
            }
        )
    }

    // funcation that runs the getNashvilleEvents function on page load
    componentDidMount(){
        this.getNashvilleEvents();
    }

    render() {
        const { attractions } = this.state;
        const itineraryId = this.props.location.state;

        const attractionItemComponents = attractions.map( item => (
            <InterestTypeCard
                item={item}
                key={item.id}
                itineraryId={itineraryId}
            />));

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
                            <h1>Attractions</h1>
                        </div>
                    </div>
                    <div className="interestTypeContainer">
                        <div>
                            {attractionItemComponents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}