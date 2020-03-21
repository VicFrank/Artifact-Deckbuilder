import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-card-type-icon",
  templateUrl: "./card-type-icon.component.html",
  styleUrls: ["./card-type-icon.component.css"]
})
export class CardTypeIconComponent implements OnInit {
  @Input() cardType: string;

  link: string;

  ngOnInit(): void {
    this.link =
      "assets/images/card_types/card_type_" +
      this.cardType.toLowerCase() +
      ".png";
  }
}
