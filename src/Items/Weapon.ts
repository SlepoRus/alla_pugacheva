import {CharacterStats} from "../types/character";
import {Item} from "./Item";
import {StatsType, WeaponSpecial, WeaponType} from "../types/items";
import {calculateScale} from "../helpers/calculateStats";

class Weapon extends Item {
    private damage: number;
    private statsBuff: StatsType;
    private scaleStats: StatsType;
    private weaponType: WeaponType;
    private message: string;

    constructor(
        damage: number,
        uniqName: string,
        cost: number,
        scaleStats: StatsType,
        statsBuff: StatsType,
        weaponType: WeaponType,
        message: string,
        requiredStats: CharacterStats,
        special?: () => WeaponSpecial | boolean
    ) {
        super(uniqName, cost, requiredStats);

        this.damage = damage;
        this.scaleStats = scaleStats;
        this.statsBuff = statsBuff;
        this.weaponType = weaponType;
        this.special = special;
        this.message = message;
    }

    public special(): WeaponSpecial | boolean {
        return false;
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

    public getMessage() {
        return this.message;
    }
}

export {
    Weapon
}
