import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { customValidators } from '../../shared/custom.validators';
import { EmployeeService } from '../employee.serive';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../ISkill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;
  pageTitle: string;
  fullNameLength = 0;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 charactors',
      'maxlength': 'Full Name must be less than 10 charactors'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be dell.com',
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.',
    },
    'emailGroup': {
      'emailMismatch': 'Email and confirmEmail do not match.',
    },
    'phone': {
      'required': 'Phone is required.',
    },
    // 'skillName': {
    //   'required': 'Skill Name is required.',
    // },
    // 'experienceInYear': {
    //   'required': 'Experience In Years is required.',
    // },
    // 'proficiency': {
    //   'required': 'Proficiency is required.',
    // }
  };

  formErrors = {
    // 'fullName': '',
    // 'email': '',
    // 'confirmEmail': '',
    // 'emailGroup': '',
    // 'phone': '',
    // 'skillName': '',
    // 'experienceInYear': '',
    // 'proficiency': '',
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {

    // method 1 : reactive form with form group and form control
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl,
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYear: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    // method 1 : reactive form with formbuilder
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, customValidators.emailDomain('dell.com')]],
        confirmEmail: ['', Validators.required],
      }, { validators: matchEmail }),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup(),
      ])
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    // //getting perticular value
    // this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
    //   //console.log(value);
    //   this.fullNameLength = value.length
    // });
    // // getting all form value 
    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   //console.log(JSON.stringify(value));
    // });

    // //getting value only nested form group
    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   //console.log(JSON.stringify(value));
    // });

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pageTitle = "Edit Employee"
        this.getEmployee(empId);
      } else {
        this.pageTitle = "Crete Employee"
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
      }
    })


  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(
      (employee: IEmployee) => {
        this.editEmployee(employee);
        this.employee = employee;
      },
      (err: any) => console.log(err)
    );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone,
    });

    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillsSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillsSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYear: s.experienceInYear,
        proficiency: s.proficiency
      }));
    });
    return formArray;
  }


  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYear: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  onContactPrefernceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    // console.log(phoneControl);
    // console.log(selectedValue);
    if (selectedValue === 'phone') {
      phoneControl.setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        // console.log("Messages",messages);
        // console.log("Abstract",abstractControl.errors);
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }


      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        //disable all form control
        //abstractControl.disable();

      } else {
        //console.log('key = ' + key + 'Value = ' + abstractControl.value);

        //disable all form control
        //abstractControl.disable();
        //abstractControl.markAsDirty();
        // this.formErrors[key] = '';
        // if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        //   const messages = this.validationMessages[key];
        //   // console.log("Messages",messages);
        //   // console.log("Abstract",abstractControl.errors);
        //   for (const errorKey in abstractControl.errors) {
        //     if (errorKey) {
        //       this.formErrors[key] += messages[errorKey] + ' ';
        //     }
        //   }
        // }
      }

      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  onLoadData(): void {
    // this.employeeForm.setValue({
    //   fullName: 'Kishor Akolkar',
    //   contactPreference: 'email',
    //   emailGroup: {
    //     email: 'kishorakolkar11@gmail.com',
    //     confirmEmail:'kishorakolkar11@gmail.com',
    //   },
    //   phone: '7218168005',
    //   skills: {
    //     skillName: 'JAVA',
    //     experienceInYear: 4.5,
    //     proficiency: 'beginner'
    //   }
    // });
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);

    // method 1 - using formArray
    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required),
      }),
      new FormArray([])
    ]);

    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);

    //formArray1.push(new FormControl('Mark',Validators.required));

    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);


    console.log(formArray1);
    console.log(formGroup);
    // method 2 - using form builder

    // console.log(formArray.length);

    // for (const control of formArray.controls) {
    //   if (control instanceof FormControl) {
    //     console.log('control is formcontrol');
    //   }

    //   if (control instanceof FormGroup) {
    //     console.log('control is formgroup');
    //   }

    //   if (control instanceof FormArray) {
    //     console.log('control is formarray');
    //   }
    // }
  }

  onSubmit(): void {
    this.mapFormValuesEmployeeModel();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err),
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err),
      );
    }
  }

  mapFormValuesEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }


}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}


