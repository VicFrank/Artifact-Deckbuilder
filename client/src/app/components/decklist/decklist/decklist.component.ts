import { Component } from "@angular/core";
import { DecklistStoreService } from "../decklist-store.service";

@Component({
  selector: "app-decklist",
  templateUrl: "./decklist.component.html",
  styleUrls: ["./decklist.component.css"]
})
export class DecklistComponent {
  constructor(public decklistStore: DecklistStoreService) {}
}
