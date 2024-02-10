import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [FormsModule],
  providers: [PersonService],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent implements OnInit, OnDestroy {
  persons = [];

  constructor(private personService: PersonService) {}

  onSubmit(form: NgForm) {
    this.personService.createPerson(form.value.fullName);
    console.log(form.value);
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
