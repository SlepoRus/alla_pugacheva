import {Weapon} from "../Items/Weapon";
import {ScaleStats, WeaponType} from "../types/items";

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
        str: 8,
        agi: 7,
        int: 0,
        stm: 6,
        luck: 0
    }
);

export const store = [
    sword_1,
    sword_2
];
