import React from "react";

const BoxSun = ({ name }) => {
    return (
        <div className="mediumbox">
            <div className="container">
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 shadow-sm offset-sm-1">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">{name}</h4>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">
                            </h2>
                            <div>
                                <p id="sunrise"></p>
                                <div className="clock">
                                    <div className="wrap">
                                        <span className="heure"></span>
                                        <span className="minute"></span>
                                        <span className="seconde"></span>
                                    </div>
                                </div>
                                <div>
                                    <br></br>
                                    <p id="sunset"></p>
                                    <p id="solarnoon"></p>
                                    <p id="daylength"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BoxSun;