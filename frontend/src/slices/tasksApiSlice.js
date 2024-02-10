// expensesApiSlice.js
import { apiSlice } from "./apiSlice";

const TASKS_URL = "https://todo-app-task-api.vercel.app/api";

export const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTasks: builder.mutation({
			query: () => ({
				url: `${TASKS_URL}`,
				method: "GET",
			}),
		}),

		addTask: builder.mutation({
			query: (data) => ({
				url: `${TASKS_URL}`,
				method: "POST",
				body: data,
			}),
		}),

		updateTask: builder.mutation({
			query: ({ taskId, data }) => ({
				url: `${TASKS_URL}/${taskId}`,
				method: "PUT",
				body: data,
			}),
		}),

		deleteTask: builder.mutation({
			query: (taskId) => ({
				url: `${TASKS_URL}/${taskId}`,
				method: "DELETE",
			}),
		}),

		clearAllTasks: builder.mutation({
			query: () => ({
				url: `${TASKS_URL}/clear`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetAllTasksMutation,
	useClearAllTasksMutation,
	useAddTaskMutation,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} = tasksApiSlice;
