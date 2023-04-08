class Participant {
    firstName;
    lastName;
    reviewCount = 0;
    //role = "";
    group;
    email;

    activeInSlots = []

    constructor(firstName, lastName, email, group) {
        this.firstName = firstName
        this.lastName = lastName
        this.email=email
        this.group = group
    }
}