class Command {
    public command: string;

    constructor(command: string) {
        this.command = command;
    }

    public do(userName: string) {}

    public call(userName: string) {
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
