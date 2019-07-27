import React, { Component } from 'react';

export default class Leisure extends Component {
    render() {
        return (
            <div>
                <div className="interestContainer">
                    <h1>Leisure</h1>
                    <div className="interestTypeContainer">
                        <div className="interestTypeDiv">
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Art</h2>
                                </div>
                            </button>
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Parks</h2>
                                </div>
                            </button>
                            <button>
                                <div className="interestTypeCard">
                                    <h2>Museums</h2>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
