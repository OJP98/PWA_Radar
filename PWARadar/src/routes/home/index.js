import { h } from 'preact';
import style from './style';
import Radar from '../../components/radar/radar.js';

const Home = () => (
	<div class={style.home}>
		<h1>A real-time radar</h1>
		<p>Created with PreactJS</p>
		<br />
		<Radar />
	</div>
);

export default Home;
