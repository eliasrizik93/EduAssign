import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  // Define your todo state properties here
  todos: string[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
