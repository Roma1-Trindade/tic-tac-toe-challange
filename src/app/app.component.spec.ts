import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameModule } from './game/game.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, GameComponent],
      imports: [RouterTestingModule, GameModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'tic-tac-toe'`, () => {
    expect(component.title).toEqual('tic-tac-toe');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Tic - Tac - Toe'
    );
  });
  it('should render game component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-game')).toBeTruthy();
  });

  it('should render router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
