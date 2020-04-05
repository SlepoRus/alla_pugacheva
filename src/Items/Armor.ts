import {Item} from "./Item";
import {ScaleStats} from "../types/items";
import {CharacterStats} from "../types/character";
import {calculateScale} from "../helpers/calculateStats";

class Armor extends Item {
    private defence: number;
    private statsBuff: Record<ScaleStats, number>;
    private scaleStats: Record<ScaleStats, number>;

    constructor(
        defence: number,
        uniqName: string,
        cost: number,
        scaleStats: Record<ScaleStats, number>,
        statsBuff: Record<ScaleStats, number>
    ) {
        super(uniqName, cost);

        this.defence = defence;
        this.statsBuff = statsBuff;
        this.scaleStats = scaleStats;
    }

    public getArmorDefence(characterStats: CharacterStats) {
        const { defence, scaleStats } = this;

        return calculateScale(scaleStats, defence, characterStats);
    }

    public getStatsBuff() {
        return this.statsBuff;
    }
}
