import { Injectable } from '@angular/core';

export enum Player {
  Void = '',
  X = 'X',
  O = 'O',
  Tie = 'tie',
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public cells: Player[] = [];
  currentPlayerTurn: Player = Player.X;
  isGameOver: boolean = false;
  winner: Player | null = null;

  newGame() {
    this.cells = new Array(9).fill(Player.Void);
  }
  handleMove(index: number) {
    if (!this.cells[index] && !this.isGameOver) {
      this.cells[index] = this.currentPlayerTurn;
      this.checkWinner();
      this.currentPlayerTurn =
        this.currentPlayerTurn === Player.X ? Player.O : Player.X;
    }
  }
  checkWinner() {
    const winnerConditions: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winnerConditions) {
      if (
        this.cells[a] != Player.Void &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        this.winner = this.cells[a];
        this.isGameOver = true;
        return;
      }
    }
    if (!this.cells.some((player) => player === '') && !this.winner) {
      this.winner = Player.Tie;
      this.isGameOver = true;
    }
  }

  restart() {
    this.cells.fill(Player.Void);
    this.currentPlayerTurn = Player.X;
    this.winner = null;
    this.isGameOver = false;
  }
}
