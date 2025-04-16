import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practice-firestore-crud';

  // Injecting UserService from user.service.ts
  userService = inject(UserService);

  // This is the user object that will be used in the form
  user = {
    id: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  // This is the id of the user that will be edited
  editUserId!: string | null;

  // This is the array of users that will be displayed in the template
  users: User[] = []


  // This is the hook method that will be called when the component is initialized
  ngOnInit(){
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  showContactList = true; // default to showing contact list

  // Call this to show the form
  switchToAddMode() {
  this.resetForm(); // optional: reset form
  this.showContactList = false;
}

  // Call this to go back to contact list
  switchToListMode() {
  this.resetForm(); // optional: cancel editing too
  this.showContactList = true;
}

  addUser() {
  if (!this.user.firstName.trim() || !this.user.lastName.trim()) {
    alert('First and Last name are required to add a contact.');
    return;
  }

  this.userService.addUser(this.user);
  this.resetForm(); // optional: reset after adding
  this.showContactList = true; // return to contact list
}


 // Called when Edit button is clicked
 setEditUser(editUser: User) {
  this.editUserId = editUser.id ?? null;
  this.user = { ...editUser };
  this.showContactList = false; // switch to edit form
}

// Called when "Update User" button is clicked
updateUser(user: User) {
  this.userService.updateUser(user);
  this.editUserId = null;
  this.resetForm();
  this.showContactList = true; // back to contact list
}

  // This method will be called when the user clicks on the delete button
  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }

  // This method will be called when the user clicks on the reset button
  resetForm() {
    this.user = {
      id: '',
      firstName: '',
      lastName: '',
      phone: ''
    };
    this.editUserId = null;
  }
}