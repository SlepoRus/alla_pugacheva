import {CharacterStats, DEFAULT_DAMAGE} from "../types/character";
import {Weapon} from "../Items/Weapon";
import {Armor} from "../Items/Armor";

class Character {
    private stats: CharacterStats;
    private weapon: Weapon[];
    private armor: Armor;
    private exp: number;
    private health: number;
    private stamina: number;

    constructor(stats: CharacterStats, weapon: Weapon[], armor?: Armor) {
        this.stats = stats;
        this.weapon = weapon;
        this.armor = armor;
    }

    public getSerializeCharacter() {
        return JSON.stringify(this);
    }

    public getCharacterDefence() {
        const { armor } = this;

        if (!armor) {
            return 0;
        }

        return this.armor.getArmorDefence(this.stats);
    }

    public getCharacterDamage() {
        const { weapon, stats } = this;

        if (weapon.length === 1) {
            const [wp] = weapon

            if (wp.isAvailable(stats)) {
                return wp.getWeaponDamage(stats)
            } else {
                return DEFAULT_DAMAGE;
            }

        }
    }

    public increaseExp(exp: number) {
        this.exp += exp;
    }

    public increaseHealth(exp: number) {
        this.exp += exp;
    }

    public increaseStamina(exp: number) {
        this.exp += exp;
    }

    public isAlive() {
        return this.health < 0;
    }

    public decreaseHealth(health: number) {
        this.health -= health;
    }

    public decreaseStamina(stamina: number) {
        this.stamina -= stamina;
    }
}
