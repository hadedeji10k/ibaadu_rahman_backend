import successResponseHandler from "../helpers/successResponseHandler";
import errorResponseHandler from "../helpers/errorResponseHandler";
import staffService from "../services/staffService";

const staffController = {
  // GET ALL STAFFS
  getAllStaffs: async (req, res) => {
    try {
      const staffs = await staffService.getAllStaffs();

      if (staffs) {
        return successResponseHandler(
          res,
          201,
          staffs,
          "Staffs fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staffs not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET ALL STAFFS BY QUERY (PAGINATION)
  getAllStaffsByPage: async (req, res) => {
    try {
      const { page } = req.query;
      const staffs = await staffService.getAllStaffsByPage(page);

      if (staffs) {
        return successResponseHandler(
          res,
          201,
          staffs,
          "Staffs fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staffs not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET A STAFF BY ID
  getOneStaffByID: async (req, res) => {
    try {
      const { id } = req.params;

      const staff = await staffService.getOneStaffByID(id);

      if (staff) {
        return successResponseHandler(
          res,
          201,
          staff,
          "Staff fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staff not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // ADD A NEW STAFF
  addStaff: async (req, res) => {
    try {
      const { title, imageUrl, name } = req.body;

      const staff = await staffService.addStaff(title, imageUrl, name);

      if (staff) {
        return successResponseHandler(
          res,
          201,
          staff,
          "Staff added successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staff not added successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // UPDATE STAFF
  updateStaff: async (req, res) => {
    try {
      const { id, title, imageUrl, name } = req.body;

      const staff = await staffService.updateStaff(id, title, imageUrl, name);

      if (staff) {
        return successResponseHandler(
          res,
          201,
          staff,
          "Staff updated successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staff not updated successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // REMOVE A STAFF
  deleteStaff: async (req, res) => {
    try {
      let { id } = req.params;

      const staff = await staffService.deleteStaff(id);

      if (staff) {
        return successResponseHandler(
          res,
          201,
          staff,
          "Staff deleted successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Staff not deleted successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },
};

export default staffController;
