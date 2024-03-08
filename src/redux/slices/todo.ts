// todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface todoState {
    todo: Todo[];
}

const initialState: todoState = {
    todo: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: state.todo.length + 1,
                text: action.payload,
                completed: false,
            };
            state.todo.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todo.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
