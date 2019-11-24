import { h } from 'preact';
import style from './style.css';

const Mark = ({ posX, posY, name }) => (
	<div style={{ left: `${posX}px`, top: `${posY}px` }} class={style.markDiv}>
		<div class={style.dotContainer}>
			<div class={style.dot} />
		</div>
		<div class={style.userData}>{name}</div>
	</div>
);

export default Mark;
