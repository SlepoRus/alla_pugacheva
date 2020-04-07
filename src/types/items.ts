export enum Poitions {
    mana_1 = 'mana_1',
    mana_2 = 'mana_2',
    health_1 = 'health_1',
    health_2 = 'health_2'
}

interface ItemsMainStats {

}

export enum ScaleStats {
    STR = 'STR',
    AGI = 'AGI',
    INT = 'INT',
    STM = 'STM',
    LUCK = 'LUCK'
}

export enum WeaponType {
    SWORD = 'SWORD',
    MACE = 'MACE',
    AXE = 'AXE',
    STAFF = 'STAFF',
    BIG_SWORD = 'BIG_SWORD',
    BIG_MACE = 'BIG_MACE'
}

export enum WeaponSpecial {
    MUTE_LITE = 'MUTE_LITE',
    MUTE_MEDIUM = 'MUTE_MEDIUM',
    MUTE_HARD = 'MUTE_HARD'
}

export enum ArmorType {
    LITE = 'LITE',
    MEDIUM = 'MEDIUM',
    HEAVY = 'HEAVY'
}

export type StatsType = Partial<Record<ScaleStats, number>>;
