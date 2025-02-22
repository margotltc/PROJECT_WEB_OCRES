import React from "react";
import BoxTomorrow from './components/BoxTomorrow.js';
import BoxAfterT from './components/BoxAfterT.js';
import BoxNextDay from './components/BoxNextDay.js';
import BoxVitvent from './components/BoxVitvent.js';
import BoxPressure from './components/BoxPressure.js';
import BoxJoke from './components/BoxJoke.js';
import BoxHumidity from './components/BoxHumidity.js';
import BoxChart from './components/BoxChart.js';
import BoxEmojis from './components/BoxEmojis.js';
import axios from "axios";
import TodayBox from './components/TodayBox.js';
import { Link } from 'react-router-dom';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

import { callAPI3 } from './API3';
import { callAPICreate } from './APICreated';
import { callAPI2 } from "./API2.js";

import { Chart, PieController, ArcElement, Legend, Tooltip, Title, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

import BoxSun from "./components/BoxSun.js";
import BoxAPICreated from "./components/BoxAPICreated.js";
import line from 'react-chartjs-2';

Chart.register(LinearScale, CategoryScale, PieController, ArcElement, Title, Legend, Tooltip, PointElement, LineElement);

const librairies = ["places"];

const API_KEY = "4081444b7b90198136fefe6ed4ccf35b";
const API_URL_ICON = "http://openweathermap.org/img/wn/";
const API_URL_DAY3 = "http://api.openweathermap.org/data/2.5/forecast/daily";

const mapContainerStyle = {
    width: '1500px',
    height: '400px',
}

/* var google = require('@google/maps').createClient({
    key: 'REACT_APP_GOOGLE_MAPS_API_KEY'
}); */

const center = {
    lat: 48.856613,
    lng: 2.352222,
}

const cities = [{
    lat: 51.507351,
    lng: -0.127758,
    time: 0,
    nameCities: "Londres"
},
{
    lat: 40.416775,
    lng: -3.703790,
    time: 1,
    nameCities: "Madrid"
},
{
    lat: 48.856613,
    lng: 2.352222,
    time: 2,
    nameCities: "Paris"
},
{
    lat: 55.755871,
    lng: 37.617680,
    time: 3,
    nameCities: "Moscou"
},
{
    lat: 52.5170365,
    lng: 13.3888599,
    time: 4,
    nameCities: "Berlin"
},
{
    lat: 41.8933203,
    lng: 12.4829321,
    time: 5,
    nameCities: "Rome"
},
{
    lat: 38.7077507,
    lng: -9.1365919,
    time: 7,
    nameCities: "Lisbonne"
},
{
    lat: 45.5031824,
    lng: -73.5698065,
    time: 9,
    nameCities: "Montréal"
},
{
    lat: 34.0536909,
    lng: -118.242766,
    time: 11,
    nameCities: "Los Angeles"
},
{
    lat: -23.5506507,
    lng: -46.6333824,
    time: 12,
    nameCities: "Sao Paulo"
},
{
    lat: -6.1753942,
    lng: 106.827183,
    time: 13,
    nameCities: "Jakarta"
},
{
    lat: 30.0443879,
    lng: 31.2357257,
    time: 15,
    nameCities: "Le Caire"
},
{
    lat: 55.6052931,
    lng: 13.0001566,
    time: 16,
    nameCities: "Malmo"
}
]

var myChart = new Chart();

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        librairies,
    });

    const [markers] = React.useState(cities);
    const [selected, setSelected] = React.useState(null);
    const [city, setCity] = React.useState("la ville que vous souhaitez !");

    const onMapClick = React.useCallback((event) => {
        const latlng =
        {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }


        for (var i = 0; i < cities.length; ++i) {
            if (cities[i].lat === latlng.lat && cities[i].lng === latlng.lng) {
                console.log(cities[i].nameCities)
                //Dashboard ({city: cities[i].nameCities})
                setCity(cities[i].nameCities);
                //callAPI();
                callAPI2(cities[i].nameCities);
            }
        }
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    var callAPI = (city) => {
        console.log(city);
        axios
            .get(`${API_URL_DAY3}?q=${city}&cnt=4&units=metric&appid=${API_KEY}`)
            .then(({ data }) => {
                // Récupère la donnée d'une API
                //console.log(data);
                for (let i = 0; i < 4; i++) {
                    // On récupère l'information principal
                    const main = data.list[i].weather[0].main;
                    const description = data.list[i].weather[0].description;
                    const temp = data.list[i].temp.day;
                    const icon = `<img src=${API_URL_ICON}${data.list[i].weather[0].icon}@2x.png class="weather-icon"/>`;

                    // Modifier le DOM
                    document.getElementById('day' + i + '-forecast-main').innerHTML = main;
                    document.getElementById('day' + i + '-forecast-more-info').innerHTML = description;
                    document.getElementById('day' + i + '-icon-weather-container').innerHTML = icon;
                    document.getElementById('day' + i + '-forecast-temp').innerHTML = `${temp}°C`;


                }
                const temp1 = data.list[0].temp.day;
                const temp2 = data.list[1].temp.day;
                const temp3 = data.list[2].temp.day;
                const temp4 = data.list[3].temp.day;

                if (temp1 < 10) {
                    var emoji1 = String.fromCodePoint(129508); //Gants
                    document.getElementById('emoji1').innerHTML = emoji1;
                    var emoji2 = String.fromCodePoint(129509); //Manteau
                    document.getElementById('emoji2').innerHTML = emoji2;
                    var emoji3 = String.fromCodePoint(128086);//Jean
                    document.getElementById('emoji3').innerHTML = emoji3;
                }

                else if (10 < temp1 < 20) {
                    emoji1 = String.fromCodePoint(129507); //Echarpe
                    document.getElementById('emoji1').innerHTML = emoji1;
                    emoji2 = String.fromCodePoint(128085); //T-shirt
                    document.getElementById('emoji2').innerHTML = emoji2;
                    emoji3 = String.fromCodePoint(128086);//Jean
                    document.getElementById('emoji3').innerHTML = emoji3;
                }

                else if (20 < temp1) {
                    emoji1 = String.fromCodePoint(129506); //Casquette
                    document.getElementById('emoji1').innerHTML = emoji1;
                    emoji2 = String.fromCodePoint(128374); //Lunettes de soleil
                    document.getElementById('emoji2').innerHTML = emoji2;
                    emoji3 = String.fromCodePoint(129651); //Short
                    document.getElementById('emoji3').innerHTML = emoji3;
                }

                const ctx = document.getElementById('myChart').getContext('2d');
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["Aujourd'hui", "Demain", "Après-Demain", "Le jour d'après"],
                        datasets: [{
                            label: 'Graphe des températures',
                            data: [temp1, temp2, temp3, temp4],
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderColor: 'rgb(255, 255, 255)',
                            tension: 0.1
                        }]
                    },


                });

            })
            .catch(console.error);
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    callAPI2();
    callAPI3();
    return (
        callAPI2(),
        callAPI3(),
        callAPICreate(),
        <div className="Corps">
            <div className="TitleSite">
                <h1> Quel temps fait-il dans le monde ?</h1>
            </div>
            <center>
                <GoogleMap mapContainerStyle={mapContainerStyle}
                    zoom={2}
                    center={center}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.time}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setSelected(marker);
                                setCity(marker.nameCities);
                                callAPI(marker.nameCities);
                                callAPI2(marker.nameCities);
                                callAPI3();
                                callAPICreate();
                                myChart.destroy();
                            }}
                        />

                    ))}

                    {selected ? (
                        <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div>
                                <h2>{selected.nameCities}</h2>
                            </div>
                        </InfoWindow>) : null}
                </GoogleMap>
            </center>
            <div>
                <center>
                    <div className="titreDonnee">
                        <h3>{"Données météorologiques de " + city}</h3>
                    </div>
                </center>
            </div>
            <TodayBox name={"Aujourd'hui"} />
            <div className="App-header">
                <BoxTomorrow name={"Demain"} />
                <BoxAfterT name={"Après-demain"} />
                <BoxNextDay name={"Le jour d'après"} />
            </div>
            <div className="App-header">
                <BoxVitvent name={"Vitesse du vent"} />
                <BoxPressure name={"Pression"} />
                <BoxHumidity name={"Humidité"} />
            </div>
            <div>
                <BoxSun name={"Données sur la journée (Heure UTC)"} />
                <BoxEmojis name={"Conseils pour s'habiller"} />
            </div>
            <div>
                <BoxChart name={"Graphe des températures"} />
                <BoxAPICreated name={"Record des températures en France !"} />
            </div>
            <div>
                <BoxJoke name={"Blague du jour !"} />
            </div>
            <div>
                <center>
                    <Link to="/admin">
                        <div className="bouton">
                            Pour modifier les données de l'API créée, cliquer ici
                        </div>
                    </Link>
                </center>
            </div>
        </div>
    )
};

