class Review {
    groupName = ""

    author = {}
    moderator = {}
    notary = {}
    reviewer = []

    constructor(author) {
        this.author = author
        this.groupName = author.group
    }
}