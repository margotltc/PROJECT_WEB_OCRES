import React from "react";

const TodayBox = ({name}) => {
    return(
        <div className="bigbox">
            <div className="card-deck mb-3 text-center">
                <div className="card mb-4 shadow-sm offset-sm-1">
                    <div className="card-header">
                        <h4 className="my-0 font-weight-normal">{name}</h4>
                    </div>
                    <div className="card-body">
                        <h2 id="day0-forecast-main" className="card-title">
                        </h2>
                        <div>
                            <p id="day0-forecast-more-info"></p>
                            <div id="day0-icon-weather-container" ></div>
                            <h3 id="day0-forecast-temp"> </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TodayBox;