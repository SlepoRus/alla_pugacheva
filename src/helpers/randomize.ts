import {CharacterStats} from "../types/character";

export function randomizeStats(skillPoints: number): CharacterStats {
    const str = Math.floor(Math.random() * (skillPoints - 6));
    const agi = Math.floor(Math.random() * ((skillPoints - str) - 5));
    const luck = Math.floor(Math.random() * ((skillPoints - str - agi) - 4))
    const unluck = Math.floor(Math.random() * ((skillPoints - str - agi - luck) - 3));
    const stm = Math.floor(Math.random() * ((skillPoints - str - agi - luck - unluck) - 2));
    const int = Math.floor(Math.random() * ((skillPoints - str - agi - luck - unluck - stm) - 1));

    return {
        str,
        agi,
        luck,
        unluck,
        stm,
        int
    }
}

export function getRandomStatBuff(luck: number): [keyof CharacterStats, number] {
    const array: Array<keyof CharacterStats> = ['str', 'agi', 'stm', 'luck', 'unluck', 'int'];
    const stat = array[Math.round(Math.random() * (array.length - 1))];
    let buff = Math.round(Math.random() * 4);

    if (Math.random() * (luck+1) > (luck/2)) {
        buff = -buff;
    }

    return [stat, buff];
}
