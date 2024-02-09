const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		completed: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
