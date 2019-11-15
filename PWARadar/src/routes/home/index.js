/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import { h, render, Component } from 'preact';
import style from './style';
import Radar from '../../components/radar/radar.js';
import Mark from '../../components/mark/mark.js';


export default class Home extends Component {

	state = {
		currentPosition: 'position'
	};

	render() {
		if ('geolocation' in navigator) {   // Lo primero que deben hacer es validar si el dispositivo soporta geolocacion
			console.log('has geolocation');

			const success = position => {   // Esta funcion va a ser un callback que va a recibir la posición del dispositivo
				// this.setState({ currentPosition: position });
				console.log('success', position);
			};

			const error = err => {
				console.log('error', err);

				/*
					El error tiene dos valores, un código de error y un texto

					el codigo puede ser
					- 0 si es un error generico
					- 1 si el usuario respondio que "no" al prompt de "This webpage wants to know your location"
					- 2 si no se pudo determinar la ubicacion, por ejemplo, si no tiene acceso a los satelites de GPS ni a wifi
					- 3 si no se pudo acceder al sensor en el tiempo limite
				*/
			};

			// Este metodo nos da la ubicación una unica vez
			const loc = navigator.geolocation.getCurrentPosition(
				success, // esta funcion se va a llamar si fue exitosa la medida
				error,  // esta se va a llamar si no
				{ // estos parametros son para configurar la medida
					maximumAge: 1000000,  // esto controla la cache de las mediciones, no necesitan cambiarlo
					timeout: 1000, // si la medida toma un tiempo mayor a este parametro, se va a generar el error 3
					enableHighAccurancy: true // highAccurancy gasta mas bateria y toma mas tiempo, pero tiene mejor accurancy
				}
			);


			// Este metodo nos da la ubicacion cada vez que el usuario se mueva
			const watcher = navigator.geolocation.watchPosition(
				success,  // success se va a llamar dos veces por cada cambio de ubicacion
				error,
				{
					maximumAge: 0,
					enableHighAccurancy: true
				}
			);

			// Para debuggear, usen sus developer tools > el menu de los tres puntos > More tools > Sensors > geolocation
			// Pueden cambiar su ubicacion mientras desarrollan

		}
		else {
			console.log('doesnt have geolocation');
		}

		return (
			<div class={style.home}>
				<h1>A real-time radar</h1>
				<p>Created with PreactJS</p>
				<br />
				<Radar />
				<Mark />
			</div>
		);
	}

}