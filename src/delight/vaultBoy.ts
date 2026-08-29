import { delightContainer } from './container';
import imageSrc from '../../assets/vault-boy.svg';

const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(imageSrc)}`;

export function getVaultBoy(duration: number): void {
	let image: HTMLImageElement | null = createEl('img', {
		cls: 'delightVaultBoy',
		attr: { alt: 'Vault Boy' },
	});
	image.src = dataUri;

	let container: HTMLDivElement | null = delightContainer({ justifyContent: 'flex-end' });
	container.append(image);
	document.body.prepend(container);

	window.setTimeout(() => image?.classList.add('delightVaultBoyMove'), 10);
	window.setTimeout(() => image?.classList.remove('delightVaultBoyMove'), 1650);

	window.setTimeout(() => {
		image?.remove();
		container?.remove();
		image = null;
		container = null;
	}, duration);
}