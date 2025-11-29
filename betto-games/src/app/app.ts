import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/layout/footer/footer';
import { Navbar } from './core/layout/navbar/navbar';
import { ToastComponent } from './shared/toast.component/toast.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Navbar,
    Footer,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('betto-games');
}
