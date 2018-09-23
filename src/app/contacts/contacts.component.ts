import { Component, OnInit } from '@angular/core';
import { ContactsService } from "../contacts.service";
import { Contact } from "../contact";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: String;
  last_name: String;
  phone: String;
  constructor(private contactService:ContactsService) { }

  addContact(){
    let newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
        .subscribe(contact => {
          this.contacts.push(contact);
          this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts);
        });
  }

  deleteContact(id : any){
    let contacts = this.contacts;
    this.contactService.deleteContact(id)
        .subscribe( data=> {
          // if (data.n ==1)
          // {
          //   for(let i=0; i< contacts.length; i++)
          //   {
          //     if(this.contacts[i]._id == id)
          //     {
          //       contacts.splice(i,1);
          //     }
          //   }
          // }
          this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts);
        })
  }

  ngOnInit() {
    this.contactService.getContacts()
      .subscribe(contacts => 
        this.contacts = contacts);
    
  }

}
