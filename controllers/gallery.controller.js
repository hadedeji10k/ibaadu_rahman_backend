import successResponseHandler from "../helpers/successResponseHandler";
import errorResponseHandler from "../helpers/errorResponseHandler";
import galleryService from "../services/galleryService";

const galleryController = {
  // GET ALL POSTS
  getAllGalleries: async (req, res) => {
    try {
      const galleries = await galleryService.getAllGalleries();

      if (galleries) {
        return successResponseHandler(
          res,
          201,
          galleries,
          "Galleries fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Galleries not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET ALL GALLERIES BY QUERY (PAGINATION)
  getAllGalleriesByPage: async (req, res) => {
    try {
      const { page } = req.query;
      const galleries = await galleryService.getAllGalleriesByPage(page);

      if (galleries) {
        return successResponseHandler(
          res,
          201,
          galleries,
          "Galleries fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Galleries not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET A GALLERY BY ID
  getOneGalleryByID: async (req, res) => {
    try {
      const { id } = req.params;

      const gallery = await galleryService.getOneGalleryByID(id);

      if (gallery) {
        return successResponseHandler(
          res,
          201,
          gallery,
          "Gallery fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Gallery not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // ADD A NEW POST
  addGallery: async (req, res) => {
    try {
      const { title, imageUrl } = req.body;

      const gallery = await galleryService.addGallery(title, imageUrl);

      if (gallery) {
        return successResponseHandler(
          res,
          201,
          gallery,
          "Gallery added successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Gallery not added successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // UPDATE POST
  updateGallery: async (req, res) => {
    try {
      const { id, title, imageUrl } = req.body;

      const gallery = await galleryService.updateGallery(id, title, imageUrl);

      if (gallery) {
        return successResponseHandler(
          res,
          201,
          gallery,
          "Gallery updated successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Gallery not updated successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // REMOVE A POST
  deleteGallery: async (req, res) => {
    try {
      let { id } = req.params;

      const gallery = await galleryService.deleteGallery(id);

      if (gallery) {
        return successResponseHandler(
          res,
          201,
          gallery,
          "Gallery deleted successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Gallery not deleted successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },
};

export default galleryController;
