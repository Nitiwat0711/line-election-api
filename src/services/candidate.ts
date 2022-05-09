import { Candidate } from "../database/entity/Candidate";
import { CandidateModel } from "../database/model/candidate";
import { dataSource } from "../../data-source";
export namespace CandidateService {
  export const get = async (): Promise<CandidateModel.returnValue[] | null> => {
    try {
      const candidates = await Candidate.find({
        where: {
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          dob: true,
          bioLink: true,
          imageLink: true,
          policy: true,
          votedCount: true,
        },
        order: {
          id: "ASC",
        },
      });
      return candidates;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getById = async (
    id: number
  ): Promise<CandidateModel.returnValue | null> => {
    try {
      const candidates = await Candidate.findOneOrFail({
        where: {
          disabled: false,
          id,
        },
        select: {
          id: true,
          name: true,
          dob: true,
          bioLink: true,
          imageLink: true,
          policy: true,
          votedCount: true,
        },
      });
      return candidates;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const add = async (
    name: string,
    dob: string,
    bioLink: string,
    imageLink: string,
    policy: string
  ): Promise<CandidateModel.returnValue | null> => {
    try {
      const candidate = Candidate.create({
        name,
        dob: dob,
        bioLink,
        imageLink,
        policy,
      });

      const newCandidate: CandidateModel.returnValue = await candidate.save();
      return {
        id: newCandidate.id,
        name: newCandidate.name,
        dob: newCandidate.dob,
        bioLink: newCandidate.bioLink,
        imageLink: newCandidate.imageLink,
        policy: newCandidate.policy,
        votedCount: newCandidate.votedCount,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const edit = async (
    id: number,
    name: string,
    dob: string,
    bioLink: string,
    imageLink: string,
    policy: string
  ): Promise<CandidateModel.returnValue | null> => {
    try {
      const updatedCandidate = await Candidate.update(id, {
        name,
        dob,
        bioLink,
        imageLink,
        policy,
      });

      const candidate = await Candidate.findOneBy({ id });

      if (candidate) {
        return {
          id: candidate.id,
          name: candidate.name,
          dob: candidate.dob,
          bioLink: candidate.bioLink,
          imageLink: candidate.imageLink,
          policy: candidate.policy,
          votedCount: candidate.votedCount,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const disabled = async (id: number): Promise<boolean> => {
    try {
      const updatedCandidate = await Candidate.update(id, {
        disabled: true,
      });

      if (updatedCandidate.affected) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  export const increaseVotedCountByCandidateId = async (
    id: number
  ): Promise<boolean> => {
    try {
      const candidate = await dataSource
        .getRepository("candidate")
        .increment({ id }, "votedCount", 1);

      if (candidate.affected) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
