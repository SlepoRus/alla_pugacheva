import * as tmi from 'tmi';
import { readFileSync } from 'fs';
import axios from 'axios';
import * as _ from 'lodash';

const TEN_SECONDS = 10000;
const THIRTY_SECONDS = 30000;
const ONE_MINUTE = 60000;
const EIGHT_HOURS = 28800000;

// configs
const oauth = readFileSync('./oauth').toString();
const botConfig = {
    currentHelloUsers: [],
    ignoreUsers: ['moobot', 'nightbot', 'sleporus', 'anotherttvviewer'],
    botIsReady: false,
    botStopped: false
};

// reset hello users
setInterval(() => {
    console.log('user count = ' + botConfig.currentHelloUsers.length);
    botConfig.currentHelloUsers = [];
}, EIGHT_HOURS);

function getAllUsersInChat() {
    return botConfig.currentHelloUsers.concat(botConfig.ignoreUsers)
}

const urlUsersInChat = 'https://tmi.twitch.tv/group/user/lordar2r/chatters';

async function getCurrentChatterViewersInChat() {
    try {
        const { data } = await axios.get(urlUsersInChat);
        const { chatters: { viewers } } = data;

        return viewers;
    } catch(e) {
        console.log('got error while fetching users');
    }
}

async function updateUsersListByChattersViewers() {
    const users = await getCurrentChatterViewersInChat();
    const newUsers = users.map((el) => el.toLowerCase());
    const allUsersBotMeet = getAllUsersInChat();

    newUsers.forEach((el) => {
        if (!allUsersBotMeet.includes(el)) {
            botConfig.currentHelloUsers.push(el);
        }
    });

    console.log(`UPDATED CHATTERS LIST: ${JSON.stringify(getAllUsersInChat())}`)
}

// flag for hot wait

function warn() {
    console.log('start bot warn');
    setTimeout(() => {
        console.log('bot warn up');
        updateUsersListByChattersViewers();
        if (!botConfig.botStopped) {
            botConfig.botIsReady = true;
        }
    }, ONE_MINUTE)
}

// Define configuration options
const opts = {
    identity: {
        username: 'SlepoRus',
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

function onWhisperHandler(from: string, userstate:any, message: string, self: any) {
    message = message.trim();

    switch(message) {
        case '!create':

    }
}

function getHelloText(name) {
}

function onClientJoinHandler(channel, username, self) {
};

// Called every time a message comes in
function onMessageHandler (channel: string, context: any, msg: string) {
    msg = msg.trim();
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);

    warn();
}

// Register our event handlers (defined below)
client.on('whisper', onWhisperHandler);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('join', _.debounce(
    onClientJoinHandler,
    TEN_SECONDS,
    { 'maxWait': THIRTY_SECONDS }
));
