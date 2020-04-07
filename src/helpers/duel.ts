import {Character} from "../core/Character";

export function calculateDuelDamage(ch1: Character, ch2: Character) {
    return ch1.getCharacterDamage() - ch2.getCharacterDamage();
}

export function calculateLuck(ch1: Character, ch2: Character) {
    return ch1.getStats().luck - ch1.getStats().luck;
}

export function calculateUnluck(ch1: Character, ch2: Character) {
    return ch1.getStats().unluck - ch2.getStats().unluck;
}

export function calculateDefence(ch1: Character, ch2: Character) {
    return ch1.getCharacterDefence() - ch2.getCharacterDefence();
}

export function calculateSpeed(ch1: Character, ch2: Character) {
    return ch1.getCharacterSpeed() - ch2.getCharacterSpeed();
}

export function calculate(ch1: Character, ch2: Character) {
    return {
        SPD: calculateSpeed(ch1, ch2),
        DMG: calculateDuelDamage(ch1, ch2),
        LUCK: calculateLuck(ch1, ch2),
        UNLUCK: calculateUnluck(ch1, ch2),
        DEF: calculateDefence(ch1, ch2)
    }
}
