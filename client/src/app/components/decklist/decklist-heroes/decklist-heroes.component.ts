import { Component } from "@angular/core";
import { DecklistStoreService } from "../decklist-store.service";

@Component({
  selector: "app-decklist-heroes",
  templateUrl: "./decklist-heroes.component.html",
  styleUrls: ["./decklist-heroes.component.css"]
})
export class DecklistHeroesComponent {
  constructor(public decklistStore: DecklistStoreService) {}
}
