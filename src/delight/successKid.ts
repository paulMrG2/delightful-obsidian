import { delightContainer } from './container';
import imageSrc from '../../assets/success-kid.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getSuccessKid(duration: number): void {
	const successKidClass = '.delightSuccessKid { height:100vh; width:100vw; }';

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = successKidClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Success Kid';
	image.classList.add('delightSuccessKid');
	image.src = dataUri;

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