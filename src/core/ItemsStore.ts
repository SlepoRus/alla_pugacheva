import {Weapon} from "../Items/Weapon";
import {ArmorType, ScaleStats, WeaponType} from "../types/items";
import {Armor} from "../Items/Armor";

const sword_1 = new Weapon(
    10,
    'sword_RS.5A.3BS1A.7',
    5,
    {
        [ScaleStats.STR]: 0.5,
        [ScaleStats.AGI]: .3
    },
    {
        [ScaleStats.STR]: 1,
        [ScaleStats.AGI]: .7
    },
    WeaponType.SWORD,
    {
        str: 6,
        agi: 5,
        int: 0,
        stm: 5,
        luck: 0
    }
)

const sword_2 = new Weapon(
    20,
    'sword_RS8A7BS1A.7',
    5,
    {
        [ScaleStats.STR]: 0.5,
        [ScaleStats.AGI]: .3
    },
    {
        [ScaleStats.STR]: 1,
        [ScaleStats.AGI]: .7
    },
    WeaponType.SWORD,
    {
        str: 8,
        agi: 7,
        int: 0,
        stm: 0,
        luck: 0
    }
);

const armor_1 = new Armor(
    20,
    'armor_RS2BS1A.7',
    5,
    {
        [ScaleStats.STR]: 0.5,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.STR]: 2,
        [ScaleStats.AGI]: 0
    },
    ArmorType.LITE,
    {
        str: 2,
        agi: 0,
        int: 0,
        stm: 0,
        luck: 0
    }
)

export const store = [
    sword_1,
    sword_2,
    armor_1
];
