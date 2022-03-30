const Staff = require("../models/staff");

const staffService = {
  // GET ALL STAFFS
  async getAllStaffs() {
    const staffs = await Staff.find({}).sort({ createdAt: -1 }).exec();

    if (!staffs) {
      return false;
    }

    return staffs;
  },

  // GET ALL STAFFS BY QUERY (PAGINATION)
  async getAllStaffsByPage(postPage) {
    let page = parseInt(postPage);
    // let limit = parseInt(process.env.LIMIT);
    let limit = 10;
    let startIndex = (Number(page) - 1) * limit;

    const totalCountOfPosts = await Staff.countDocuments({});

    const staffs = await Staff.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    const numberOfPages = Math.ceil(totalCountOfPosts / limit);

    return {
      staffs,
      totalCountOfPosts,
      numberOfPages,
      currentPage: page,
    };
  },

  // GET A STAFF BY ID
  async getOneStaffByID(id) {
    const staff = await Staff.findById(id).exec();

    if (!staff) {
      return false;
    }

    return staff;
  },

  // ADD A NEW STAFF
  async addStaff(title, imageUrl, name) {
    let slug = name.replace(/\s+/g, "-").toLowerCase();

    const staffExist = async (name) => {
      let staff = await Staff.findOne({ name });
      if (staff) {
        return true;
      } else {
        return false;
      }
    };

    if (await staffExist(name)) {
      return false;
    }

    const newStaff = new Staff({
      title,
      slug,
      imageUrl,
      name,
    });

    await newStaff.save();

    return newStaff;
  },

  //   UPDATE STAFF
  async updateStaff(id, title, imageUrl, name) {
    const staff = await Staff.findById(id);

    if (!staff) {
      return false;
    }

    if (name) {
      let slug = name.replace(/\s+/g, "-").toLowerCase();
      staff.name = name;
      staff.slug = slug;
      await staff.save();
    }
    if (title) {
      staff.title = title;
      await staff.save();
    }
    if (imageUrl) {
      staff.imageUrl = imageUrl;
      await staff.save();
    }

    return true;
  },

  //   DELETE STAFF
  async deleteStaff(id) {
    const staffToDelete = await Staff.findByIdAndDelete(id);

    if (!staffToDelete) {
      return false;
    }

    return true;
  },
};

export default staffService;
