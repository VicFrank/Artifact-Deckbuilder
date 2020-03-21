import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { DecklistCard, Card, Colors, GetColor, CompareColors } from "../cards";

import { CardList } from "../../../assets/card-data";

@Injectable({
  providedIn: "root"
})
export class DecklistStoreService {
  // tslint:disable-next-line: variable-name
  private readonly _decklist = new BehaviorSubject<DecklistCard[]>([]);
  // tslint:disable-next-line: variable-name
  private readonly _heroes = new BehaviorSubject<Card[]>([]);

  readonly decklist$ = this._decklist.asObservable();
  readonly heroes$ = this._heroes.asObservable();

  get decklist(): DecklistCard[] {
    return this._decklist.getValue();
  }

  set decklist(val: DecklistCard[]) {
    console.log("Set Decklist");
    this._decklist.next(val);
  }

  get heroes(): Card[] {
    return this._heroes.getValue();
  }

  set heroes(val: Card[]) {
    this._heroes.next(val);
  }

  get manaCounts(): any[] {
    const manaCounts = [];
    for (let i = 1; i < 9; i++) {
      const manaCount = {};
      for (const color of Colors) {
        const count = this.decklist.reduce((total, deckItem) => {
          if (
            deckItem.card.mana_cost === i &&
            GetColor(deckItem.card) === color
          ) {
            return total + deckItem.amount;
          }
          return total;
        }, 0);
        manaCount[color] = count;
      }
      manaCounts.push(manaCount);
    }
    return manaCounts;
  }

  numSpells = 0;
  numImprovements = 0;
  numCreeps = 0;
  numCards = 0;
  numItems = 0;
  numWeapons = 0;
  numAccessory = 0;
  numArmor = 0;

  private updateDecklistStats() {
    this.numSpells = 0;
    this.numImprovements = 0;
    this.numCreeps = 0;
    this.numCards = 0;
    this.numItems = 0;
    this.numWeapons = 0;
    this.numAccessory = 0;
    this.numArmor = 0;

    for (const deckCard of this.decklist) {
      const { card, amount } = deckCard;
      console.log(card.card_name.english, amount);
      switch (card.card_type) {
        case "Spell":
          this.numSpells += amount;
          this.numCards += amount;
          break;
        case "Improvement":
          this.numImprovements += amount;
          this.numCards += amount;
          break;
        case "Creep":
          this.numCreeps += amount;
          this.numCards += amount;
          break;
        case "Item":
          this.numItems += amount;
          switch (card.sub_type) {
            case "Armor":
              this.numArmor += amount;
              break;
            case "Accessory":
              this.numAccessory += amount;
              break;
            case "Weapon":
              this.numWeapons += amount;
              break;
          }
          break;
      }
    }
  }

  addCard(card: Card) {
    console.log(`Adding card ${card.card_name.english}`);
    // Heroes aren't normal decklist cards
    if (card.card_type === "Hero") {
      this.addHero(card);
      return;
    }

    const existingCard = this.getCardByName(card);

    if (existingCard && existingCard.amount >= 3) {
      return;
    } else if (existingCard) {
      const index = this.decklist.indexOf(existingCard);
      existingCard.amount++;
      this.decklist[index] = existingCard;
    } else {
      this.decklist.push({ card, amount: 1 });
    }

    // Sort the deck
    this.decklist.sort((card1: DecklistCard, card2: DecklistCard) => {
      // sort by red/blue/black/green/item
      // same colors sort by cost
      const colorCompare = CompareColors(card1.card, card2.card);

      if (colorCompare === 0) {
        if (card1.card.mana_cost && card2.card.mana_cost) {
          return card1.card.mana_cost - card2.card.mana_cost;
        }
        if (card1.card.gold_cost && card2.card.gold_cost) {
          return card1.card.gold_cost - card2.card.gold_cost;
        }
      }
      return colorCompare;
    });

    this.updateDecklistStats();
  }

  removeCard(card: Card) {
    const existingCard = this.getCardByName(card);

    if (existingCard && existingCard.amount >= 2) {
      const index = this.decklist.indexOf(existingCard);
      existingCard.amount--;
      this.decklist[index] = existingCard;
    } else {
      this.decklist = this.decklist.filter(
        c => c.card.card_id !== card.card_id
      );
    }

    this.updateDecklistStats();
  }

  removeAllOfCard(card: Card) {
    this.decklist = this.decklist.filter(c => c.card.card_id !== card.card_id);
  }

  addHero(card: Card) {
    if (card.card_type !== "Hero") {
      return;
    }

    const heroAlreadyExists = this.heroes.find(c => c.card_id === card.card_id);
    if (heroAlreadyExists) {
      return;
    }

    if (this.heroes.length < 5) {
      this.heroes.push(card);

      // Add the three hero cards
      const heroCard = this.getHeroCard(card);
      for (let i = 0; i < 3; i++) {
        this.addCard(heroCard);
      }
    }
  }

  removeHero(card: Card) {
    this.heroes = this.heroes.filter(c => c.card_id !== card.card_id);

    // Remove the hero cards
    const heroCard = this.getHeroCard(card);
    for (let i = 0; i < 3; i++) {
      this.removeCard(heroCard);
    }
  }

  getCardByName(card: Card) {
    return this.decklist.find(c => c.card.card_id === card.card_id);
  }

  getHeroCard(card: Card) {
    if (card.card_type !== "Hero") {
      return;
    }

    const heroCardReference = card.references.find(
      r => r.ref_type === "includes"
    );
    const heroCardID = heroCardReference.card_id;

    return CardList.find(c => c.card_id === heroCardID);
  }
}
