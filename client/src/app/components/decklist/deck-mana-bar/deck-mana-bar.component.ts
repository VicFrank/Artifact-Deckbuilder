import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-deck-mana-bar",
  templateUrl: "./deck-mana-bar.component.html",
  styleUrls: ["./deck-mana-bar.component.css"]
})
export class DeckManaBarComponent implements OnInit {
  @Input() mana: number;
  @Input() manaCount: {
    Red: number;
    Blue: number;
    Black: number;
    Green: number;
  };

  redPercent = 0;
  greenPercent = 0;
  bluePercent = 0;
  blackPercent = 0;

  ngOnInit(): void {
    const values = Object.values(this.manaCount);
    const sum = (a: number, b: number): number => a + b;
    const totalCount = values.reduce(sum);

    this.redPercent = (100 * this.manaCount.Red) / totalCount;
    this.greenPercent = (100 * this.manaCount.Green) / totalCount;
    this.bluePercent = (100 * this.manaCount.Blue) / totalCount;
    this.blackPercent = (100 * this.manaCount.Black) / totalCount;
  }
}
