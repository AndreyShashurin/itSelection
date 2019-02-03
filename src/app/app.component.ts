import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ WebsocketService, MessageService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 	title = 'itSelection';
    private hotelResponce = [];
	private message = {
		action: 'login',
		data:{
			key: '123123', 
			wlcompany: 'CMPN00000053'
		},
		key: '4bd97223-9ad0-4261-821d-3e9ffc356e32',
		type: 'account'	
	};
	private hotel = {
		action: 'accommodation',
		data:{
			place:  {"in": "CI266088ZZ"}, 
			date: {"in": 1549756800000,"out": 1549929600000}, 
			families: [{"adults": 2}], 
			lastid: 0, 
			num: 5
		},
		key: '2ee1edbf-d90f-4785-b9db-5b07ce70a928',
		type: 'service'	
	};s

	constructor(
		private messageService: MessageService
	) {}

  	sendMsg() {
		this.messageService.messages.next(this.message);
		this.ngOnInit();
	}  

	ngOnInit() {
        this.messageService.messages.subscribe((data) => {
      		if(data.key == this.message.key && data['status'] == '200'){
      			this.messageService.hotels.next(this.hotel);
				this.messageService.hotels.subscribe(msg => {	
				if(msg.data.done != true){
  					this.done(msg.data.total);
				}else{	
					this.hotelResponce = msg.data.search;
				}
				});
      		}
        });	
	}

	done(total){
		this.hotel.data.num = total;
		console.log(this.hotel);
      	this.messageService.hotels.next(this.hotel);
		this.messageService.hotels.subscribe(msg => {	
			this.hotelResponce = msg.data.search;
		});	
	}

	getStars(rating){
		if(rating === 0){
	    	var val = 3;
		} else if(rating === 1){
	    	var val = 4;
		} else if(rating === 2){
	    	var val = 5;
		}
	    let size = val/5*100;
	    return size + '%';
	}
}