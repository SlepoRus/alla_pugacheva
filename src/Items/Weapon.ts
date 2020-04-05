import {CharacterStats} from "../types/character";
import {Item} from "./Item";
import {ScaleStats} from "../types/items";
import {calculateScale} from "../helpers/calculateStats";

class Weapon extends Item {
    private damage: number;
    private statsBuff: Record<ScaleStats, number>;
    private scaleStats: Record<ScaleStats, number>;
    private weaponType:

    constructor(
        damage: number,
        uniqName: string,
        cost: number,
        scaleStats: Record<ScaleStats, number>,
        statsBuff: Record<ScaleStats, number>
    ) {
        super(uniqName, cost);

        this.damage = damage;
        this.scaleStats = scaleStats;
        this.statsBuff = statsBuff;
    }

    public getWeaponDamage(characterStats: CharacterStats) {
        const { damage, scaleStats } = this;

        return calculateScale(scaleStats, damage, characterStats);
    }

    public getStatsBuff() {
        return this.statsBuff;
    }

    public getWeaponType() {}
}

export {
    Weapon
}
