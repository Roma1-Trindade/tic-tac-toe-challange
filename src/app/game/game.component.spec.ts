import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { GameService, Player } from './services/game.service';
import { ButtonModule } from 'primeng/button';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [ButtonModule],
      providers: [GameService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize game on ngOnInit', () => {
    spyOn(gameService, 'newGame');
    component.ngOnInit();
    expect(gameService.newGame).toHaveBeenCalled();
  });

  it('should have a getter for winner', () => {
    expect(component.winner).toBeNull();
    gameService.winner = Player.X;
    expect(component.winner).toBe(Player.X);
  });
});
