import {Command} from "../cmd/Command";
import {Character} from "./Character";
import {parseNameForChat, parseToFight} from "../helpers/parser";
import {createCharacter} from "../helpers/create";
import {calculate} from "../helpers/duel";
import {doActionByMuteHammers} from "../helpers/actions";
import {hardBanHammer, mediumBanHammer, weapons} from "./ItemsStore";
import {GameEvents} from "./Event";
import {getRandomStatBuff} from "../helpers/randomize";

const characters: Record<string, Character> = {
    ['sleporus']: new Character(
        {
            str: 99,
            int: 99,
            luck: 99,
            unluck: 0,
            stm: 99,
            agi: 99
        },
        [mediumBanHammer],
        10000,
        0
    ),
    ['lordar2r']: new Character(
        {
            str: 99,
            int: 99,
            luck: 99,
            unluck: 0,
            stm: 99,
            agi: 99
        },
        [hardBanHammer],
        10000,
        0
    ),
    ['xceod']: new Character(
        {
            str: 99,
            int: 99,
            luck: 99,
            unluck: 0,
            stm: 99,
            agi: 99
        },
        [mediumBanHammer],
        10000,
        0
    )
};

interface DuelType {
    name: string;
    type: 'fun' | 'normal';
}

const duelQueue: Record<string, DuelType> = {};
const callQueue: Record<string, string> = {};

const acceptCommand = new Command(
    'accept',
    function(channel: string, cmd: string, client: any, context: any) {
        let { username = '' } = context;
        username = username.toLowerCase();
        const userNameForChat = parseNameForChat(username);

        if (!duelQueue[username]) {
            throw('NO_ACTIVE_DUEL_DUDE');
        }

        if (!characters[username]) {
             characters[username] = createCharacter();
        }

        const callUsername = duelQueue[username].name;
        const callUsernameForChat = parseNameForChat(callUsername);

        let message = `Бой между ${callUsernameForChat} и ${userNameForChat} за приседания. `;

        if (duelQueue[username].type === 'normal') {
            const ch1 = characters[username];
            const ch2 = characters[callUsername];
            let ch1WinPoints = 0;
            let ch2WinPoints = 0;
            const { SPD, DEF, DMG, LUCK, UNLUCK } = calculate(ch1, ch2);

            [SPD, DEF, DMG, LUCK].forEach((e) => {
                if (e > 0) {
                    ch1WinPoints++
                } else {
                    ch2WinPoints++;
                }
            });

            message += `Победил в бою ${ch1WinPoints > ch2WinPoints ? callUsername : callUsernameForChat}. `;

            const spec1 = ch1.getSpecialAttack();
            const spec2 = ch2.getSpecialAttack();

            doActionByMuteHammers(client, channel, ch1.getStats().unluck !== 0 ? callUsername : username, spec1);
            doActionByMuteHammers(client, channel, ch1.getStats().unluck !== 0 ? username : callUsername, spec2);

            if (UNLUCK > 0) {
                const unluckyUsers = [ch1, ch2].filter((ch) => {
                    return (10 + ch.getStats().luck) * Math.random() > 10;
                }).map((ch) => ch === ch1 ? username : callUsername);

                if (unluckyUsers.length) {
                    GameEvents.muteByUnluckEvent(unluckyUsers, UNLUCK, channel);
                    message += `Во время боя прокнул мут стульчик на ${unluckyUsers.join(', ')}. Показатель неудачи был ${UNLUCK}. `
                }
            }

            const [ch1Stat, ch1StatInc] = getRandomStatBuff(ch1.getStats().luck);
            const [ch2Stat, ch2StatInc] = getRandomStatBuff(ch2.getStats().luck);

            message += `${userNameForChat} прокачал ${ch1Stat} на ${ch1StatInc}. `;
            message += `${callUsernameForChat} прокачал ${ch2Stat} на ${ch2StatInc}. `;

            ch1.increaseStats(ch1Stat, ch1StatInc);
            ch2.increaseStats(ch2Stat, ch2StatInc);

            if (Math.floor(Math.random() * 10) > 5) {
                const weapon = weapons[Math.round(Math.random() * weapons.length)];
                const weaponDropLucker = Math.round(Math.random()) === 1 ? username : callUsername;

                if (weapon) {
                    message += `В бою было найдено оружие: ${weapon.getName()}. Досталось оно ${weaponDropLucker} `;

                    characters[weaponDropLucker].equipWeapon(weapon)
                }
            }
        } else {
            if (Math.round(Math.random()) === 1) {
                message += `После боя ${username} присаживается на стульчик отдохнуть`;
                GameEvents.muteByFun(username, channel);
            } else {
                message += `После боя ${callUsername} присаживается на стульчик отдохнуть`;
                GameEvents.muteByFun(callUsername, channel);
            }
        }


        duelQueue[username] = null;
        callQueue[callUsername] = null;

        client.action(channel, message);
    }
);

