interface ContainerOptions {
	alignItems?: string;
	bottom?: string;
	display?: string;
	height?: string;
	justifyContent?: string;
	position?: string;
	width?: string;
	zIndex?: string;
}

export const delightContainer = (options: ContainerOptions): HTMLDivElement => {
	const container = document.createElement('div');
	container.className = 'delightContainer';
	container.style.alignItems = options.alignItems ?? 'center';
	container.style.bottom = options.bottom ?? '0';
	container.style.display = options.display ?? 'flex';
	container.style.height = options.height ?? '100%';
	container.style.justifyContent = options.justifyContent ?? 'center';
	container.style.pointerEvents = 'none';
	container.style.position = options.position ?? 'fixed';
	container.style.width = options.width ?? '100%';
	container.style.zIndex = options.zIndex ?? '100000000';
	return container;
};