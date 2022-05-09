import { CandidateService } from "./candidate";
import { VoteService } from "./vote";
import { calculatePercentage } from "../utils/calculate";
import { CandidateModel } from "../database/model/candidate";
export namespace ElectionService {
  export const getElectionResult = async (): Promise<
    CandidateModel.electionResultValue[] | null
  > => {
    try {
      const allVoteCount = await VoteService.getVoteCount();
      const candidates = await CandidateService.get();

      const electionResult =
        candidates?.map((candidate, index) => {
          return {
            ...candidate,
            percentage: `${calculatePercentage(
              candidate.votedCount || 0,
              allVoteCount
            )}%`,
          };
        }) || null;

      return electionResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
