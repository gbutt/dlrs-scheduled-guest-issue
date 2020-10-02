import { LightningElement } from 'lwc';
import insertContact from '@salesforce/apex/DlrsTestController.insertContact';

export default class DlrsTestLwc extends LightningElement {
    message;

    handleFormSubmit(event) {
        event.preventDefault();

        this.message = '';

        const formEl = event.target;
        let userData = {};
        new FormData(formEl).forEach((value, key) => {
            userData[key] = value;
        });

        insertContact(userData).then(result => {
            console.log(result);
            this.message = 'Contact created';
            
        }).catch(err => {
            console.error(err);
            const realError = err.body.pageErrors[0];
            this.message = realError.message;
        });
    }
}