export default class ParticipantFairness {
  static calculateFairness (participant, meanParticipantTotalCount, meanParticipantReviewerCount) {
    return {
      totalCountHigherThanAvg: participant.getTotalCount() > meanParticipantTotalCount,
      totalCountLowerThanAvg: participant.getTotalCount() < meanParticipantTotalCount,
      reviewerCountHigherThanAvg: participant.getReviewerCount() > meanParticipantReviewerCount,
      onlyOneRole: participant.getReviewerCount() === participant.getTotalCount() ||
                   participant.getAuthorCount() === participant.getTotalCount() ||
                   participant.getNotaryCount() === participant.getTotalCount() ||
                   participant.getModeratorCount() === participant.getTotalCount() ||
                   participant.getReviewerCount() === participant.getTotalCount()
    };
  }

  static getNumericalFairnessForSorting (participant) {
    const fairnessObject = participant.getFairness();
    if (!fairnessObject) {
      return 0;
    }

    let fairnessNumber = 0;

    if (fairnessObject.totalCountHigherThanAvg) {
      fairnessNumber--;
    }

    if (fairnessObject.totalCountLowerThanAvg) {
      fairnessNumber--;
    }

    if (fairnessObject.reviewerCountHigherThanAvg) {
      fairnessNumber--;
    }

    if (fairnessObject.onlyOneRole) {
      fairnessNumber--;
    }

    return fairnessNumber;
  }

  static sortParticipantsByFairness (participants) {
    return participants.sort((a, b) =>
      ParticipantFairness.getNumericalFairnessForSorting(a) - ParticipantFairness.getNumericalFairnessForSorting(b)
    );
  }
}
