import React, { Component } from 'react';

export default class Entertainment extends Component {
    render() {
        return (
            <div>
                <div className="interestContainer">
                    <h1>Entertainment</h1>
                    <div className="interestTypeContainer">
                        <div className="interestTypeDiv">
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Movies</h2>
                                </div>
                            </button>
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Live Music</h2>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
