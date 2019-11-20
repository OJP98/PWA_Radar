/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import { h, render, Component } from 'preact';
import style from './style';
import Radar from '../../components/radar/radar.js';
import Mark from '../../components/mark/mark.js';


export default class Home extends Component {

	render() {
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