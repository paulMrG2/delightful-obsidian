import { delightContainer } from './container';
import imageSrc from '../../assets/nyan-cat.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getNyanCat(duration: number): void {
	const width = 700;

	const nyanCatClass =
		`.delightNyanCat { width:${width}px; height:100%; position:fixed; bottom:0; transform:translateX(calc(-50vw - ${width / 2}px)); }` +
		`.delightNyanCatMove { transform:translateX(calc(50vw + ${width / 2}px)); transition:transform ${duration - 300}ms cubic-bezier(0.2, 0.8, 0.8, 0.2); }`;

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = nyanCatClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Nyan Cat';
	image.classList.add('delightNyanCat');
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({});
	container.append(image);
	document.body.prepend(container);

	setTimeout(() => image?.classList.add('delightNyanCatMove'), 10);

	setTimeout(() => {
		image?.remove();
		style?.remove();
		container?.remove();
		image = null;
		style = null;
		container = null;
	}, duration);
}