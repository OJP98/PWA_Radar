/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import { h, render, Component } from 'preact';
import style from './style';
import Radar from '../../components/radar/radar.js';
import Mark from '../../components/mark/mark.js';

const Home =  ({ currentPosition, updatedUsers }) => (
	<div class={style.home}>
		<h1>A real-time radar</h1>
		<p>Created with PreactJS</p>
		<Radar />
		<div class={style.userDots}>
			{updatedUsers.map(data => {
				const name = data.name;
				if (name === 'Oscar Juárez') data.name = 'Pos. Actual';
				let posX = (data.latitude - currentPosition.latitude) * 800 + (window.innerWidth / 2);
				const posY = (data.longitude - currentPosition.longitude) * 800 + (window.innerHeight / 2);
				if (Math.abs(posX) < window.innerWidth * 0.8 && Math.abs(posY) < window.innerHeight * 0.8)
					return <Mark posX={posX - 13} posY={posY + 15} name={data.name} />;
			})}
		</div>
	</div>
);

export default Home;