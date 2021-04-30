import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudDataService } from './../../service/crud-data.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private activatedRoute: ActivatedRoute, private crudDataService: CrudDataService) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudDataService.getAllStudentsData(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        age: res['age'],
        email: res['email'],
        gender: res['gender'],
        phone: res['phone'],
        std: res['std'],
        address: res['address'],
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      age: [''],
      email: [''],
      gender: [''],
      phone: [''],
      std: [''],
      address: [''],
    })
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudDataService.updateStudent(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/student-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
