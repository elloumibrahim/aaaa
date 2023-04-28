import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {LanguageConstants, LanguagesListConstants} from "@constants/language.constants";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LanguageService {

  constructor(
    private translateService: TranslateService
  ) {
  }

  get(): string {
    const userLanguage: string = window.navigator.language.slice(0, 2);
    let language: string = localStorage.getItem(LanguageConstants.LANGUAGE);
    const isLanguage: boolean = this.getLanguages(userLanguage);
    if (isLanguage && language === null) {
      localStorage.setItem(LanguageConstants.LANGUAGE, userLanguage);
      return userLanguage;
    } else if (language && isLanguage) {
      return language;
    }
    language = LanguageConstants.EN;
    localStorage.setItem(LanguageConstants.LANGUAGE, language);
    return language;
  }

  getLanguages(language: string) {
    const languagesList = LanguagesListConstants.languages;
    return languagesList.some((item: string) => item === language);
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem(LanguageConstants.LANGUAGE, language);
  }

  setDefault(): Observable<string> {
    return of(this.get()).pipe(tap((data: string) => data && this.translateService.setDefaultLang(data)));
  }
}
