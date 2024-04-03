import { TestBed } from '@angular/core/testing';
import { GameService, Player } from './game.service';

export const gameServiceMock = jasmine.createSpyObj('GameService', [
  'newGame',
  'handleMove',
  'checkWinner',
  'restart',
]);

gameServiceMock.cells = new Array(9).fill(Player.Void);
gameServiceMock.currentPlayerTurn = Player.X;
gameServiceMock.isGameOver = false;
gameServiceMock.winner = null;

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.cells.length).toBe(0);
    expect(service.currentPlayerTurn).toBe(Player.X);
    expect(service.isGameOver).toBe(false);
    expect(service.winner).toBe(null);
  });

  it('should start a new game', () => {
    service.newGame();
    expect(service.cells.length).toBe(9);
    expect(service.cells.every((cell) => cell === Player.Void)).toBe(true);
    expect(service.currentPlayerTurn).toBe(Player.X);
    expect(service.isGameOver).toBe(false);
    expect(service.winner).toBe(null);
  });

  it('should handle player move', () => {
    service.newGame();
    service.handleMove(0);
    expect(service.cells[0]).toBe(Player.X);
    expect(service.currentPlayerTurn).toBe(Player.O);
    expect(service.cells[1]).toBe(Player.Void);
    expect(service.isGameOver).toBe(false);
    expect(service.winner).toBe(null);
  });

  it('should check for a winner', () => {
    service.newGame();
    // Simulate a winning condition for Player X
    service.cells = [
      Player.X,
      Player.X,
      Player.X,
      Player.Void,
      Player.Void,
      Player.Void,
      Player.Void,
      Player.Void,
      Player.Void,
    ];
    service.checkWinner();
    expect(service.isGameOver).toBe(true);
    expect(service.winner).toBe(Player.X);

    service.restart();
    expect(service.cells.every((cell) => cell === Player.Void)).toBe(true);
    expect(service.currentPlayerTurn).toBe(Player.X);
    expect(service.winner).toBe(null);
    expect(service.isGameOver).toBe(false);

    // Simulate a tie condition
    service.cells = [
      Player.X,
      Player.O,
      Player.X,
      Player.O,
      Player.X,
      Player.O,
      Player.O,
      Player.X,
      Player.O,
    ];
    service.checkWinner();
    expect(service.isGameOver).toBe(true);
    expect(service.winner).toBe(Player.Tie);
  });

  it('should restart the game', () => {
    service.newGame();
    service.handleMove(0);
    service.restart();
    expect(service.cells.every((cell) => cell === Player.Void)).toBe(true);
    expect(service.currentPlayerTurn).toBe(Player.X);
    expect(service.winner).toBe(null);
    expect(service.isGameOver).toBe(false);
  });
});
