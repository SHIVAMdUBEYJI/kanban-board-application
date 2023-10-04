import {Message} from "./message.model";

export interface Notification {
	email?: string;
	messages?: Message[];
}
