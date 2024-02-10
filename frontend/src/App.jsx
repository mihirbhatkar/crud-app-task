import { Task } from "./components/Task.jsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	useAddTaskMutation,
	useClearAllTasksMutation,
	useDeleteTaskMutation,
	useGetAllTasksMutation,
	useUpdateTaskMutation,
} from "./slices/tasksApiSlice";
import { setTasks } from "./slices/tasksSlice";
import { toast } from "react-toastify";

function App() {
	const { tasks } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();

	const [getAllTasks, { isLoading }] = useGetAllTasksMutation();

	useEffect(() => {
		const retrieveAllTasks = async () => {
			try {
				const res = await getAllTasks();
				const data = res.data.tasks;

				dispatch(setTasks(data));
			} catch (error) {
				console.log(error);
			}
		};
		retrieveAllTasks();
	}, []);

	const handleComplete = async (taskId, completed) => {
		try {
			await updateTask({ taskId, data: { completed: !completed } });
			const res = await getAllTasks();
			const data = res.data.tasks;
			dispatch(setTasks(data));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (taskId) => {
		try {
			await deleteTask(taskId);
			const res = await getAllTasks();
			const data = res.data.tasks;
			dispatch(setTasks(data));
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (taskId, updatedData) => {
		try {
			await updateTask({ taskId, data: updatedData });
			const res = await getAllTasks();
			const data = res.data.tasks;
			dispatch(setTasks(data));
		} catch (error) {
			console.log(error);
		}
	};

	const submitNewTask = async (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const description = e.target.description.value;

		try {
			await addTask({
				title,
				description,
			});
			const res = await getAllTasks();
			const data = await res.data.tasks;
			dispatch(setTasks(data));

			e.target.title.value = "";
			e.target.description.value = "";
		} catch (error) {
			console.log(error);
		}
	};

	const [addTask] = useAddTaskMutation();
	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();
	const [clearAllTasks] = useClearAllTasksMutation();
	return (
		<>
			<div
				data-theme="cupcake"
				className="grid justify-center items-start  min-h-screen "
			>
				<div className="mt-16 min-h-[600px] flex flex-col gap-4 p-4 border-2 border-base-200 shadow-xl rounded">
					<h1 className="text-5xl font-bold text-center underline underline-offset-4 decoration-4">
						Todos
					</h1>
					<form
						className="flex gap-4 w-[700px] justify-start items-center"
						onSubmit={submitNewTask}
					>
						<div className="flex flex-col">
							<label className="label font-bold" htmlFor="title">
								Title
							</label>
							<input
								required
								className="input input-bordered rounded w-40"
								type="text"
								name="title"
								id="title"
							/>
						</div>
						<div className="flex flex-col ">
							<label
								className="label font-bold"
								htmlFor="description"
							>
								Description
							</label>
							<input
								className="input input-bordered rounded w-80"
								type="text"
								name="description"
								id="description"
							/>
						</div>
						<div className="flex items-center justify-end w-full">
							<button
								className="btn btn-primary rounded"
								type="submit"
							>
								Add Task
							</button>
						</div>
					</form>

					{/* <hr className="self-center w-3/4 rounded-xl mt-2" /> */}

					<div className="flex flex-col w-full">
						{isLoading ? (
							<span className="self-center w-24 h-24 loading loading-dots"></span>
						) : (
							tasks.map((item) => {
								return (
									<Task
										key={item._id}
										_id={item._id}
										title={item.title}
										description={item.description}
										completed={item.completed}
										onDelete={handleDelete}
										onComplete={handleComplete}
										onUpdate={handleUpdate}
									/>
								);
							})
						)}
						<button
							className="btn btn-error btn-outline self-center mt-4"
							onClick={async () => {
								try {
									await clearAllTasks();
									const res = await getAllTasks();
									const data = await res.data.tasks;
									dispatch(setTasks(data));
									toast.success("All tasks cleared!");
								} catch (error) {
									console.log(error);
								}
							}}
						>
							Clear All Tasks
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
