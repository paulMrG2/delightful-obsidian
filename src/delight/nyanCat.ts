import { delightContainer } from './container';
import imageSrc from '../../assets/nyan-cat.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getNyanCat(duration: number): void {
	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightNyanCat',
		attr: { alt: 'Nyan Cat' },
	});
	image.src = dataUri;
	image.setCssProps({ '--delight-transition-duration': `${duration - 300}ms` });

	let container: HTMLDivElement | null = delightContainer({});
	container.append(image);
	document.body.prepend(container);

	window.setTimeout(() => image?.classList.add('delightNyanCatMove'), 10);

	window.setTimeout(() => {
		image?.remove();
		container?.remove();
		image = null;
		container = null;
	}, duration);
}