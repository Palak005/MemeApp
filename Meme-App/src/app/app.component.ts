import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';
import { seedData } from './core/storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Meme-App';
  ngOnInit(){
    seedData();
  }
}
