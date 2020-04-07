import {Character} from "../core/Character";
import {weapons} from "../core/ItemsStore";
import {randomizeStats} from "./randomize";
import {SKILL_POINTS_LIMIT} from "../types/character";

export function createCharacter(): Character {
    const randomWeapon = weapons[Math.random() * (weapons.length + 10)]
    const character = new Character(
        randomizeStats(SKILL_POINTS_LIMIT),
        [],
        0,
        0,
        0
    );

    character.equipWeapon(randomWeapon);

    return character;
}
