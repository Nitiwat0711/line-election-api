import { Vote } from "../database/entity/Vote";
import { VoteModel } from "../database/model/vote";

export namespace VoteService {
  export const getUserIsVoted = async (
    nationalId: string
  ): Promise<boolean | null> => {
    try {
      const voted = await Vote.findOne({
        where: {
          nationalId,
          disabled: false,
        },
      });

      if (voted) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const create = async (
    nationalId: string,
    candidateId: number
  ): Promise<VoteModel.T | null> => {
    try {
      const vote = Vote.create({
        nationalId,
        candidateId,
      });

      const newVote = await vote.save();
      return newVote;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getVoteCount = async (): Promise<number> => {
    try {
      const voteCount = await Vote.count();
      return voteCount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  export const getExportValue = async (): Promise<
    VoteModel.returnExportValue[]
  > => {
    try {
      const votes = await Vote.find({
        where: {
          disabled: false,
        },
      });

      const exportValue = votes.map((vote, index) => {
        return {
          candidateId: vote.candidateId,
          nationalId: vote.nationalId,
        };
      });

      return exportValue;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