const callFightCommand = new Command(
    'call_fight',
    function(channel: string, cmd: string, client: any, context: any) {
        const userNameToFight = parseToFight(cmd);
        let { username } = context;
        username = username.toLowerCase();

        if (!userNameToFight) {
            throw ('NO_NAME_TO_FIGHT');
        }

        if (callQueue[username]) {
            throw ('ALREADY_CALL_APPONENT ' + callQueue[username])
        }

        if (duelQueue[userNameToFight]) {
            throw ('ALREADY_WAIT_FOR_DUEL ' + duelQueue[userNameToFight].name)
        }

        if (!characters[username]) {
            characters[username] = createCharacter();
        }

        duelQueue[userNameToFight] = { name: username, type: 'normal'};
        callQueue[username] = userNameToFight;

        client.action(channel, `${username} вызывает на бой ${userNameToFight}. Напишите !accept, чтобы принять бой или !decline, чтобы отклонить`);
    }
);

const callFightForMuteCommand = new Command(
    'call_fight_please',
    function(channel: string, cmd: string, client: any, context: any) {
        const userNameToFight = parseToFight(cmd);
        let { username } = context;
        username = username.toLowerCase();

        if (!userNameToFight) {
            throw ('NO_NAME_TO_FIGHT');
        }

        if (callQueue[username]) {
            throw ('ALREADY_CALL_APPONENT ' + callQueue[username])
        }

        if (duelQueue[userNameToFight]) {
            throw ('ALREADY_WAIT_FOR_DUEL ' + duelQueue[userNameToFight])
        }

        if (!characters[username]) {
            characters[username] = createCharacter();
        }

        duelQueue[userNameToFight] = { name: username, type: 'fun' };
        callQueue[username] = userNameToFight;

        client.action(channel, `${username} вызывает на бой ${userNameToFight} за стульчик. Напишите !accept, чтобы принять бой или !decline, чтобы отклонить`);
    }
);

const declineFightCommand = new Command(
    'decline',
    function(channel: string, cmd: string, client: any, context: any) {
        let { username } = context;
        username = username.toLowerCase();

        if (!username) {
            throw ('NO_NAME_TO_FIGHT');
        }

        if (!callQueue[username] && !duelQueue[username]) {
            throw ('NOTHING TO DECLINE');
        }

        const userCalled = Boolean(duelQueue[username]) ? duelQueue[username].name : callQueue[username];

        duelQueue[username] = null;
        callQueue[username] = null;
        duelQueue[userCalled] = null;
        callQueue[userCalled] = null;
    }
);

const infoCommand = new Command(
    'duel_info',
    function(channel: string, cmd: string, client: any, context: any) {
        let { username } = context;
        username = username.toLowerCase();
        const usernameForChat = parseNameForChat(username);

        if (!characters[username]) {
            characters[username] = createCharacter();
        }

        const character = characters[username];

        const status = character.getCharacterStatus();

        client.say(channel, `${usernameForChat} ${status}`);
    }
);

const debugCommand = new Command(
    'debug_info',
    function(channel: string, cmd: string, client: any, context: any) {
        console.log(characters, duelQueue, callQueue)
    },
    (context) => {
        if (!context || !context.badges) {
            return false;
        }
        const { moderator, admin } = context.badges;

        return moderator !== '1' || admin !== '1';
    }
)

export {
    acceptCommand,
    callFightCommand,
    infoCommand,
    debugCommand,
    declineFightCommand,
    callFightForMuteCommand
}
