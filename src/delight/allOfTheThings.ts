import { delightContainer } from './container';
import svgText from '../../assets/all-of-the-things.svg';

export function getAllOfTheThings(duration: number): void {
	const allOfTheThingsClass =
		'.delightAllOfTheThings { height:100vh; width:100vw; }';

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = allOfTheThingsClass;
	document.head.append(style);

	// Unique SVG per display so begin="0s" animations always restart
	const uniqueSvg = svgText.replace('</svg>', `<!-- ${Date.now()} --></svg>`);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'All of the things';
	image.classList.add('delightAllOfTheThings');
	image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(uniqueSvg)}`;

	let container: HTMLDivElement | null = delightContainer({});
	container.append(image);
	document.body.prepend(container);

	setTimeout(() => {
		image?.remove();
		style?.remove();
		container?.remove();
		image = null;
		style = null;
		container = null;
	}, duration);
}
