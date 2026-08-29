import { delightContainer } from './container';
import imageSrc from '../../assets/badger.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

function getBadgerCss(bNum: number): string {
	const width = Math.round(document.body.clientWidth / 3) - bNum * 70;
	const positions: { x: number; y: number }[] = [
		{ x: 20, y: 50 },
		{ x: 70, y: 45 },
		{ x: 40, y: 30 },
		{ x: 30, y: 20 },
		{ x: 60, y: 15 },
		{ x: 20, y: 10 },
	];
	const pos = positions[bNum] ?? { x: 10, y: 15 };
	return `.delightBadger${bNum} { width:${width}px; position:fixed; left:${pos.x}%; top:${pos.y}%; z-index:${5 - bNum}; }`;
}

export function getBadgerBadgerBadger(duration: number): void {
	let badgerClasses = '';
	for (let i = 0; i < 6; i++) {
		badgerClasses += getBadgerCss(i);
	}

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = badgerClasses;
	document.head.append(style);

	let container: HTMLDivElement | null = delightContainer({});
	document.body.prepend(container);

	for (let i = 0; i < 6; i++) {
		const img = document.createElement('img');
		img.alt = 'Badger';
		img.classList.add(`delightBadger${i}`);
		img.src = dataUri;

		setTimeout(() => container?.append(img), 350 * i);
		setTimeout(() => img.remove(), duration);
	}

	setTimeout(() => {
		style?.remove();
		container?.remove();
		style = null;
		container = null;
	}, duration);
}
