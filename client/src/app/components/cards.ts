export interface Card {
  card_id: number;
  base_card_id: number;
  card_type: CardType;
  card_name: { english: string };
  card_text: { english: string };
  mini_image: { default: string };
  large_image: { default: string };
  ingame_image: {};
  illustrator: string;
  rarity: CardRarity | null;
  sub_type: CardSubType;
  is_green: boolean;
  is_blue: boolean;
  is_black: boolean;
  is_red: boolean;
  mana_cost: number;
  item_def: number;
  attack: number;
  hit_points: number;
  gold_cost: number | null;
  references: [
    { card_id: number; ref_type: CardRefType; count: number | null }
  ];
}

export type CardSubType =
  | "Consumable"
  | "Deed"
  | "Accessory"
  | "Armor"
  | "Weapon";

export type CardType =
  | "Spell"
  | "Item"
  | "Ability"
  | "Improvement"
  | "Creep"
  | "Passive Ability"
  | "Hero";

export type CardRefType =
  | "active_ability"
  | "references"
  | "includes"
  | "passive_ability";

export type CardRarity = "Rare" | "Common" | "Uncommon";

export interface DecklistCard {
  card: Card;
  amount: number;
}

export const Colors = ["Red", "Black", "Blue", "Green"];

export const GetColor = (card: Card): string | null => {
  if (card.is_black) {
    return "Black";
  } else if (card.is_blue) {
    return "Blue";
  } else if (card.is_green) {
    return "Green";
  } else if (card.is_red) {
    return "Red";
  }

  return null;
};

const getColorNumber = (card: Card): number => {
  // sort by red/blue/black/green/item

  if (card.is_black) {
    return 3;
  } else if (card.is_blue) {
    return 2;
  } else if (card.is_green) {
    return 4;
  } else if (card.is_red) {
    return 1;
  } else {
    return 5;
  }
};

export const CompareColors = (card1: Card, card2: Card): number => {
  return getColorNumber(card1) - getColorNumber(card2);
};
