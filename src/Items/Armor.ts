import {Item} from "./Item";
import {ArmorType, StatsType} from "../types/items";
import {CharacterStats} from "../types/character";
import {calculateScale} from "../helpers/calculateStats";

class Armor extends Item {
    private defence: number;
    private statsBuff: StatsType;
    private scaleStats: StatsType;
    private armorType: ArmorType;

    constructor(
        defence: number,
        uniqName: string,
        cost: number,
        scaleStats: StatsType,
        statsBuff: StatsType,
        armorType: ArmorType,
        requiredStats: CharacterStats
    ) {
        super(uniqName, cost, requiredStats);

        this.defence = defence;
        this.statsBuff = statsBuff;
        this.scaleStats = scaleStats;
        this.armorType = armorType;
    }

    public getArmorDefence(characterStats: CharacterStats) {
        const { defence, scaleStats } = this;

        return calculateScale(scaleStats, defence, characterStats);
    }

    public getStatsBuff() {
        return this.statsBuff;
    }
}

export {
    Armor
}
