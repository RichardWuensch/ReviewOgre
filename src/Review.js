class Review {
    groupName = ""

    author = {}
    moderator = {}
    notary = {}
    reviewers = []

    possibleParticipants = []

    constructor(author) {
        this.author = author
        this.groupName = author.group
    }
}