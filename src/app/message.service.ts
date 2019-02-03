import { Injectable, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const URL = 'wss://api.night2stay.com/api/v2/websocket';

export interface Message {
	action: string,
	key: string,
	type: string
}
export interface Hotel {
	action: string,
	key: string,
	data: any,
	type: string
}

@Injectable()
export class MessageService{
	public messages: Subject<Message>;
	public hotels: Subject<Hotel>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(URL)
			.map((response: MessageEvent): Message => {
				let user = JSON.parse(response.data);
				return user;
			});
		this.hotels = <Subject<Hotel>>wsService
			.connect(URL)
			.map((response: MessageEvent): Hotel => {
				let result = JSON.parse(response.data);
				return result;
			});
	}
}