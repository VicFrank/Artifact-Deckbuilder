import { Component } from "@angular/core";
import { DecklistStoreService } from "../decklist-store.service";

@Component({
  selector: "app-decklist-stats",
  templateUrl: "./decklist-stats.component.html",
  styleUrls: ["./decklist-stats.component.css"]
})
export class DecklistStatsComponent {
  constructor(public decklistStore: DecklistStoreService) {}
}
