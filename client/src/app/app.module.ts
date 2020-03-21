import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./components/card/card.component";
import { CardListComponent } from "./components/card-list/card-list.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "./components/header/header.component";
import { DecklistComponent } from "./components/decklist/decklist/decklist.component";
import { DecklistRowComponent } from "./components/decklist/decklist-row/decklist-row.component";
import { DecklistHeroesComponent } from "./components/decklist/decklist-heroes/decklist-heroes.component";
import { DecklistStatsComponent } from "./components/decklist/decklist-stats/decklist-stats.component";
import { CardTypeIconComponent } from "./components/decklist/card-type-icon/card-type-icon.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DeckManaBarComponent } from "./components/decklist/deck-mana-bar/deck-mana-bar.component";
import { CardFiltersComponent } from "./components/card-list/card-filters/card-filters.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { FilterButtonComponent } from './components/card-list/card-filters/filter-button/filter-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    HeaderComponent,
    DecklistComponent,
    DecklistRowComponent,
    DecklistHeroesComponent,
    DecklistStatsComponent,
    CardTypeIconComponent,
    DeckManaBarComponent,
    CardFiltersComponent,
    FilterButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
