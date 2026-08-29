import {getAllOfTheThings} from './delight/allOfTheThings';
import {getBadgerBadgerBadger} from './delight/badger';
import {getConfetti} from './delight/confetti';
import {getGrogu} from './delight/grogu';
import {getNyanCat} from './delight/nyanCat';
import {getParrot} from './delight/partyParrot';
import {getSmugThugPewPew} from './delight/smugThugPewPew';
import {getSuccessKid} from './delight/successKid';
import {getVaultBoy} from './delight/vaultBoy';

import type {DelightfulSettings} from './settings';


const DURATION = 2000;

let animationRunning = false;

export const doAnimation = (settings: DelightfulSettings, event: MouseEvent): void => {
  if (animationRunning) return;

  const userDefinedChance = settings.chanceOfDelight.find(c => c.selected)?.value ?? 0;
  if (Math.random() >= userDefinedChance) return;

  const enabledDelights = settings.allDelights.filter(d => d.enabled);
  if (enabledDelights.length === 0) return;

  animationRunning = true;

  let delight = enabledDelights[Math.floor(Math.random() * enabledDelights.length)]!;

  // Avoid repeating the last 3 delights
  if (enabledDelights.length > 3) {
    while (
      delight.id === settings.lastDelightNames[0] ||
      delight.id === settings.lastDelightNames[1] ||
      delight.id === settings.lastDelightNames[2]
      ) {
      delight = enabledDelights[Math.floor(Math.random() * enabledDelights.length)]!;
    }
  }

  settings.lastDelightNames = [delight.id, settings.lastDelightNames[0], settings.lastDelightNames[1]];

  switch (delight.id) {
    case 'delightful_delights_all_of_the_things':
      getAllOfTheThings(DURATION);
      break;
    case 'delightful_delights_badger_badger_badger':
      getBadgerBadgerBadger(DURATION);
      break;
    case 'delightful_delights_confetti':
      getConfetti(DURATION);
      break;
    case 'delightful_delights_grogu':
      getGrogu(DURATION, event);
      break;
    case 'delightful_delights_nyan_cat':
      getNyanCat(DURATION);
      break;
    case 'delightful_delights_parrot':
      getParrot(DURATION);
      break;
    case 'delightful_delights_smug_thug_pew_pew':
      getSmugThugPewPew(DURATION);
      break;
    case 'delightful_delights_success_kid':
      getSuccessKid(DURATION);
      break;
    case 'delightful_delights_vault_boy':
      getVaultBoy(DURATION);
      break;
  }

  setTimeout(() => {
    animationRunning = false;
  }, DURATION);
};
