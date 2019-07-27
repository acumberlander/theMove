import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.scss';

export default class Home extends Component {
    state = {
        isEmpty: true
    }
    
    populateHomePage = () => {
        if (this.state.isEmpty) {
            return(
                <div id="addItineraryButtonDiv">
                    <Link to="/thingstodo">
                        <Button className="addItineraryButton">
                            +    
                        </Button>
                    </Link>
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
