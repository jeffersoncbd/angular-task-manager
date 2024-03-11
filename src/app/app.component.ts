import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GithubIconComponent } from './github-icon/github-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, GithubIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
