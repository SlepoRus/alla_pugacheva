import {CharacterStats, DEFAULT_DAMAGE} from "../types/character";
import {Weapon} from "../Items/Weapon";
import {Armor} from "../Items/Armor";
import {ScaleStats, WeaponSpecial} from "../types/items";

class Character {
    private stats: CharacterStats;
    private weapon: Weapon[];
    private armor: Armor;
    private exp: number;
    private health: number;
    private stamina: number;
    private skillPoints: number;
    private level: number;

    constructor(stats: CharacterStats, weapon: Weapon[], skillPoints: number, level: number, exp: number = 0, armor?: Armor) {
        this.stats = stats;
        this.stamina = stats.stm;
        this.weapon = weapon;
        this.armor = armor;
        this.health = stats.str * 10;
        this.skillPoints = skillPoints;
        this.level = level;
        this.exp = exp;
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

        if (this.exp === (Math.max(Math.pow(this.level,2), 10) * 10)) {
            this.exp = 0;
            this.skillPoints++;
            this.level++;
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

    public getCharacterSpeed() {
        return this.stamina;
    }

    public getLVL() {
        return this.level;
    }

    public equipWeapon(weapon: Weapon) {
        if (!weapon) {
            return;
        }

        const isAvailable = weapon.isAvailable(this.stats);

        if (isAvailable) {
            if (this.weapon.length === 2) {
                this.weapon.pop();
            }

            this.weapon.push(weapon);
        }
    }

    public getStats(): CharacterStats {
        const [ rw, lw ] = this.weapon;
        let { str, agi, int, stm, luck, unluck } = this.stats;

        if (rw) {
            const stats = rw.getStatsBuff();

            str += Number(stats[ScaleStats.STR]);
            agi += Number(stats[ScaleStats.AGI]);
            int += Number(stats[ScaleStats.INT]);
        }

        if (lw) {
            const stats = lw.getStatsBuff();

            str += stats[ScaleStats.STR];
            agi += stats[ScaleStats.AGI];
            int += Number(stats[ScaleStats.INT]);
        }

        return {
            str,
            agi,
            int,
            stm,
            luck,
            unluck
        }
    }

    public getSpecialAttack(): Array<WeaponSpecial> {
        if (this.stats.luck > 0) {
            return this.weapon.map(e => e.special()).filter(Boolean) as Array<WeaponSpecial>;
        }

        return [];
    }

    public getCharacterStatus() {
        const { stm, unluck, luck, int, agi, str } = this.getStats();

        return `сила: ${str}, интелект: ${int}, ловкость: ${agi}, удача: ${luck}, неудача: ${unluck}, выносливость: ${stm}, защита: ${this.getCharacterDefence()}, урон: ${this.getCharacterDamage()}, оружие: [${this.weapon.map((e) => e.getMessage()).join(', ')}]`;
    }
}

export {
    Character
}
