import { Router } from "express";
const router = Router();
import galleryController from "../controllers/gallery.controller";

router.get("/get-all-galleries", galleryController.getAllGalleries);
router.get(
  "/get-all-galleries-by-page",
  galleryController.getAllGalleriesByPage
);
router.get("/get-gallery", galleryController.getOneGalleryByID);

router.post("/add-gallery", galleryController.addGallery);
router.put("/update-gallery", galleryController.updateGallery);
router.delete("/delete-gallery", galleryController.deleteGallery);

export default router;
