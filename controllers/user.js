import User from "./../models/userModel.js";

/**
 * @route GET /api/user
 * @description authenticate the request and return the respective user profile
 * @param {} req -user._id
 * @param {*} res - RETURN: User Name, number of followers & followings.
 * @access Protected
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("followers following");

    res.json({
      name: user.name,
      followers: user.followers.length,
      following: user.following.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route POST /api/follow/{id}
 * @description authenticated user would follow user with {id}
 * @param {id} req -user._id
 * @param {*} res - RETURN: JSON response "Successfully followed user"
 * @access Protected
 */
const followUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Add the user to the authenticated user's "following" array
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { following: id },
    });

    // Add the authenticated user to the followed user's "followers" array
    await User.findByIdAndUpdate(id, {
      $addToSet: { followers: req.user._id },
    });

    res.json({ message: "Successfully followed user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route POST /api/unfollow/{id}
 * @description authenticated user would unfollow user with {id}
 * @param {id} req -user._id
 * @param {*} res - RETURN: JSON response "Successfully unfollowed user"
 * @access Protected
 */
const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove the user from the authenticated user's "following" array
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

    // Remove the authenticated user from the unfollowed user's "followers" array
    await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });

    res.json({ message: "Successfully unfollowed user" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserProfile, followUser, unfollowUser };
