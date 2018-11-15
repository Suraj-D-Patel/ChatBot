import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { ApiAiClient } from "api-ai-javascript";
// import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ChatService {
  readonly token = environment.API_KEY;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    console.log("msg = ", msg);
    const userMessage = new Message(msg, "user");
    this.update(userMessage);
    return this.client.textRequest(msg).then(data => {
      const speech = data.result.fulfillment.speech;
      const botMessage = new Message(speech, "bot");
    });
  }

  talk() {
    this.client.textRequest("Who are you!").then(data => {
      console.log("data = ", data);
    });
  }
}

export class Message {
  constructor(public content: string, public sentBy: string) {}
}
