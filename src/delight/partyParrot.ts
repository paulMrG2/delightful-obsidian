import { delightContainer } from './container';
import imageSrc from '../../assets/parrot.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getParrot(duration: number): void {
	const width = 400;

	const parrotClass =
		`.delightParrot { width:${width}px; max-height:100vh; position:fixed; bottom:0; transform:translateX(calc(-50vw - ${width / 2}px)); }` +
		`.delightParrotMove { transform:translateX(calc(50vw + ${width / 2}px)); transition:transform ${duration - 300}ms cubic-bezier(0.2, 0.8, 0.8, 0.2); }`;

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = parrotClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Dancing parrot';
	image.classList.add('delightParrot');
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({});
	container.append(image);
	document.body.prepend(container);

	setTimeout(() => image?.classList.add('delightParrotMove'), 10);

	setTimeout(() => {
		image?.remove();
		style?.remove();
		container?.remove();
		image = null;
		style = null;
		container = null;
	}, duration);
}