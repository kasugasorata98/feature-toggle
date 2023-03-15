import express, { Request, Response } from "express";
import FeatureAccessController from "../../../modules/featureAccess/featureAccess.controller";
const featureAccessController = new FeatureAccessController();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      featureName,
      email,
      enable,
    }: {
      featureName: string;
      email: string;
      enable: boolean;
    } = req.body;

    const { isModified } = await featureAccessController.handleFeatureAccess(
      email,
      featureName,
      enable
    );
    res.sendStatus(isModified ? 200 : 304);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        message: err?.message,
      });
    } else {
      res.status(500).json({
        message: err?.message,
        code: err?.code,
      });
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { email, featureName } = req.query;
    if (!email) throw Error("BadRequestError");
    if (!featureName) throw Error("BadRequestError");
    const canAccess = await featureAccessController.getFeatureAccess(
      email.toString(),
      featureName.toString()
    );
    // can access may return undefined
    // if the featureName does not exist, it will return false
    res.json({
      canAccess: canAccess ? true : false,
    });
  } catch (err: any) {
    if (err.message === "BadRequestError")
      res.status(400).json({
        message: "Either missing featureName or email in query",
      });
    else {
      res.status(500).json({
        message: err?.message,
        code: err?.code,
      });
    }
  }
});

export default router;
