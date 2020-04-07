export type doFunc = (userName: string, cmd: string, client: any, context: any) => void;

class Command {
    private command: string;
    private client: any;

    constructor(command: string, doFunc: doFunc, rules?: (context: any) => boolean) {
        this.command = '!' + command;
        this.do = doFunc;

        if (rules) {
            this.rules = rules;
        }
    }

    private rules(context: any) {
        return true;
    };

    public do(userName: string, cmd: string, client: any, context: any) {}

    public call(userName: string, cmd: string, context: any) {
        const { command } = this;

        if (this.rules(context)) {
            try {
                this.do(userName, cmd, this.client, context);
            } catch(e) {
                console.log(`error while call ${command} on ${userName}`);
                console.log(e);
            }
        }

        this.log(userName);
    }

    public log(userName: string) {
        console.warn(this.getLogPath(userName))
    }

    public getLogPath(userName: string) {}

    public getCommand() {
        return this.command;
    }

    public setClient(client: any) {
        this.client = client;
    }
}

export {
    Command
}
