import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DatePipe } from '@angular/common';
import { DiscussionMessage } from '../interfaces/DiscussionMessage';
import { AdoptionService } from '../../service/adoption.service';
import { AdoptService } from '../../service/adopt.service';
import { animal, city, species } from '../../adpotion-model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {

  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

  ngAfterViewInit() {
    this.scrollToTop();
  }

  scrollToTop() {
    this.scrollableDiv.nativeElement.scrollTop = 0;
  }

  stompClient!: Stomp.Client;
  displayAnimals!: animal;
  animalId!: number;

  messages: DiscussionMessage[] = [];
  message: string = '';
  myId = Number(localStorage.getItem('userId'));
  cityList!: city[];
  speciesList!: species[];

  constructor(
    private adoptionService: AdoptionService,
    private adoptService: AdoptService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.adoptService.showAllCity().subscribe((response) => {
      console.log(response);
      this.cityList = response.data;
    });
    this.adoptService.showAllSpecies().subscribe((response) => {
      this.speciesList = response.data;
    });

    this.route.queryParams.subscribe((param) => {
      this.animalId = +param['animalId'];
      console.log(this.animalId);
      this.adoptionService.onQueryAnimalById(this.animalId).subscribe((res) => {
        this.displayAnimals = res.response[0];
        console.log(res);
      });
    });
    this.initializeWebSocketConnection();
    this.adoptService
      .showDiscussionMessages(this.animalId)
      .subscribe((response) => {
        console.log(response);
        this.messages = response.response;
        console.log(this.messages);
      });
  }

  sendMessage() {
    if (this.displayAnimals.userId === Number(localStorage.getItem('userId'))) {
      this.dialog.open(DialogComponent, {
        //新增成功dialog
        data: { dialogMode: 'chatFailedDialog' },
      });
    } else {
      this.router.navigate(['/member/chatroom'], {
        queryParams: { otherId: this.displayAnimals.userId },
      });
    }
  }

  initializeWebSocketConnection() {
    (window as any).global = window;
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    console.log('到這一步');
    console.log(this.stompClient);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/discuss/' + this.animalId, (message) => {//subsribe to the public topic
        if (message.body) {
          this.messages.push(JSON.parse(message.body));
        }
      });
    });
  }

  onSubscription() {
    if (localStorage.getItem('userId')) {
      this.adoptionService.UserSubscription(Number(localStorage.getItem('userId')), this.animalId).subscribe((res) => {
        console.log(res)
        if (res.statusCode === '0000') {
          console.log("訂閱成功")
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'addSubscriptionSuccess' }
          })
        } else {
          console.log("訂閱失敗")
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'addSubscriptionFail' }
          })
        }
      })
    }

  }

  sendDiscussionMessage() {
    let currentDateTime = this.datepipe.transform(
      new Date(),
      'yyyy/MM/dd h:mm'
    );
    //檢查是否符合標注人的規則
    const regex = /B(\d+)(?:-(\d+))? /g;
    const text = this.message;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const number = parseInt(match[1]);
      //找最大replyNo
      if (number >= 1 && number <= this.messages.length) {
        let maxReplyNo = 0;
        this.messages.forEach((message) => {
          if (number == message.serialNo && message.replyNo > maxReplyNo) {
            maxReplyNo = message.replyNo;
          }
        });
        console.log(`Matched B${number}`);
        const discussionMessage = {
          name: localStorage.getItem('name'),
          userId: this.myId,
          animalId: this.animalId,
          content: this.message,
          serialNo: number,
          replyNo: maxReplyNo + 1,
          timestamp: currentDateTime,
          type: 'DISCUSS',
        };
        this.stompClient.send(
          '/app/discuss.send',
          {},
          JSON.stringify(discussionMessage)
        ); //tell message to the server

        this.message = '';
      }
    }

    //找最大serialNo
    let maxSerialNo = 0;
    this.messages.forEach((message) => {
      if (message.serialNo > maxSerialNo) {
        maxSerialNo = message.serialNo;
      }
    });

    if (this.message) {
      console.log('you have entered something');
      const discussionMessage = {
        name: localStorage.getItem('name'),
        userId: this.myId,
        animalId: this.animalId,
        content: this.message,
        serialNo: maxSerialNo + 1,
        replyNo: 0,
        timestamp: currentDateTime,

        type: 'DISCUSS',
      };
      this.stompClient.send(
        '/app/discuss.send',
        {},
        JSON.stringify(discussionMessage)
      ); //tell message to the server
      this.message = '';
    }
  }

  replyDiscussion(serialNo: number) {
    this.message = 'B' + serialNo.toString() + ' ';
  }

  replyReply(serialNo: number, replyNo: number) {
    this.message = 'B' + serialNo.toString() + '-' + replyNo.toString() + ' ';
  }

}
