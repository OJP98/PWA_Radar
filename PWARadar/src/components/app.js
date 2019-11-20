/* eslint-disable no-unused-vars */
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';

import { createApolloFetch } from 'apollo-fetch';

const uri = 'http://msdeus.site/lab10';
const apolloFetch = createApolloFetch({ uri });

export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	actualizarUsuarios() {
		const query = `
			query {
				allUsers { name latitude longitude }
			}
		`;

		apolloFetch({ query })
			.then(result => {
				this.setState({ updatedUsers: result.data.allUsers });
			});
	}

	getGeolocation() {

		// Lo primero que deben hacer es validar si el dispositivo soporta geolocacion
		if ('geolocation' in navigator) {
			// console.log('has geolocation');

			// Esta funcion va a ser un callback que va a recibir la posición del dispositivo
			const success = position => {

				// console.log('Datos obtenidos de la posición: ', position);

				const query = `
					mutation {
  						updateUser(name: "Oscar Juárez", latitude: "${position.coords.latitude}", longitude: "${position.coords.longitude}")
  						{
   							name latitude longitude
  						}
					}
				`;
				apolloFetch({ query })
					.then(result => {
						// console.log('Resultados por parte de apollo-fetch:', result.data.updateUser);
						this.setState({ currentPosition: result.data.updateUser }, function(){
							console.log('La posición actual es:', this.state.currentPosition);
						});
					})
					.catch(error => {
						console.log('Error al hacer el query en apollo-fetch:', error);
					});
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
		}
		else {
			console.log('doesnt have geolocation');
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			currentPosition: {},
			updatedUsers: []
		};
	}

	componentDidMount() {
		this.getGeolocation();
		setInterval(this.actualizarUsuarios.bind(this), 1000);
	}

	render() {
		return (
			<div id="app">
				<noscript>
					<h2>La ejecución de Javascript se encuentra deshabilitada</h2>
				</noscript>
				<Helmet
					title="PWARadar"
					noscript={[ { innerHTML: `<link rel="stylesheet" type="text/css" href="style.css" />` } ]}
					link={[
						{ rel: 'apple-touch-icon', href: '../assets/icons/apple-touch-icon.png' },
						{ rel: 'icon', sizes: '192x192', href: '../assets/icons/android-chrome-192x192' }
					]}
				/>
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
				</Router>
			</div>
		);
	}
}
