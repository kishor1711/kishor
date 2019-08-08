import { Injectable } from '@angular/core';
import { Article } from './article';
import { BehaviorSubject } from 'rxjs';

 

@Injectable({
   providedIn: 'root'
})
export class ArticleService {

   list: Article[] = [
      { id: 1, title: 'Angular 2 Tutorial', category: 'Angular', writer: 'Krishna', action: 'Save' },
      { id: 2, title: 'Angular 6 Tutorial', category: 'Angular', writer: 'Mahesh', action: 'Update' },
      { id: 3, title: 'Spring MVC tutorial', category: 'Spring', writer: 'Aman', action: 'Save' },
      { id: 4, title: 'Spring Boot tutorial', category: 'Spring', writer: 'Suraj', action: 'Update' },
      { id: 5, title: 'FreeMarker Tutorial', category: 'FreeMarker', writer: 'Krishna', action: 'Save' },
      { id: 6, title: 'Thymeleaf Tutorial', category: 'Thymeleaf', writer: 'Mahesh', action: 'Save' },
      { id: 7, title: 'Java 8 Tutorial', category: 'Java', writer: 'Aman', action: 'Update' },
      { id: 8, title: 'Java 9 Tutorial', category: 'Java', writer: 'Suraj', action: 'Save' },
      { id: 1, title: 'Angular 2 Tutorial', category: 'Angular', writer: 'Krishna', action: 'Save' },
      { id: 2, title: 'Angular 6 Tutorial', category: 'Angular', writer: 'Mahesh', action: 'Update' },
      { id: 3, title: 'Spring MVC tutorial', category: 'Spring', writer: 'Aman', action: 'Save' },
      { id: 4, title: 'Spring Boot tutorial', category: 'Spring', writer: 'Suraj', action: 'Save' },
      { id: 5, title: 'FreeMarker Tutorial', category: 'FreeMarker', writer: 'Krishna', action: 'Update' },
      { id: 6, title: 'Thymeleaf Tutorial', category: 'Thymeleaf', writer: 'Mahesh', action: 'Save' },
      { id: 7, title: 'Java 8 Tutorial', category: 'Java', writer: 'Aman', action: 'Save' },
      { id: 8, title: 'Java 9 Tutorial', category: 'Java', writer: 'Suraj', action: 'Update' }
   ];
   
   list$: BehaviorSubject < Article[] > = new BehaviorSubject(this.list);
   getAllArticles() {
      return this.list;
   }

   update(index, field, value) {
      this.list = this.list.map((e, i) => {
         if (index === i) {
            return {
               ...e,
               [field]: value
            }
         }
         return e;
      });
      this.list$.next(this.list);
   }

   getControl(index, fieldName) {
   }
} 