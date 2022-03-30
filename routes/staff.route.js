import { Router } from "express";
const router = Router();
import staffController from "../controllers/staff.controller";

router.get("/get-all-staffs", staffController.getAllStaffs);
router.get("/get-all-staffs-by-page", staffController.getAllStaffsByPage);
router.get("/get-staff/:id", staffController.getOneStaffByID);

router.post("/add-staff", staffController.addStaff);
router.put("/update-staff", staffController.updateStaff);
router.delete("/delete-staff/:id", staffController.deleteStaff);

export default router;
