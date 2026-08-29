import { delightContainer } from './container';
import svgText from '../../assets/all-of-the-things.svg';

export function getAllOfTheThings(duration: number): void {
	// Unique SVG per display so begin="0s" animations always restart
	const uniqueSvg = svgText.replace('</svg>', `<!-- ${Date.now()} --></svg>`);

	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightAllOfTheThings',
		attr: { alt: 'All of the things' },
	});
	image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(uniqueSvg)}`;

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