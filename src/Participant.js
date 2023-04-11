class Participant {
    firstName;
    lastName;
    //role = "";
    group;
    email;
    
    reviewerCount = 0;
    authorCount = 0; //kann man auch weg lassen, ist entweder 0 oder 1
    notaryCount=0;
    moderatorCount=0;
    
    activeInSlots = [];

    constructor(firstName, lastName, email, group) {
        this.firstName = firstName
        this.lastName = lastName
        this.email=email
        this.group = group
    }

    isActiveInSlot(slot) {
        for(let activeInSlot of this.activeInSlots) {
            if(slot.date == activeInSlot.date 
                && slot.endTime == activeInSlot.endTime 
                && slot.startTime == activeInSlot.startTime )     
            return true;
        }
        return false;
    }
}