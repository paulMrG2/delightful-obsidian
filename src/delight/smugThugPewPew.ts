import { delightContainer } from './container';
import imageSrc from '../../assets/smug-thug-pew-pew.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getSmugThugPewPew(duration: number): void {
	const smugClass = '.delightSmugThugPewPew { width:min(80%, 800px); }';

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = smugClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Smug Thug Pew Pew';
	image.classList.add('delightSmugThugPewPew');
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ alignItems: 'flex-end', bottom: '100px' });
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
