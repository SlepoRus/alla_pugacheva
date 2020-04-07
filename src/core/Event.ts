export class GameEvents {
    public static client: any;

    public static muteByLiteBanHammerLite(userName: string, channel: string) {
        GameEvents.client.timeout(channel, userName, 60, "прок молота-табуретки");
    }

    public static muteByMediumBanHammer(userName: string, channel: string) {
        GameEvents.client.timeout(channel, userName, 600, "прок молота-стульчика");
    }

    public static muteByHardBanHammer(userName: string, channel: string) {
        GameEvents.client.timeout(channel, userName, 1800, "прок молота-дивана");
    }

    public static muteByFun(userName: string, channel: string) {
        GameEvents.client.timeout(channel, userName, 600, "за проигрышь, хуль");
    }

    public static muteByUnluckEvent(userNames: string[], unluck: number, channel: string): boolean {
        let getProc = false;
        let tries = unluck + 20;

        while(tries > 0 || getProc === true) {
            if (Math.floor(Math.random() * 120) % 50 === 0) {
                getProc = true;
            }

            tries--;
        }

        if (getProc) {
            userNames.forEach(userName => GameEvents.client.timeout(channel, userName, unluck * 10, 'мут из-за невезения в дуэли'))
        }

        return getProc;
    }
}
