import React, { Component } from 'react';

export default class NightLife extends Component {
    render() {
        return (
            <div>
                <div className="interestContainer">
                    <h1>Night Life</h1>
                    <div className="interestTypeContainer">
                        <div className="interestTypeDiv">
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Clubs</h2>
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
