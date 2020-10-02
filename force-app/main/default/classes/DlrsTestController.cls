public without sharing class DlrsTestController {
    
    @AuraEnabled
    public static Contact insertContact(String firstName, String lastName){
        // find or create account
        Account[] accts = [SELECT Id FROM Account ORDER BY Id LIMIT 1];
        if (accts.size() == 0) {
            Account acct = new Account(Name = 'DLRS Test');
            insert acct;
            accts.add(acct);
        }
        // create contact under account
        Contact cont = new Contact(FirstName = firstName, LastName = lastName, AccountId = accts[0].Id);
        insert cont;
        
        return cont;
    }
}
