export function parseToFight(cmd: string): string {
    return (cmd.split(' ')[1] || '').toLowerCase();
}

export function parseNameForChat(msg: string) {
    return `@${msg}`
}

export function parseNameForCode(msg: string) {
    return msg.replace('#',"")

}
