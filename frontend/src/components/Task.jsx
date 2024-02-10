import { useState } from "react";
import { FaCheck, FaEdit, FaRegTrashAlt, FaUndo } from "react-icons/fa";

export const Task = ({
	_id,
	title,
	description,
	completed,
	onDelete,
	onComplete,
	onUpdate,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedDescription, setEditedDescription] = useState(description);

	const handleComplete = () => {
		onComplete(_id, completed);
	};

	const handleDelete = () => {
		onDelete(_id);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSaveEdit = () => {
		onUpdate(_id, {
			title: editedTitle,
			description: editedDescription,
			completed,
		});
		setIsEditing(false);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	return (
		<div className="flex justify-between gap-4  border-t-2  p-2">
			{isEditing ? (
				<>
					<div className="flex gap-4 justify-start items-center">
						<div className="flex flex-col">
							<label
								className="font-semibold label-text-alt label"
								htmlFor="editTitle"
							>
								Edit Title
							</label>
							<input
								name="editTitle"
								className="input input-bordered input-accent rounded"
								type="text"
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
							/>
						</div>
						<div className="flex flex-col">
							<label
								className="font-semibold label-text-alt label"
								htmlFor="editDesc"
							>
								Edit Description
							</label>
							<input
								name="editDesc"
								className="input input-bordered input-accent rounded"
								type="text"
								value={editedDescription}
								onChange={(e) =>
									setEditedDescription(e.target.value)
								}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="flex flex-col gap-1">
						<span
							className={`text-2xl font-bold ${
								completed && "line-through decoration-2"
							}`}
						>
							{title}
						</span>
						<span
							className={completed && `line-through decoration-2`}
						>
							{description}
						</span>
					</div>
				</>
			)}
			{isEditing ? (
				<>
					<div className="flex gap-4 items-center">
						<button
							className="btn btn-success btn-outline rounded"
							onClick={handleSaveEdit}
						>
							Save
						</button>
						<button
							className="btn  btn-outline rounded"
							onClick={handleCancelEdit}
						>
							Cancel
						</button>
					</div>
				</>
			) : (
				<>
					<div className="flex items-center gap-4">
						{!completed && (
							<>
								<button
									className="btn btn-error tooltip"
									data-tip="Delete"
									onClick={handleDelete}
								>
									<FaRegTrashAlt />
								</button>
								<button
									className="btn btn-warning tooltip"
									data-tip="Edit"
									onClick={handleEdit}
								>
									<FaEdit />
								</button>
							</>
						)}
						{completed ? (
							<button
								className={`btn tooltip`}
								data-tip="Undo"
								onClick={handleComplete}
							>
								<FaUndo />
							</button>
						) : (
							<button
								className={`btn btn-success tooltip`}
								data-tip="Complete"
								onClick={handleComplete}
							>
								<FaCheck />
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};
