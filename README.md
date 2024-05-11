# discordWebhook.js ✨

>**What is discordWebhook.js?**
 - **It's an npm package that wraps the Discord Webhook API.**
> **Why use discordWebhook.js**
 - **Because it's simple and easy to deal with.**
> **Will it keep getting up to date?**
 - **Yes since this is the first version ever of it, also it definitely will be updated if there's some changes on the Discord API, I have so many ideas to enhance this project, but let's leave this to another time.**
## Example

    import { Webhook } from 'discordWebhook.js';
    const webhook = new Webhook(TOKEN);
    (async function(){
	    webhook.webhook.changeName("New Name")
    }().then(() => {
	    let message = webhook.webhook.sendMessage({ content:"Hello, world!" })
    // Changing message content after 3 seconds
	    message.then((val) => {
		    setTimeout(() => {
		    webhook.webhook.editMessage({
			    messageId: val.id,
			    content: "Edited Message",
			    embeds: [{	title: "This message has been edited" }]
		    })
		    }, 3000)
	    })
    })
    
**Read test/test.js to know more!💖**
