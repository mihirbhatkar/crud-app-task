import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	useAddTaskMutation,
	useGetAllTasksMutation,
} from "./slices/tasksApiSlice";
import { setTasks } from "./slices/tasksSlice";

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

	const [addTask] = useAddTaskMutation();
	return (
		<>
			<div className="grid place-content-center min-h-screen">
				<div className="flex flex-col gap-4  p-4 border-2 border-black rounded">
					<h1 className="text-4xl font-bold text-center">Todos</h1>
					<form
						className="flex gap-4 w-[700px] justify-start items-center"
						onSubmit={async (e) => {
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
							} catch (error) {
								console.log(error);
							}
						}}
					>
						<div className="flex flex-col gap-2 ">
							<label htmlFor="title">Title</label>
							<input
								className="border-black border-2 p-2 rounded w-40"
								type="text"
								name="title"
								id="title"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="description">Description</label>
							<input
								className="border-black border-2 p-2 rounded w-80"
								type="text"
								name="description"
								id="description"
							/>
						</div>
						<div className="flex items-center justify-end w-full">
							<button
								className="p-2 border-black border-2 rounded"
								type="submit"
							>
								Add Task
							</button>
						</div>
					</form>

					<div className="flex flex-col gap-2 w-full">
						{isLoading ? (
							<div>Loading</div>
						) : (
							tasks.map((item) => {
								return (
									<Task
										key={item._id}
										title={item.title}
										description={item.description}
										completed={item.completed}
									></Task>
								);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}

const Task = ({ title, description, completed }) => {
	return (
		<div>
			{title} {description}
		</div>
	);
};
export default App;
