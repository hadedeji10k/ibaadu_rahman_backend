import { Router } from "express";
const router = Router();
import galleryController from "../controllers/gallery.controller";

router.get("/get-all-galleries", galleryController.getAllGalleries);
router.get(
  "/get-all-galleries-by-page",
  galleryController.getAllGalleriesByPage
);
router.get("/get-gallery/:id", galleryController.getOneGalleryByID);
router.get("/get-total-count-galleries", galleryController.getNumberOfGalleries);

router.post("/add-gallery", galleryController.addGallery);
router.put("/update-gallery", galleryController.updateGallery);
router.delete("/delete-gallery/:id", galleryController.deleteGallery);

export default router;
