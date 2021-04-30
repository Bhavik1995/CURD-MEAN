import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudDataService } from './../../service/crud-data.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudDataService: CrudDataService) 
    { 

       this.studentForm = this.formBuilder.group({
         name: [''],
         age:[''],
         email:[''],
         gender:[''],
         phone:[''],
         std:[''],
         address:['']
       })
    }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudDataService.AddStudent(this.studentForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/student-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
