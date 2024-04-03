import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { GameComponent } from './game.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, ButtonModule],
  exports: [GameComponent],
  providers: [GameService],
})
export class GameModule {}
