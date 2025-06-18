import { createSlice } from "@reduxjs/toolkit";

interface Task {
  // Define your task properties here, for example:
  id: string;
  name: string;
  isChecked: boolean;
  // Add more fields as needed
}

interface TaskState {
  taskList: Task[];
}

const initialState: TaskState = {
  taskList: [],
};

const taskStore = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: { payload: Task }) => {
      state.taskList.unshift(action.payload);
    },
    toggleTask(state, action) {
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload
            ? { ...task, isChecked: !task.isChecked }
            : task
        );
    
    },
    removeTask: (state, action: { payload: Task }) => {},
  },
});

export const { addTask, removeTask, toggleTask } = taskStore.actions;

export default taskStore.reducer;
