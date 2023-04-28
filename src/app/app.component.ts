import {Component, OnInit} from '@angular/core';
import {LanguageService} from '@services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'template';

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    this.setDefaultLanguage();
  }

  setLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  setDefaultLanguage() {
    this.languageService.setDefault().subscribe();
  }
}
