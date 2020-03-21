import { Component, Input } from "@angular/core";
import { CardListStoreService } from "../../card-list-store.service";

@Component({
  selector: "app-filter-button",
  templateUrl: "./filter-button.component.html",
  styleUrls: ["./filter-button.component.css"]
})
export class FilterButtonComponent {
  @Input() type: string;
  @Input() value: string;
  @Input() isItem: boolean;
  selected = true;

  constructor(public cardListStore: CardListStoreService) {}

  toggleFilter() {
    this.selected = !this.selected;

    console.log(this.type, this.value);

    if (!this.selected) {
      this.cardListStore.addFilter(this.type, this.value);
    } else {
      this.cardListStore.removeFilter(this.type, this.value);
    }
  }
}
