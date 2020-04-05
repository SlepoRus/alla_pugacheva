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
    private skillPoints: number;
    private level: number;

    constructor(stats: CharacterStats, weapon: Weapon[], skillPoints: number, level: number, armor?: Armor) {
        this.stats = stats;
        this.weapon = weapon;
        this.armor = armor;
        this.skillPoints = skillPoints;
        this.level = level;
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
            const [wp] = weapon;

            if (wp.isAvailable(stats)) {
                return wp.getWeaponDamage(stats)
            } else {
                return DEFAULT_DAMAGE;
            }
        }

        if (weapon.length === 2) {
            const [rwp, lwp] = weapon;

            let rwpDamage = rwp.isAvailable(stats) ? (rwp.getWeaponDamage(stats)*.7) : DEFAULT_DAMAGE;
            let lwpDamage = lwp.isAvailable(stats) ? (lwp.getWeaponDamage(stats)*.3) : 0;

            return lwpDamage + rwpDamage;
        }

        return DEFAULT_DAMAGE;
    }

    public increaseExp(exp: number) {
        this.exp += exp;

        if (this.exp === (this.level^2) * 10) {
            this.exp = 0;
            this.skillPoints++;
        }
    }

    public increaseHealth(health: number) {
        this.health += health;
    }

    public increaseStamina(stamina: number) {
        this.stamina += stamina;
    }

    public isAlive() {
        return this.health > 0;
    }

    public canMove() {
        return this.stamina > 0;
    }

    public decreaseExp(exp: number) {
        this.exp -= exp;
    }

    public decreaseHealth(health: number) {
        this.health -= health;
    }

    public decreaseStamina(stamina: number) {
        this.stamina -= stamina;
    }

    public increaseStats(stat: keyof CharacterStats, inc: number) {
        this.stats[stat] += inc;
    }
}
