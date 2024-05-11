import { Message, WebhookData, Snowflake } from "./util.js";
export class Webhook {
    constructor(url) {
        this.webhook = {
            webhookUrl: "",
            instanceObject: {},
            url() {
                return this.webhookUrl;
            },
            get name() {
                let webhookName = WebhookData.get(this.webhookUrl, "name");
                return webhookName.then((val) => val);
            },
            get id() {
                let id = WebhookData.get(this.webhookUrl, "id");
                return id.then((val) => val);
            },
            get channelID() {
                let channelID = WebhookData.get(this.webhookUrl, "channel_id");
                return channelID.then((val) => val);
            },
            get guildID() {
                let guildID = WebhookData.get(this.webhookUrl, "guild_id");
                return guildID.then((val) => val);
            },
            get token() {
                let token = WebhookData.get(this.webhookUrl, "token");
                return token.then((val) => val);
            },
            get avatar() {
                let webhookAvatar = WebhookData.get(this.webhookUrl, "avatar");
                return webhookAvatar.then((val) => val);
            },
            get applicationID() {
                let applicationID = WebhookData.get(this.webhookUrl, "application_id");
                return applicationID.then((val) => val);
            },
            get type() {
                let type = WebhookData.get(this.webhookUrl, "type");
                return type.then((val) => val);
            },
            get snowflake() {
                return Snowflake.snowflake({ url: this.webhookUrl });
            },
            get createdAt() {
                return Snowflake.getDate(this.snowflake);
            },
            async changeName(newName) {
                WebhookData.setName(this.webhookUrl, newName);
            },
            async changeAvatar(avatarUrl) {
                WebhookData.setAvatar(this.webhookUrl, avatarUrl);
            },
            sendMessage(data) {
                let send = Message.send(this.webhookUrl, data);
                let messageObj = send.then((val) => {
                    return val;
                });
                return messageObj;
            },
            editMessage(data) {
                Message.edit(this.webhookUrl, data);
            },
            deleteMessage(messageId) {
                Message.delete(this.webhookUrl, `${messageId}`);
            },
        };
        let pattern = /(https?:\/\/)?discord.com\/api\/webhooks\//i;
        if (!pattern.test(`${url}`)) {
            throw new Error("Invalid Webhook URL");
        }
        else {
            this._url = `${url}`;
            Object.defineProperty(this.webhook, "webhookUrl", {
                value: `${url}`,
                configurable: false,
                writable: false,
            });
        }
    }
}
