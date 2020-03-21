import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Card, Colors, GetColor, CompareColors } from "../cards";

import { CardList, isHeroCard } from "../../../assets/card-data";

interface Filters {
  colors: Set<string>;
  manaCosts: Set<number>;
  cardTypes: Set<string>;
}

@Injectable({
  providedIn: "root"
})
export class CardListStoreService {
  // tslint:disable-next-line: variable-name
  private readonly _cardList = new BehaviorSubject<Card[]>(
    this.getMainDeckCards()
  );
  readonly cardList$ = this._cardList.asObservable();

  // tslint:disable-next-line: variable-name
  private readonly _filters = new BehaviorSubject<Filters>({
    colors: new Set(),
    manaCosts: new Set(),
    cardTypes: new Set()
  });
  readonly filters$ = this._filters.asObservable();

  private mainDeckCards = this.getMainDeckCards();

  pageSize = 10;
  length = this.cardList.length;
  startIndex = 0;
  endIndex = this.pageSize;

  get cardList(): Card[] {
    return this._cardList.getValue().slice(this.startIndex, this.endIndex);
  }

  set cardList(val: Card[]) {
    this.length = val.length;
    this._cardList.next(val);
  }

  get filters(): Filters {
    return this._filters.getValue();
  }

  set filters(val: Filters) {
    this._filters.next(val);
  }

  public setPageIndex(index) {
    this.startIndex = index * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  isItem(card: Card): boolean {
    return card.card_type === "Item";
  }

  compareItems(card1: Card, card2: Card): number {
    if (this.isItem(card1) && !this.isItem(card2)) {
      return 1;
    } else if (this.isItem(card1) && !this.isItem(card2)) {
      return -1;
    } else {
      return card1.gold_cost - card2.gold_cost;
    }
  }

  getMainDeckCards() {
    return CardList.filter((card: Card) => {
      return !(
        card.card_type === "Ability" ||
        card.card_type === "Passive Ability" ||
        isHeroCard(card)
      );
    }).sort((card1: Card, card2: Card) => {
      // sort by card type, color, then by mana cost
      if (this.isItem(card1) || this.isItem(card2)) {
        return this.compareItems(card1, card2);
      }
      if (!GetColor(card1)) {
        console.log(card1.card_name.english, card1.card_type);
        return 1;
      }
      const colorCompare = CompareColors(card1, card2);
      if (colorCompare === 0) {
        return card1.mana_cost - card2.mana_cost;
      }
      return colorCompare;
    });
  }

  addFilter(type: string, value: string | number) {
    this.filters[type].add(value);
    this.updateCardList();
  }

  removeFilter(type: string, value: string | number) {
    if (typeof value === "string") {
      value = value.toLowerCase();
    }
    this.filters[type].delete(value);
    this.updateCardList();
  }

  updateCardList() {
    this.cardList = this.getFilteredMainDeckCards();
  }

  getFilteredMainDeckCards() {
    return this.mainDeckCards.filter((card: Card) => {
      const { colors, manaCosts, cardTypes } = this.filters;

      let cardColor = GetColor(card);
      if (cardColor) {
        cardColor = cardColor.toLowerCase();
      }
      let cardType = card.card_type.toLowerCase();
      if (cardType === "item") {
        cardType = card.sub_type.toLowerCase();
      }

      if (colors.has(cardColor)) {
        return false;
      } else if (manaCosts.has(card.mana_cost)) {
        return false;
      } else if (cardTypes.has(cardType)) {
        return false;
      }
      return true;
    });
  }
}
