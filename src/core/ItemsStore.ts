import {Weapon} from "../Items/Weapon";
import {ArmorType, ScaleStats, WeaponSpecial, WeaponType} from "../types/items";
import {Armor} from "../Items/Armor";

const sword_1 = new Weapon(
    10,
    'обычный меч',
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
    'обычный меч, который даст вам немного силы и ловкости',
    {
        str: 6,
        agi: 5,
        int: 0,
        stm: 5,
        luck: 0,
        unluck: 0
    }
);

const sword_2 = new Weapon(
    20,
    'меч-акула',
    5,
    {
        [ScaleStats.STR]: 0.5,
        [ScaleStats.AGI]: .3
    },
    {
        [ScaleStats.STR]: 2,
        [ScaleStats.AGI]: 1.4
    },
    WeaponType.SWORD,
    'меч-акула, который даст вам акулу и меч',
    {
        str: 8,
        agi: 7,
        int: 0,
        stm: 0,
        luck: 0,
        unluck: 0
    }
);

const armor_1 = new Armor(
    20,
    'пакет из пятерочки',
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
        luck: 0,
        unluck: 0
    }
);

const bolder = new Weapon(
    3,
    'камень',
    5,
    {
        [ScaleStats.STR]: 0.2,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.STR]: 2,
        [ScaleStats.AGI]: 0
    },
    WeaponType.MACE,
    'камень, охуенно, да? Дает 2 силы',
{
        str: 0,
        agi: 0,
        int: 0,
        stm: 0,
        luck: 0,
        unluck: 0
    }
);

const bigBolder = new Weapon(
    4,
    'большой камень',
    5,
    {
        [ScaleStats.STR]: 0.4,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.STR]: 4,
        [ScaleStats.AGI]: 0
    },
    WeaponType.MACE,
    'большой камень, охуенно, да? Дает 4 силы',
    {
        str: 10,
        agi: 0,
        int: 0,
        stm: 0,
        luck: 0,
        unluck: 0
    }
);

const tetris = new Weapon(
    10,
    'тетрис',
    5,
    {
        [ScaleStats.INT]: 0.8,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.INT]: 10,
        [ScaleStats.AGI]: 0
    },
    WeaponType.MACE,
    'посох-тетрис. Дает 10 инты и олд-скулы',
    {
        str: 2,
        agi: 0,
        int: 10,
        stm: 0,
        luck: 2,
        unluck: 0
    }
);

export const banHammer = new Weapon(
    2,
    'молот-табуретка',
    20,
    {
        [ScaleStats.INT]: 0.8,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.INT]: 10,
        [ScaleStats.AGI]: 10
    },
    WeaponType.MACE,
    'молот-табуретка. Шанс 50% в схватке выдать мут на 60 секунд',
    {
        str: 2,
        agi: 0,
        int: 10,
        stm: 0,
        luck: 2,
        unluck: 0
    },
    () => {
        if (Math.round(Math.random()) === 1) {
            return WeaponSpecial.MUTE_LITE;
        } else {
            return false;
        }
    }
);

export const mediumBanHammer = new Weapon(
    2,
    'молот-стульчик',
    20,
    {
        [ScaleStats.INT]: 0.8,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.INT]: 10,
        [ScaleStats.AGI]: 10
    },
    WeaponType.MACE,
    'молот-стульчик. Шанс 50% в схватке выдать мут на 600 секунд',
    {
        str: 2,
        agi: 0,
        int: 10,
        stm: 0,
        luck: 10,
        unluck: 0
    },
    () => {
        if (Math.round(Math.random()) === 1) {
            return WeaponSpecial.MUTE_MEDIUM;
        } else {
            return false;
        }
    }
);

export const hardBanHammer = new Weapon(
    2,
    'молот-диван',
    20,
    {
        [ScaleStats.INT]: 0.8,
        [ScaleStats.AGI]: 0
    },
    {
        [ScaleStats.INT]: 10,
        [ScaleStats.AGI]: 10
    },
    WeaponType.MACE,
    'молот-диван. Шанс 50% в схватке выдать мут на 1800 секунд',
    {
        str: 2,
        agi: 0,
        int: 10,
        stm: 0,
        luck: 10,
        unluck: 0
    },
    () => {
        if (Math.round(Math.random()) === 1) {
            return WeaponSpecial.MUTE_HARD;
        } else {
            return false;
        }
    }
);

export const weapons = [
    sword_1,
    sword_2,
    bolder,
    bigBolder,
    tetris,
];

export const randomDropWeapons = [
    banHammer,
    mediumBanHammer,
    hardBanHammer
]

export const armor = [
    armor_1,
];
