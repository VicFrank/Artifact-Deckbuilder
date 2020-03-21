import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { DecklistStoreService } from "../decklist/decklist-store.service";

import cardData from "../../../assets/card-data";
import { CardListStoreService } from "./card-list-store.service";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"]
})
export class CardListComponent {
  constructor(
    public decklistStore: DecklistStoreService,
    public cardListStore: CardListStoreService
  ) {}

  pageEvent: PageEvent;

  public changePage(event?: PageEvent) {
    this.cardListStore.setPageIndex(event.pageIndex);
  }
}
