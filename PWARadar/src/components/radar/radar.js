import { h } from 'preact';
import style from './style.css';

const Radar = () => (
	<div class={style.radarDiv}>
		<div class={style.radarOutline}>
			<div class={style.radar} />
		</div>
	</div>
);

export default Radar;
