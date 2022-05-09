import express from "express";
import { CandidateService } from "../services/candidate";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next) => {
  const candidates = await CandidateService.get();

  if (candidates) {
    return res.status(200).json(candidates);
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later.",
  });
});

router.get(
  "/:candidateId",
  async (req: express.Request, res: express.Response, next) => {
    const { candidateId } = req.params;

    if (isNaN(parseInt(candidateId)) || parseInt(candidateId) < 1) {
      return res.status(400).json({
        success: false,
        error:
          "Something went wrong, your parameter must be greater than or equal 1.",
      });
    }

    const candidate = await CandidateService.getById(parseInt(candidateId));

    if (candidate) {
      return res.status(200).json(candidate);
    }
    return res.status(404).json({
      success: false,
      message: "Not found candidate.",
    });
  }
);

router.post("/", async (req: express.Request, res: express.Response, next) => {
  const { name, dob, bioLink, imageLink, policy } = req.body;

  //   console.log(req.body);

  if (name && dob && bioLink && imageLink && policy) {
    const newCandidate = await CandidateService.add(
      name,
      dob,
      bioLink,
      imageLink,
      policy
    );
    return res.status(200).json(newCandidate);
  }

  return res.status(400).json({
    success: false,
    error: "Something went wrong, your parameter must correctly.",
  });
});

router.put(
  "/:id",
  async (req: express.Request, res: express.Response, next) => {
    const { candidateId, name, dob, bioLink, imageLink, policy } = req.body;
    const { id } = req.params;

    if (
      isNaN(parseInt(candidateId)) ||
      parseInt(candidateId) < 1 ||
      isNaN(parseInt(id)) ||
      parseInt(id) < 1
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Something went wrong, your parameter must be greater than or equal 1.",
      });
    }

    if (candidateId && name && dob && bioLink && imageLink && policy) {
      const updatedCandidate = await CandidateService.edit(
        parseInt(id),
        name,
        dob,
        bioLink,
        imageLink,
        policy
      );

      if (updatedCandidate) {
        return res.status(200).json(updatedCandidate);
      }
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }

    return res.status(400).json({
      success: false,
      error: "Something went wrong, your parameter must be correctly.",
    });
  }
);

router.delete(
  "/:candidateId",
  async (req: express.Request, res: express.Response, next) => {
    const { candidateId } = req.params;

    if (isNaN(parseInt(candidateId)) || parseInt(candidateId) < 1) {
      return res.status(400).json({
        success: false,
        error:
          "Something went wrong, your parameter must be greater than or equal 1.",
      });
    }

    const candidate = await CandidateService.getById(parseInt(candidateId));

    if (candidate) {
      const success = await CandidateService.disabled(parseInt(candidateId));

      if (success) {
        return res.status(200).json({
          status: "ok",
        });
      }
    }

    return res.status(404).json({
      status: "error",
      message: "Candidate not found",
    });
  }
);
export default router;
