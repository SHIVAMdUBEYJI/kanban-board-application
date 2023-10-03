import {Message} from "./message.model";

export type Notification = {
	email?: string;
	messages?: Message[];
}
