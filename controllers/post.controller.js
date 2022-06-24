import successResponseHandler from "../helpers/successResponseHandler";
import errorResponseHandler from "../helpers/errorResponseHandler";
import postService from "../services/postService";

const postController = {
  // GET ALL POSTS
  getAllPosts: async (req, res) => {
    try {
      const posts = await postService.getAllPosts();

      if (posts) {
        return successResponseHandler(
          res,
          201,
          posts,
          "Posts fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Posts not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET POST BY QUERY (PAGINATION)
  getAllPostsByPage: async (req, res) => {
    try {
      const { page } = req.query;
      const posts = await postService.getAllPostsByPage(page);

      if (posts) {
        return successResponseHandler(
          res,
          201,
          posts,
          "Posts fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Posts not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET A POST BY SLUG
  getOnePostBySlug: async (req, res) => {
    try {
      const { slug } = req.params;

      const post = await postService.getOnePostBySlug(slug);

      if (post) {
        return successResponseHandler(
          res,
          201,
          post,
          "Post fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Post not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // GET A POSTBYID
  getOnePostByID: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await postService.getOnePostByID(id);

      if (post) {
        return successResponseHandler(
          res,
          201,
          post,
          "Post fetched successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Post not fetched successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // ADD A NEW POST
  addPost: async (req, res) => {
    try {
      const { title, imageUrl, content } = req.body;

      const post = await postService.addPost(
        title,
        imageUrl,
        content
      );

      if (post) {
        return successResponseHandler(
          res,
          201,
          post,
          "Post added successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Post not added successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // UPDATE POST
  updatePost: async (req, res) => {
    try {
      const { id, title, content, imageUrl } = req.body;

      const post = await postService.updatePost(
        id,
        title,
        content,
        imageUrl
      );

      if (post) {
        return successResponseHandler(
          res,
          201,
          post,
          "Post updated successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Post not updated successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },

  // REMOVE A POST
  deletePost: async (req, res) => {
    try {
      let { id } = req.params;

      const post = await postService.deletePost(id);

      if (post) {
        return successResponseHandler(
          res,
          201,
          post,
          "Post deleted successfully",
          true
        );
      } else {
        return errorResponseHandler(
          res,
          400,
          "Post not deleted successfully",
          false
        );
      }
    } catch (error) {
      return errorResponseHandler(res, 500, "Request Not Processed", false);
    }
  },
};

export default postController;
