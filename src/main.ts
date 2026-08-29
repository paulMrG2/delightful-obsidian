import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, DelightfulSettings, DelightfulSettingTab } from './settings';
import { doAnimation } from './animation';

export default class DelightfulPlugin extends Plugin {
	declare settings: DelightfulSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new DelightfulSettingTab(this.app, this));

		this.registerDomEvent(document, 'click', (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.matches('.task-list-item-checkbox') &&
				(target as HTMLInputElement).checked
			) {
				doAnimation(this.settings, e);
			}
		});
	}

	onunload() {}

	async loadSettings() {
		const stored = (await this.loadData()) as Partial<DelightfulSettings> | null;
		// Merge stored values into defaults so new delights added in future versions appear enabled
		this.settings = {
			...DEFAULT_SETTINGS,
			...stored,
			allDelights: DEFAULT_SETTINGS.allDelights.map(defaultDelight => {
				const storedDelight = stored?.allDelights?.find(d => d.id === defaultDelight.id);
				return storedDelight ? { ...defaultDelight, enabled: storedDelight.enabled } : defaultDelight;
			}),
			chanceOfDelight: stored?.chanceOfDelight ?? DEFAULT_SETTINGS.chanceOfDelight,
			lastDelightNames: stored?.lastDelightNames ?? DEFAULT_SETTINGS.lastDelightNames,
		};
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
