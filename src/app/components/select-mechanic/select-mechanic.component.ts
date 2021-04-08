import { Appointment } from './../../models/appointment';
import { UsersService } from './../../services/users.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AppointmentServiceService } from 'src/app/services/appointment-service.service';

@Component({
  selector: 'app-select-mechanic',
  templateUrl: './select-mechanic.component.html',
  styleUrls: ['./select-mechanic.component.scss']
})
export class SelectMechanicComponent implements OnInit {

  authForm!: FormGroup;
  selectedValue!: string;
  mechanics: Array<User> = [];
  user!: User;
  @Input() app!: Appointment;
  @Output() submited = new EventEmitter();

  constructor(
    private appointService: AppointmentServiceService,
    private userService: UsersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.getMechanicUserr().then( doc => [
      this.mechanics = doc
    ])
  }

  createForm(): void {
    this.authForm = this.fb.group({
      selectedMechanic: this.user,
    });

  }

  onSubmit(){
    const formValues = {
      selectedMechanic: this.authForm.get('selectedMechanic'),
    };
    const data = {
      mechanicName: formValues.selectedMechanic?.value.name,
      mechanicId: formValues.selectedMechanic?.value.refId,
    }
    this.appointService.updateDoc(data, this.app.appId!);
    this.submited.emit(true);
  }
}
