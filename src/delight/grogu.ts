import { delightContainer } from './container';
import imageSrc from '../../assets/grogu-the-force.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getGrogu(duration: number, event: MouseEvent): void {
	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightGrogu',
		attr: { alt: 'Grogu' },
	});
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ justifyContent: 'flex-end' });
	container.append(image);
	document.body.prepend(container);

	window.setTimeout(() => image?.classList.add('delightGroguMove'), 10);

	const shakeTarget = (event.target as HTMLElement).closest('div');
	if (shakeTarget) {
		window.setTimeout(() => shakeTarget.classList.add('delightGroguShakeIt'), 600);
		window.setTimeout(() => shakeTarget.classList.remove('delightGroguShakeIt'), 1800);
	}

	window.setTimeout(() => image?.classList.remove('delightGroguMove'), 1650);

	window.setTimeout(() => {
		image?.remove();
		container?.remove();
		image = null;
		container = null;
	}, duration);
}