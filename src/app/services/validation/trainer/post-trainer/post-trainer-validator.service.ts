import { Injectable } from '@angular/core';
import { PostTrainerDTO } from '../../../../models/trainer/PostTrainer';
import { ToastService } from '../../../toast/toast.service';
import { TrainerValidation } from '../../../../models/validation/trainervalidation';

@Injectable({
  providedIn: 'root'
})
export class PostTrainerValidatorService {

  constructor(
    private toast: ToastService
  ) { }

  validate(data: PostTrainerDTO): TrainerValidation{
    let validationObject: TrainerValidation = {
      valid:true,
      idError: '',
      subjectIdError:'',
      firstNameError:'',
      lastNameError:'',
      emailError:'',
      phoneError:'',
      qualificationsError:'',
      passwordError:'',
      usernameError:''
    }
    if(!data){
      console.error("Trainer can't be empty");
      validationObject.valid=false;
      return validationObject;
    }
    let result: boolean = true;
    if(!data.email){
      result = false;
      console.error("Trainer müssen eine E-Mail haben");
      validationObject.emailError="Trainer müssen eine E-Mail haben";

    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      validationObject.firstNameError="Vorname darf nicht leer sein";

    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");
      validationObject.lastNameError="Nachname darf nicht leer sein";

    }
    let regex=new RegExp(/^\d+$/)
    if(data.phone&&!regex.test(data.phone)){
      result=false;
      console.error("Phonenumber can only contain numbers");
      validationObject.phoneError="Telefonnummer kann nur aus Zeichen bestehen"
    }
    if(!data.username){
      result= false;
      console.error("Username can't be empty");
      validationObject.usernameError="Benutzername darf nicht leer sein";
    }
    if(!data.password){
      result=false,
      console.error("Password can't be empty");
      validationObject.passwordError="Passwort darf nicht leer sein"
    }
    validationObject.valid=result;
    return validationObject;
  }
}
