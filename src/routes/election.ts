import express from "express";
import { Parser } from "json2csv";
import { StatusService } from "../services/status";
import { ElectionService } from "../services/election";
import { VoteService } from "../services/vote";
const router = express.Router();

router.post(
  "/toggle",
  async (req: express.Request, res: express.Response, next) => {
    const { enable } = req.body;

    // TODO only admin has permission to enable/disable the election

    if (enable === true || enable === false) {
      const electionStatus = await StatusService.updateElectionStatus(enable);

      if (electionStatus) {
        return res.status(200).json({
          status: "ok",
          enable: electionStatus.enable,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
    return res.status(400).json({
      success: false,
      error: "Something went wrong, your parameter must correctly.",
    });
  }
);

router.get(
  "/status",
  async (req: express.Request, res: express.Response, next) => {
    const electionStatus = await StatusService.getElectionStatus();

    if (electionStatus !== null) {
      return res.status(200).json({
        enable: electionStatus,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
);

router.get(
  "/result",
  async (req: express.Request, res: express.Response, next) => {
    const electionResult = await ElectionService.getElectionResult();

    if (electionResult) {
      return res.status(200).json(electionResult);
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
);

router.get(
  "/export",
  async (req: express.Request, res: express.Response, next) => {
    const exportValue = await VoteService.getExportValue();
    const fields = ["candidateId", "nationalId"];
    const json2csv = new Parser({ fields: fields, excelStrings: true });

    try {
      const csv = json2csv.parse(exportValue);
      res.attachment("election-result.csv");
      res.status(200).send(csv);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  }
);

export default router;
