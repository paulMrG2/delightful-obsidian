import { delightContainer } from './container';
import imageSrc from '../../assets/grogu-the-force.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getGrogu(duration: number, event: MouseEvent): void {
	const height = 500;

	const groguClass =
		`.delightGrogu { height:${height}px; position:fixed; bottom:0; transform:translateY(${height}px); transition:transform 350ms ease; }` +
		`.delightGroguMove { transform:translateY(-20px); transition:transform 550ms ease; }` +
		`.delightGroguShakeIt { animation:delightGroguShakeScreenWithTheForce 0.5s; animation-iteration-count:infinite; }` +
		`@keyframes delightGroguShakeScreenWithTheForce {
			0%   { transform:translate(8px, 8px) rotate(0deg); }
			10%  { transform:translate(-8px, -4px) rotate(-2deg); }
			20%  { transform:translate(-6px, 0px) rotate(2deg); }
			30%  { transform:translate(6px, 4px) rotate(0deg); }
			40%  { transform:translate(8px, -8px) rotate(2deg); }
			50%  { transform:translate(-8px, 4px) rotate(-2deg); }
			60%  { transform:translate(-6px, 8px) rotate(0deg); }
			70%  { transform:translate(6px, 8px) rotate(-2deg); }
			80%  { transform:translate(-8px, -8px) rotate(2deg); }
			90%  { transform:translate(8px, 4px) rotate(0deg); }
			100% { transform:translate(8px, -4px) rotate(-2deg); }
		}`;

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = groguClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Grogu';
	image.classList.add('delightGrogu');
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ justifyContent: 'flex-end' });
	container.append(image);
	document.body.prepend(container);

	setTimeout(() => image?.classList.add('delightGroguMove'), 10);

	const shakeTarget = (event.target as HTMLElement).closest('div');
	if (shakeTarget) {
		setTimeout(() => shakeTarget.classList.add('delightGroguShakeIt'), 600);
		setTimeout(() => shakeTarget.classList.remove('delightGroguShakeIt'), 1800);
	}

	setTimeout(() => image?.classList.remove('delightGroguMove'), 1650);

	setTimeout(() => {
		image?.remove();
		style?.remove();
		container?.remove();
		image = null;
		style = null;
		container = null;
	}, duration);
}
