import { Webhook } from "../dist/index.js";

const webhook = new Webhook(TOKEN)(
  // This is an asynchronous function that invokes itself, It's used to set defaults (change name, avatar)
  /* If you write the code below without this function the webhook may send the message without changing the username
  you can always see if there's an alternative way or syntax to write this of course.
*/

  async function () {
    webhook.webhook.changeName("New Name!");
    // ONLY USE IMAGE DATA (e.g. data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA)
    // webhook.webhook.changeAvatar(
    //   "data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA"
    // );
  }
)().then(() => {
  webhook.webhook.name.then((val) => {
    console.log(val);
  });
  // sendMessage() method returns a message object that contains its id
  let lastMessage = webhook.webhook.sendMessage({ content: "hello" });
  lastMessage.then((val) => {
    // editing the last message
    webhook.webhook.editMessage({
      messageId: val.id,
      content: "not hello actually lol",
    });
    // deleting the message after 3 seconds
    setTimeout(() => {
      webhook.webhook.deleteMessage(val.id);
    }, 3000);
  });
});

/* READ https://discord.com/developers/docs/resources/channel#embed-object FOR INFORMATION ABOUT THE EMBED OBJECTS */

/* GETTERS
  - webhook.name (promise)
  - webhook.id (promise)
  - webhook.createdAt
  - webhook.snowflake (returns id snowflake)
  - webhook.url 
  - webhook.avatar (promise)
  - webhook.applicationID (promise)
  - webhook.channelID (promise)
  - webhook.guildID (promise)
  - webhook.type (promise)
  - webhook.token (promise)
  Setters
  - webhook.changeName(name).then((..) => ...)
  - webhook.changeAvatar(avatar).then((..) => ...)
  Messages
  - webhook.sendMessage(
    {
      content: "message",
      username?: "HELLO MESSAGE IM USERNAME",
      avatar_url?: "https://.....".
      tts?: true/false, (TEXT TO SPEECH)
      embeds?: [{}] (array of embeds objects)
    }
  ).then((messageObj) => ....)
  - webhook.editMessage(
    {
        messageId: "2939038094801284,
        content: "new message content",
        embeds?: [{}] (array of embed objects)
    }
  )
  - webhook.deleteMessage(messageId)

  */
