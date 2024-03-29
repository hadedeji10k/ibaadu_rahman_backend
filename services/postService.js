const Post = require("../models/post");

const postService = {
  // GET ALL POST
  async getAllPosts() {
    const posts = await Post.find({}).sort({ createdAt: -1 }).exec();

    if (!posts) {
      return false;
    }

    return posts;
  },
  
  async getNumberOfPosts() {
    const totalCountOfPosts = await Post.countDocuments({});
    return totalCountOfPosts
  },

  // GET POST BY QUERY (PAGINATION)
  async getAllPostsByPage(postPage) {
    let page = parseInt(postPage);
    // let limit = parseInt(process.env.LIMIT);
    let limit = 10;
    let startIndex = (Number(page) - 1) * limit;

    const totalCountOfPosts = await Post.countDocuments({});

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();

    const numberOfPages = Math.ceil(totalCountOfPosts / limit);

    return {
      data: posts,
      totalCountOfPosts,
      numberOfPages,
      currentPage: page,
    };
  },

  // GET A POST BY SLUG
  async getOnePostBySlug(slug) {
    let post = await Post.findOne({ slug }).exec();

    if (!post) {
      return false;
    }

    return post;
  },

  // GET A POSTBYID
  async getOnePostByID(id) {
    const post = await Post.findById(id).exec();

    if (!post) {
      return false;
    }

    return post;
  },

  // ADD A NEW POST
  async addPost(title, description, imageUrl, content) {
    let slug = title.replace(/\s+/g, "-").toLowerCase();

    const postExist = async (slug) => {
      let post = await Post.findOne({ slug });
      if (post) {
        return true;
      } else {
        return false;
      }
    };

    if (await postExist(slug)) {
      return false;
    }

    const newPost = new Post({
      title,
      slug,
      imageUrl,
      description,
      content,
    });

    await newPost.save();

    return newPost;
  },

  //   UPDATE POST
  async updatePost(id, title, description, content, imageUrl) {
    const post = await Post.findById(id);

    if (!post) {
      return false;
    }

    if (title) {
      let slug = title.replace(/\s+/g, "-").toLowerCase();
      post.title = title;
      post.slug = slug;
      await post.save();
    }
    if (content) {
      post.content = content;     
      await post.save();
    }
    if (description) {
      post.description = description;
      await post.save();
    }
    if (imageUrl) {
      post.imageUrl = imageUrl;
      await post.save();
    }

    return true;
  },

  //   DELETE POST
  async deletePost(id) {
    const postToDelete = await Post.findByIdAndDelete(id);

    if (!postToDelete) {
      return false;
    }

    return true;
  },
};

export default postService;
