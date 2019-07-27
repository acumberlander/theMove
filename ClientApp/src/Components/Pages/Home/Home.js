import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Home.scss';

export default class Home extends Component {
    state = {
        isEmpty: true
    }
    
    populateHomePage = () => {
        if (this.state.isEmpty) {
            return(
                <div id="addItineraryButtonDiv">
                    <Button className="addItineraryButton">
                        +    
                    </Button>
                </div>
            );
        } else {
            return (
                <div>
                    
                </div>
            )
        }
    }
    
    render() {
        return (
            <div>
               {this.populateHomePage()}
            </div>
        )
    }
}
