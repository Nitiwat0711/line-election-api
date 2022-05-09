import { Status } from "../database/entity/Status";
import { StatusModel } from "../database/model/status";

export namespace StatusService {
  export const getElectionStatus = async (): Promise<boolean | null> => {
    try {
      const status = await Status.findOneOrFail({
        where: {
          id: 1,
        },
      });

      return status.enable;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const updateElectionStatus = async (
    enable: boolean
  ): Promise<StatusModel.T | null> => {
    try {
      const updatedElectionStatus = await Status.update(1, {
        enable,
      });

      const electionStatus = await Status.findOneBy({ id: 1 });

      return electionStatus;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
