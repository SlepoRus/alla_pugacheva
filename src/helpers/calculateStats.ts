import {ScaleStats} from "../types/items";
import {CharacterStats} from "../types/character";

export function calculateScale(scaleStats: Record<ScaleStats, number>, ownStat: number, {
    str, agi, int
}: CharacterStats) {
    const keys = Object.keys(scaleStats) as ScaleStats[];

    return keys.reduce((acc: number, key: ScaleStats) => {
        switch(key) {
            case ScaleStats.AGI:
                acc += agi * scaleStats[ScaleStats.AGI];
                break;
            case ScaleStats.INT:
                acc += int * scaleStats[ScaleStats.INT];
                break;
            case ScaleStats.STR:
                acc += str * scaleStats[ScaleStats.STR];
                break;
        }

        return acc;
    }, 0) + ownStat
}