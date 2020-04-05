import {CharacterStats} from "../types/character";

class Item {
    private uniqName: string;
    private cost: number;
    private requiredStats: CharacterStats;

    constructor(uniqName: string, cost: number) {
        this.uniqName = uniqName;
        this.cost = cost;
    }

    private additionalRequires() {
        return true;
    }

    public do() {

    };

    public canBuy(characterStats: CharacterStats, money: number): boolean {
        return this.isAvailable(characterStats) && this.cost <= money;
    }

    public isAvailable(characterStats: CharacterStats): boolean {
        return this.additionalRequires() && this.requires(characterStats);
    }

    private requires(characterStats: CharacterStats): boolean {
        const keys = Object.keys(this.requiredStats);

        return keys.every((key) => this.requiredStats[key] <= characterStats[key]);
    };
}

export {
    Item
}
