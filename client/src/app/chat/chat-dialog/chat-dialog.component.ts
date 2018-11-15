import { Component, OnInit } from "@angular/core";
import { ChatService, Message } from "../chat.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/scan";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "chat-dialog",
  templateUrl: "./chat-dialog.component.html",
  styleUrls: ["./chat-dialog.component.css"]
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  // formValue: string;
  chatbot_fg: FormGroup;


  constructor(private chatService: ChatService,
    private fb: FormBuilder) {
    this.chatbot_fg = fb.group({
      'formValue': [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
    this.messages = this.chatService.conversation.asObservable().scan((acc,val) => acc.concat(val));

    // this.chatService.talk();
  }

  sendMessage() {
    console.log('formvalue = ', this.chatbot_fg.controls.formValue.value);
    this.chatService.converse(this.chatbot_fg.controls.formValue.value).then(datra => {
      console.log('datra', datra)
    });
  }
}
