import express from "express";
import {
  updateFacilityStatus,
  deleteFacility,
  createFacility,
  getMyFacility,
} from "../controllers/facilityController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/my-facility", protect, getMyFacility);

router
  .route("/")
  .post(
    protect,
    upload.fields([{ name: "images" }, { name: "documents" }]),
    createFacility,
  );

router.route("/:id").delete(protect, admin, deleteFacility);

router.route("/:id/status").put(protect, admin, updateFacilityStatus);

export default router;
