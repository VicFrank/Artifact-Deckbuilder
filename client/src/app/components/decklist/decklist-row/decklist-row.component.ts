import { Component, Input, Output, EventEmitter } from "@angular/core";

import { isHeroCard } from "../../../../assets/card-data";

@Component({
  selector: "app-decklist-row",
  templateUrl: "./decklist-row.component.html",
  styleUrls: ["./decklist-row.component.css"]
})
export class DecklistRowComponent {
  @Input() card: any;
  @Output() add = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  isHeroCard = isHeroCard;
}
