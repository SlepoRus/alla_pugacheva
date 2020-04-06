export type doFunc = (userName: string) => void;

class Command {
    public command: string;

    constructor(command: string, doFunc: doFunc) {
        this.command = command;
        this.do = doFunc;
    }

    public do(userName: string, cmd: string) {}

    public call(userName: string, cmd: string) {
        const { command } = this;

        try {
            this.do(userName);
        } catch(e) {
            console.log(`error while call ${command} on ${userName}`);
            console.log(e);
        }

        this.log(userName);
    }

    public log(userName: string) {
        console.warn(this.getLogPath(userName))
    }

    public getLogPath(userName: string) {
        const { command } = this;

        console.warn(__dirname);
    }
}

export {
    Command
}
