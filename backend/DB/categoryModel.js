const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const validateCreateCategory = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(4).required(),
  });
  return schema.validate(obj);
};

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  Category,
  validateCreateCategory,
};
