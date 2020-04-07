import * as tmi from 'tmi.js';
import * as _ from 'lodash';
import { readFileSync } from 'fs';
import {
    acceptCommand,
    callFightCommand,
    callFightForMuteCommand,
    debugCommand,
    declineFightCommand,
    infoCommand
} from "./src/core/Commands";
import {Client} from "./src/core/Client";
import {GameEvents} from "./src/core/Event";

const TEN_SECONDS = 10000;
const THIRTY_SECONDS = 30000;
const ONE_MINUTE = 60000;
const EIGHT_HOURS = 28800000;

const chatCommands: string[][] = [];

function addInWhisperQueue(from: string, userstate:any, message: string, self: any) {
    chatCommands.push([from, userstate, message, self]);
}

// configs
const oauth = readFileSync('./oauth').toString();
// Define configuration options
const opts = {
    identity: {
        username: 'DuelFBot',
        password: oauth
    },
    channels: [
        'lordar2r'
    ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Connect to Twitch:
client.connect();

GameEvents.client = client;

acceptCommand.setClient(client);
callFightCommand.setClient(client);
infoCommand.setClient(client);
callFightForMuteCommand.setClient(client);

function onClientJoinHandler(channel, username, self) {};

let isActive = true;
// Called every time a message comes in
function onMessageHandler (channel: string, context: any, msg: string) {
    if (!isActive) {
        console.log('afk');
        return;
    }
    const cmdAccept = acceptCommand.getCommand();
    const cmdCallFight = callFightCommand.getCommand();
    const cmdInfo = infoCommand.getCommand();
    const cmdDebug = debugCommand.getCommand();
    const cmdDecline = declineFightCommand.getCommand();
    const cmdCallPleaseForFight = callFightForMuteCommand.getCommand();

    msg = msg.trim();

    if (!msg) {
        return;
    }

    const cmd = msg.split(' ')[0];

    switch (cmd) {
        case cmdAccept:
            acceptCommand.call(channel, msg, context);
            break;
        case cmdCallFight:
            callFightCommand.call(channel, msg, context);
            break;
        case cmdInfo:
            infoCommand.call(channel, msg, context);
            break;
        case cmdDebug:
            debugCommand.call(channel, msg, context);
            break;
        case cmdDecline:
            declineFightCommand.call(channel, msg, context);
            break;
        case cmdCallPleaseForFight:
            callFightForMuteCommand.call(channel, msg, context);
            break;
        default:
            console.log('no cmd');
    }

    isActive = false;
    reset();
}


function reset() {
    setTimeout(() => {
        isActive = true;
    }, 500)
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('join', _.debounce(
    onClientJoinHandler,
    TEN_SECONDS,
    { 'maxWait': THIRTY_SECONDS }
));
