import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Card } from "../cards";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent {
  @Input() card: any;
  @Output() add = new EventEmitter<Card>();
}
