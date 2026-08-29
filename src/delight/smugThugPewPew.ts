import { delightContainer } from './container';
import imageSrc from '../../assets/smug-thug-pew-pew.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getSmugThugPewPew(duration: number): void {
	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightSmugThugPewPew',
		attr: { alt: 'Smug Thug Pew Pew' },
	});
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ alignItems: 'flex-end', bottom: '100px' });
	container.append(image);
	document.body.prepend(container);

	window.setTimeout(() => {
		image?.remove();
		container?.remove();
		image = null;
		container = null;
	}, duration);
}