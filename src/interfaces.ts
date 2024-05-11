export interface SnowflakeInterface {
  url?: string;
}

export interface MessageInterface {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: object[];
}

export interface EditMessageInterface {
  messageId: string;
  content?: string;
  embeds?: string;
}
