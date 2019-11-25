import mongoose from 'mongoose';

/**
 * Schema de Post modelado para o MongoDB
 */
const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hashtags: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
