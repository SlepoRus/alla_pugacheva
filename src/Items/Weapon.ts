import {CharacterStats} from "../types/character";
import {Item} from "./Item";
import {StatsType, WeaponType} from "../types/items";
import {calculateScale} from "../helpers/calculateStats";

class Weapon extends Item {
    private damage: number;
    private statsBuff: StatsType;
    private scaleStats: StatsType;
    private weaponType: WeaponType;

    constructor(
        damage: number,
        uniqName: string,
        cost: number,
        scaleStats: StatsType,
        statsBuff: StatsType,
        weaponType: WeaponType,
        requiredStats: CharacterStats
    ) {
        super(uniqName, cost, requiredStats);

        this.damage = damage;
        this.scaleStats = scaleStats;
        this.statsBuff = statsBuff;
        this.weaponType = weaponType;
    }

    public getWeaponDamage(characterStats: CharacterStats) {
        const { damage, scaleStats } = this;

        return calculateScale(scaleStats, damage, characterStats);
    }

    public getStatsBuff() {
        return this.statsBuff;
    }

    public getWeaponType() {
        return this.weaponType;
    }
}

export {
    Weapon
}
