import { delightContainer } from './container';
import imageSrc from '../../assets/badger.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getBadgerBadgerBadger(duration: number): void {
	let container: HTMLDivElement | null = delightContainer({});
	document.body.prepend(container);

	for (let i = 0; i < 6; i++) {
		const width = Math.round(document.body.clientWidth / 3) - i * 70;
		const img = createEl('img', {
			cls: ['delightBadger', `delightBadger${i}`],
			attr: { alt: 'Badger' },
		});
		img.src = dataUri;
		img.setCssProps({ '--delight-badger-width': `${width}px` });

		window.setTimeout(() => container?.append(img), 350 * i);
		window.setTimeout(() => img.remove(), duration);
	}

	window.setTimeout(() => {
		container?.remove();
		container = null;
	}, duration);
}