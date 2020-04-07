import {Character} from "../core/Character";
import {WeaponSpecial} from "../types/items";
import {GameEvents} from "../core/Event";

export function getDamageOnFight(ch1: Character, ch2: Character) {
    const dmg = ch1.getCharacterDamage();
    const def = ch2.getCharacterDefence();

    return Math.max(dmg - def, 0);
}

export function getExpByDMGLVL(chDMG: number, chLVL1: number, chLVL2: number) {
    const lvlDec = Math.max(chLVL2 - chLVL1, 1);

    return lvlDec * (chDMG/2);
}

export function doActionByMuteHammers(client: any, channel: string, userName: string, spec: WeaponSpecial[]) {
    if (spec.includes(WeaponSpecial.MUTE_LITE)) {
        GameEvents.muteByLiteBanHammerLite(channel, userName);
    }

    if (spec.includes(WeaponSpecial.MUTE_MEDIUM)) {
        GameEvents.muteByMediumBanHammer(channel, userName)
    }

    if (spec.includes(WeaponSpecial.MUTE_HARD)) {
        GameEvents.muteByHardBanHammer(channel, userName)
    }
}
