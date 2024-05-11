import fs from "fs";
import axios from "axios";
export class Snowflake {
    //   private _snowflakeID: number | undefined;
    //   snowflakeID: number;
    static snowflake(snowflake) {
        let pattern = /(?<=\/)\d{19}(?=\/)/;
        return Number(snowflake.url?.match(pattern));
    }
    static getDate(snowflake) {
        let timestamp = Number((BigInt(snowflake) >> BigInt(22)) + 1420070400000n);
        let date = new Date(timestamp);
        let dateObj = {
            fullDate: date,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            ms: date.getMilliseconds(),
        };
        return dateObj;
    }
}
export class Message {
    static async send(url, data) {
        let urlWithQuery = `${url}?wait=true`;
        let postMessage = await axios.post(urlWithQuery, {
            content: data.content,
            username: data.username,
            avatar_url: data.avatar_url,
            tts: data.tts,
            embeds: data.embeds,
        });
        let waitObject = await postMessage.data;
        return waitObject;
    }
    static async edit(url, data) {
        try {
            let theUrl = `${url}/messages/${data.messageId}`;
            if (data.content === undefined && data.embeds === undefined) {
                throw new Error("Please enter a value to edit the message (content or an array of embeds).");
            }
            axios.patch(theUrl, {
                content: data.content,
                embeds: data.embeds,
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }
    static async delete(url, messageId) {
        try {
            if (typeof messageId !== "string" || messageId === " ") {
                throw new Error("Please enter a valid message id.");
            }
            let theUrl = `${url}/messages/${messageId}`;
            axios.delete(theUrl);
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
export class WebhookData {
    static async get(url, param) {
        let fetchData = await axios.get(url);
        let data = await fetchData.data;
        return data[param];
    }
    static async setName(url, value) {
        axios.patch(url, {
            name: `${value}`,
        });
    }
    static async setAvatar(url, value) {
        axios.patch(url, {
            avatar: `${value}`,
        });
    }
}
export function imageB64(url) {
    let bitmap = fs.readFileSync(url);
    return new Buffer(bitmap).toString("base64");
}
