const Gallery = require("../models/gallery");

const galleryService = {
  // GET ALL GALLERIES
  async getAllGalleries() {
    const galleries = await Gallery.find({}).sort({ createdAt: -1 }).exec();

    if (!galleries) {
      return false;
    }

    return galleries;
  },

  async getNumberOfGalleries() {
    const totalCountOfGalleries = await Gallery.countDocuments({});
    return totalCountOfGalleries
  },


  // GET ALL GALLERIES BY QUERY (PAGINATION)
  async getAllGalleriesByPage(postPage) {
    let page = parseInt(postPage);
    // let limit = parseInt(process.env.LIMIT);
    let limit = 10;
    let startIndex = (Number(page) - 1) * limit;

    const totalCountOfPosts = await Gallery.countDocuments({});

    const galleries = await Gallery.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    const numberOfPages = Math.ceil(totalCountOfPosts / limit);

    return {
      data: galleries,
      totalCountOfPosts,
      numberOfPages,
      currentPage: page,
    };
  },

  // GET A GALLERY BY ID
  async getOneGalleryByID(id) {
    const gallery = await Gallery.findById(id).exec();

    if (!gallery) {
      return false;
    }

    return gallery;
  },

  // ADD A NEW GALLERY
  async addGallery(title, imageUrl) {
    let slug = title.replace(/\s+/g, "-").toLowerCase();

    const galleryExist = async (slug) => {
      let gallery = await Gallery.findOne({ slug });
      if (gallery) {
        return true;
      } else {
        return false;
      }
    };

    if (await galleryExist(slug)) {
      return false;
    }

    const newGallery = new Gallery({
      title,
      slug,
      imageUrl,
    });

    await newGallery.save();

    return newGallery;
  },

  //   UPDATE GALLERY
  async updateGallery(id, title, imageUrl) {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return false;
    }

    if (title) {
      let slug = title.replace(/\s+/g, "-").toLowerCase();
      gallery.title = title;
      gallery.slug = slug;
      await gallery.save();
    }
    if (imageUrl) {
      gallery.imageUrl = imageUrl;
      await gallery.save();
    }

    return true;
  },

  //   DELETE GALLERY
  async deleteGallery(id) {
    const galleryToDelete = await Gallery.findByIdAndDelete(id);

    if (!galleryToDelete) {
      return false;
    }

    return true;
  },
};

export default galleryService;
