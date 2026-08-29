import logoSvg from '../assets/delightful-logo-horizontal.svg';
import {App, PluginSettingTab, SettingDefinitionItem} from 'obsidian';

import type DelightfulPlugin from './main';


export interface DelightSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface ChanceSetting {
  name: string;
  value: number;
  selected: boolean;
}

export interface DelightfulSettings {
  allDelights: DelightSetting[];
  chanceOfDelight: ChanceSetting[];
  lastDelightNames: [string, string, string];
}

export const DEFAULT_SETTINGS: DelightfulSettings = {
  allDelights: [
    {id: 'delightful_delights_all_of_the_things', name: 'All of the things', description: 'All of the things meme comes to life', enabled: true},
    {id: 'delightful_delights_badger_badger_badger', name: 'Badger Badger Badger', description: 'Badger Badger Badger - from The Badger Song', enabled: true},
    {id: 'delightful_delights_confetti', name: 'Confetti Explosions', description: 'A bunch of confetti explosions all over the screen', enabled: true},
    {id: 'delightful_delights_grogu', name: 'Grogu', description: 'Uses the force of course, and is sometimes called Baby Yoda, or Din Grogu', enabled: true},
    {id: 'delightful_delights_nyan_cat', name: 'Nyan Cat', description: 'No description required, you know what it is', enabled: true},
    {id: 'delightful_delights_parrot', name: 'Party Parrot', description: 'The beloved party parrot dances across the screen', enabled: true},
    {id: 'delightful_delights_smug_thug_pew_pew', name: 'Smug Thug Pew Pew', description: 'Some weird new creation', enabled: true},
    {id: 'delightful_delights_success_kid', name: 'Success Kid', description: 'The success kid meme of memes', enabled: true},
    {id: 'delightful_delights_vault_boy', name: 'Vault Boy', description: 'Vault Boy slides in to celebrate', enabled: true}
  ],
  chanceOfDelight: [
    {name: 'ALL OF THE THINGS!', value: 1.0, selected: false},
    {name: 'Lots of delight', value: 0.75, selected: true},
    {name: 'Sometimes', value: 0.5, selected: false},
    {name: 'Too much delight ruins the fun', value: 0.25, selected: false},
    {name: 'OFF', value: 0, selected: false}
  ],
  lastDelightNames: ['', '', '']
};

const CHANCE_KEY = 'chanceValue';

export class DelightfulSettingTab extends PluginSettingTab {
  plugin: DelightfulPlugin;

  constructor(app: App, plugin: DelightfulPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getControlValue(key: string): unknown {
    if (key === CHANCE_KEY) {
      return String(
        this.plugin.settings.chanceOfDelight.find(c => c.selected)?.value ?? 0.75
      );
    }
    return this.plugin.settings.allDelights.find(d => d.id === key)?.enabled ?? true;
  }

  setControlValue(key: string, value: unknown): void | Promise<void> {
    if (key === CHANCE_KEY) {
      this.plugin.settings.chanceOfDelight.forEach(c => {
        c.selected = String(c.value) === String(value);
      });
    } else {
      const delight = this.plugin.settings.allDelights.find(d => d.id === key);
      if (delight) delight.enabled = value as boolean;
    }
    return this.plugin.saveSettings();
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    const chanceOptions: Record<string, string> = {};
    for (const c of DEFAULT_SETTINGS.chanceOfDelight) {
      chanceOptions[String(c.value)] = c.name;
    }

    const version = this.plugin.manifest.version;

    return [
      // Header
      {
        name: 'Delightful',
        render: (setting) => {
          setting.settingEl.empty();
          setting.settingEl.addClass('delightful-settings-header');
          const img = setting.settingEl.createEl('img', {
            cls: 'delightful-settings-logo'
          });
          img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoSvg)}`;
          img.alt = 'Delightful';
          img.width = 260;
          setting.settingEl.createEl('p', {
            text: 'A little delight goes a long way. Too much delight ruins the fun.',
            cls: 'delightful-settings-tagline'
          });
        }
      },

      // Settings
      {
        name: 'Chance of delight',
        desc: 'How often should a delight appear when you complete a task?',
        control: {type: 'dropdown', key: CHANCE_KEY, options: chanceOptions}
      },
      {
        type: 'group',
        heading: 'Animations',
        items: this.plugin.settings.allDelights.map(delight => ({
          name: delight.name,
          desc: delight.description,
          control: {type: 'toggle', key: delight.id}
        }))
      },

      // About
      {
        type: 'group',
        heading: 'About',
        items: [
          {
            name: 'Support me',
            render: (setting) => {
              setting.nameEl.setText('Support');
              const frag = document.createDocumentFragment();
              const links: { label: string; href: string }[] = [
                {label: 'Sponsor on GitHub', href: 'https://github.com/sponsors/paulMrG2'},
                {label: 'This plugin is also available as a browser extension for GitHub, Todoist, Asana, Trello, Wrike, Jira, ClickUp, Monday.com, and Productive. Click to see it on the Chrome web store.', href: 'https://chromewebstore.google.com/detail/delightful/lcpnconeejbcokkmdmlkhenjnkdcioji'}
              ];
              links.forEach(({label, href}, i) => {
                if (i > 0) frag.append(document.createElement('br'), document.createElement('br'));
                const a = document.createElement('a');
                a.href = href;
                a.textContent = label;
                a.target = '_blank';
                a.rel = 'noopener';
                frag.append(a);
              });
              setting.descEl.append(frag);
            }
          }
        ]
      }
    ];
  }
}