import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  url = 'http://localhost:3000/';
  persons: any = [];
  updatedPersons = new Subject();

  constructor(private http: HttpClient) {}

  getPersons = () => {
    this.http.get(this.url).subscribe((data) => {
      this.persons = data;
      this.updatedPersons.next([...this.persons]);
    });
  };

  createPerson = (fullName: string) => {
    const person = { fullName: fullName };
    this.http.post(this.url, person).subscribe(() => {
      this.persons.push(person);
      this.updatedPersons.next([...this.persons]);
    });
  };

  getPersonListener = () => {
    return this.updatedPersons.asObservable();
  };
}
