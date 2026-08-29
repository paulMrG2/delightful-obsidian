interface ContainerOptions {
	alignItems?: string;
	bottom?: string;
	justifyContent?: string;
}

export const delightContainer = (options: ContainerOptions): HTMLDivElement => {
	const container = createEl('div', { cls: 'delightContainer' });
	container.setCssProps({
		'--delight-align-items': options.alignItems ?? 'center',
		'--delight-bottom': options.bottom ?? '0',
		'--delight-justify-content': options.justifyContent ?? 'center',
	});
	return container;
};