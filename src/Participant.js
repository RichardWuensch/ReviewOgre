class Participant {
    name;
    reviewCount = 0;
    role = "";
    group;

    activeInSlots = []

    constructor(name, group) {
        this.name = name
        this.group = group
        
    }
}