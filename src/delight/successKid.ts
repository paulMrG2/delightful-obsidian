import { delightContainer } from './container';
import imageSrc from '../../assets/success-kid.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getSuccessKid(duration: number): void {
	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightSuccessKid',
		attr: { alt: 'Success Kid' },
	});
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({});
	container.append(image);
	document.body.prepend(container);

	window.setTimeout(() => {
		image?.remove();
		container?.remove();
		image = null;
		container = null;
	}, duration);
}