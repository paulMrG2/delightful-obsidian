import { delightContainer } from './container';
import imageSrc from '../../assets/vault-boy.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getVaultBoy(duration: number): void {
	const height = 500;
	const moveX = 600;

	const vaultBoyClass =
		`.delightVaultBoy { height:${height}px; position:fixed; bottom:0; transform:translateX(${moveX}px); transition:transform 350ms ease; }` +
		`.delightVaultBoyMove { transform:translateX(0); transition:transform 550ms ease; }`;

	let style: HTMLStyleElement | null = document.createElement('style');
	style.setAttribute('delight', 'css');
	style.innerHTML = vaultBoyClass;
	document.head.append(style);

	let image: HTMLImageElement | null = document.createElement('img');
	image.alt = 'Vault Boy';
	image.classList.add('delightVaultBoy');
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ justifyContent: 'flex-end' });
	container.append(image);
	document.body.prepend(container);

	setTimeout(() => image?.classList.add('delightVaultBoyMove'), 10);
	setTimeout(() => image?.classList.remove('delightVaultBoyMove'), 1650);

	setTimeout(() => {
		image?.remove();
		style?.remove();
		container?.remove();
		image = null;
		style = null;
		container = null;
	}, duration);
}