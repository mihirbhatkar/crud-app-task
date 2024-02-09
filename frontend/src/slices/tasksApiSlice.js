// expensesApiSlice.js
import { apiSlice } from "./apiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTasks: builder.mutation({
			query: () => ({
				url: `/api`,
				method: "GET",
			}),
		}),

		// Add a new task
		addTask: builder.mutation({
			query: (data) => ({
				url: `/api`,
				method: "POST",
				body: data,
			}),
		}),

		// Update an existing task
		updateTask: builder.mutation({
			query: ({ taskId, data }) => ({
				url: `/api/${taskId}`,
				method: "PUT",
				body: data,
			}),
		}),

		// Delete a task
		deleteTask: builder.mutation({
			query: (taskId) => ({
				url: `/api/${taskId}`,
				method: "DELETE",
			}),
		}),

		clearAllTasks: builder.mutation({
			query: () => ({
				url: `/api/clear`,
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
