const Comment = require('./commentSchema');

const createComment = async (request, response) => {
  try {
    const comment = request.body;
    const newComment = await new Comment(comment);
    const createdComment = await newComment.save();
    response.status(201).json({
      status: "success",
      createdComment
    });
  } catch (err) {
    response.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

module.exports = createComment;