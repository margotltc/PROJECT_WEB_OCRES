import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoxAPICreated from './components/BoxAPICreated';
import { useState } from 'react';

function Admin() {

    const [id, setId] = useState('');

    const [tempHaute, setTempH] = useState('');
    const [lieuTempH, setLieuH] = useState('');
    const [anneeTempH, setAnneeH] = useState('');

    const [tempBasse, setTempB] = useState('');
    const [lieuTempB, setLieuB] = useState('');
    const [anneeTempB, setAnneeB] = useState('');

    const handleInputDelete = () => {
        axios
            .delete(`http://localhost:3001/index/${id}`)
            .catch(console.error);
        document.location.reload(true);
    };
    const handleInputAdd = () => {
        let newAPI = {
            "tempHaute": tempHaute,
            "lieuTempHaute": lieuTempH,
            "anneeTempHaute": anneeTempH,
            "tempBasse": tempBasse,
            "lieuTempBasse": lieuTempB,
            "anneeTempBasse": anneeTempB
        };
        axios
            .post(`http://localhost:3001/index`, newAPI)
            .catch(console.error);
        document.location.reload(true);
    };

    const handleInputUpdate = () => {
        let newAPI2 = {
            "tempHaute": tempHaute,
            "lieuTempHaute": lieuTempH,
            "anneeTempHaute": anneeTempH,
            "tempBasse": tempBasse,
            "lieuTempBasse": lieuTempB,
            "anneeTempBasse": anneeTempB
        };
        axios
            .patch(`http://localhost:3001/index/${id}`, newAPI2)
            .catch(console.error);
        document.location.reload(true);
    };
    var callAPICreate = () => {
        axios
            .get('http://localhost:3001/index')
            .then((data) => {
                for (let i = 0; i < data.data.length; i++) {

                    const idPost = data.data[i]._id;
                    const tempHaute = data.data[i].tempHaute;
                    const lieuTempHaute = data.data[i].lieuTempHaute;
                    const anneeTempHaute = data.data[i].anneeTempHaute;

                    const tempBasse = data.data[i].tempBasse;
                    const lieuTempBasse = data.data[i].lieuTempBasse;
                    const anneeTempBasse = data.data[i].anneeTempBasse;

                    document.getElementById('id' + i).innerHTML = `Id : ${idPost}`;
                    document.getElementById('tempH' + i).innerHTML = `Température la plus haute : ${tempHaute}°C`;
                    document.getElementById('lieuTempH' + i).innerHTML = `Lieu : ${lieuTempHaute}`
                    document.getElementById('anneeTempH' + i).innerHTML = `Année : ${anneeTempHaute}`;

                    document.getElementById('tempB' + i).innerHTML = `Température la plus basse : ${tempBasse}°C`;
                    document.getElementById('lieuTempB' + i).innerHTML = `Lieu : ${lieuTempBasse}`;
                    document.getElementById('anneeTempB' + i).innerHTML = `Année : ${anneeTempBasse}`;
                }

            })
            .catch(console.error);
    }
    return (
        callAPICreate(),
        <div>
            <div>
                <h1>Modification de l'API créée</h1>
            </div>
            <div>
                <h3>Voici l'API que vous avez créée</h3>
                <BoxAPICreated name={"Modification de votre API"}/>
            </div>
            <center>
                <div>
                    <input placeholder='id' onChange={e => setId(e.target.value)} /><br></br>
                    <button onClick={() => handleInputDelete()}>Supprimer</button>
                </div>
                <div>
                    <input placeholder='Température Haute' onChange={e => setTempH(e.target.value)} />
                    <input placeholder='Lieu' onChange={e => setLieuH(e.target.value)} />
                    <input placeholder='Année' onChange={e => setAnneeH(e.target.value)} />
                    <input placeholder='Température Basse' onChange={e => setTempB(e.target.value)} />
                    <input placeholder='Lieu' onChange={e => setLieuB(e.target.value)} />
                    <input placeholder='Année' onChange={e => setAnneeB(e.target.value)} /><br></br>
                    <button onClick={() => handleInputAdd()}>Ajouter</button>
                </div>
                <div>
                    <input placeholder='id' onChange={e => setId(e.target.value)} />
                    <input placeholder='Température Haute' onChange={e => setTempH(e.target.value)} />
                    <input placeholder='Lieu' onChange={e => setLieuH(e.target.value)} />
                    <input placeholder='Année' onChange={e => setAnneeH(e.target.value)} />
                    <input placeholder='Température Basse' onChange={e => setTempB(e.target.value)} />
                    <input placeholder='Lieu' onChange={e => setLieuB(e.target.value)} />
                    <input placeholder='Année' onChange={e => setAnneeB(e.target.value)} /><br></br>
                    <button onClick={() => handleInputUpdate()}>Mettre à jour</button>
                </div>
            </center>
            <div>
                <center>
                    <Link to="/map">
                        <div className='bouton'>
                            Pour retourner sur la page d'affichage des API, cliquer ici 
                        </div>
                    </Link>
                </center>
            </div>
        </div>
    );
}

export default Admin;