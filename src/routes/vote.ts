import express from "express";
import { VoteService } from "../services/vote";
import { StatusService } from "../services/status";
import { CandidateService } from "../services/candidate";
import { io } from "../index";

const router = express.Router();

router.post(
  "/status",
  async (req: express.Request, res: express.Response, next) => {
    const { nationalId } = req.body;

    if (nationalId && nationalId.length === 13) {
      const voted = await VoteService.getUserIsVoted(nationalId);

      if (voted) {
        return res.status(200).json({
          status: false,
        });
      }
      return res.status(200).json({
        status: true,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Something went wrong, your parameter must correctly.",
    });
  }
);

router.post("/", async (req: express.Request, res: express.Response, next) => {
  const { nationalId, candidateId } = req.body;

  const electionStatus = await StatusService.getElectionStatus();

  if (!electionStatus) {
    return res.status(200).json({
      status: "error",
      message: "Election is closed",
    });
  }

  if (nationalId && candidateId) {
    const voted = await VoteService.create(nationalId, candidateId);

    if (voted) {
      const counted = await CandidateService.increaseVotedCountByCandidateId(
        candidateId
      );
      if (counted) {
        const candidate = await CandidateService.getById(candidateId);
        io.sockets.emit("new-vote", {
          id: candidate?.id,
          votedCount: candidate?.votedCount,
        });
        return res.status(200).json({
          status: "ok",
        });
      }
    }
    return res.status(200).json({
      status: "error",
      message: "Already Voted",
    });
  }

  return res.status(400).json({
    success: false,
    error: "Something went wrong, your parameter must correctly.",
  });
});

export default router;
