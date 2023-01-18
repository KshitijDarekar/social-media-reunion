import User from "../models/userModel.js";
import Post from "../models/postModel.js";

/**
 * @route POST api/posts/
 * @description add a new post created by the authenticated user.
 * @param {id} req -user._id
 * @param {*} res - RETURN: Post-ID, Title, Description, Created Time(UTC)
 * @access Protected
 * @function createPost()
 */

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      title,
      description,
      user: req.user._id,
      createdAt: new Date(),
    });

    await post.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });

    res.json({
      postId: post._id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route DELETE api/posts/{id}
 * @description delete post with {id} created by the authenticated user.
 * @param {id} req -user._id
 * @param {*} res - Return: JSON response "Successfully deleted post"
 * @access Protected
 * @function deletePost()
 */

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.findOneAndDelete({ _id: id, user: req.user._id }, (err) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "Successfully deleted post" });
    }
  });
};

/**
 * @route GET api/posts/{id}
 * @description return a single post with {id} populated with its number of likes and comments
 * @param {id} req -user._id
 * @param {*} res - Return: JSON {post,number of likes, comments}
 * @access Protected
 * @function getPostById()
 */

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likes = post.likes.length;
    const comments = post.comments.length;

    res.status(200).json({ post, likes, comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

/**
 * @route POST /api/like/{id}
 * @description like the post with {id} by the authenticated user.
 * @param {id} req -user._id
 * @param {*} res - Return: JSON response "Successfully liked post"
 * @access Protected
 * @function likePost()
 */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.json({ message: "Successfully liked post" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route POST /api/unlike/{id}
 * @description unlike the post with {id} by the authenticated user.
 * @param {id} req -user._id
 * @param {*} res - Return: JSON response "Successfully unliked post"
 * @access Protected
 * @function unlikePost()
 */
const unlikePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    (err, post) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ message: "Successfully unliked post" });
      }
    }
  );
};

/**
 * @route POST /api/comment/{id}
 * @description add comment for post with {id} by the authenticated user.
 * @param {id} req -user._id
 * @param {*} res - Return: Comment-ID
 * @access Protected
 * @function makeComment()
 */

const makeComment = async (req, res) => {
  const { id } = req.params;
  const newComment = {
    user: req.user._id,
    text: req.body.text,
    createdAt: new Date(),
  };

  try {
    const post = await Post.findById(id);
    post.comments.push(newComment);
    const result = await post.save();
    const comment_id = result.comments[result.comments.length - 1]._id;
    res.json({ message: "Successfully added comment", commentId: comment_id });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /api/all_posts
 * @description return all posts created by authenticated user sorted by post time.
 * @param {} req -user._id
 * @param {*} res - RETURN: For each post return the following values
 * - id: ID of the post
 * - title: Title of the post
 * - desc: Description of the post
 * - created_at: Date and time when the post was created
 * - comments: Array of comments, for the particular post
 * - likes: Array of likes for the particular post
 * @access Protected
 * @function getAllPosts()
 */

const getAllPosts = async (req, res) => {
  try {
    //first find the user by their ID using the User.findById() method
    //Then we use the .populate() method to populate the posts made by that user, using the reference to the posts in the user schema.
    const user = await User.findById(req.user._id).populate({
      path: "posts",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ posts: user.posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export {
  getPostById,
  likePost,
  unlikePost,
  createPost,
  deletePost,
  makeComment,
  getAllPosts,
};
