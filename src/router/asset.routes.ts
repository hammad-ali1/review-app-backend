import { Router } from "express";

import {
  addAsset,
  getAssets,
  deleteAsset,
} from "../controllers/asset.controller";
const assetRouter = Router();

assetRouter.route("/add").post(addAsset);
assetRouter.route("/:user").get(getAssets);
assetRouter.route("/delete/:_id").post(deleteAsset);

export default assetRouter;
