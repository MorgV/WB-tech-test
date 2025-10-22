import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { usersApi, type User } from "../api/usersApi";

// 🔹 Async thunks
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchAll",
  async () => await usersApi.getAll()
);

export const fetchUserById = createAsyncThunk<User, string>(
  "users/fetchById",
  async (id) => await usersApi.getById(id)
);

export const createUser = createAsyncThunk<User, Partial<User>>(
  "users/create",
  async (user) => await usersApi.create(user)
);

export const updateUser = createAsyncThunk<
  User,
  { id: string; data: Partial<User> }
>("users/update", async ({ id, data }) => await usersApi.update(id, data));

export const deleteUser = createAsyncThunk<string, string>(
  "users/delete",
  async (id) => {
    await usersApi.remove(id);
    return id;
  }
);

// 🔹 Тип состояния
type UsersState = {
  list: User[];
  loading: boolean;
  error: string | null;
};

// 🔹 Начальное состояние
const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

// 🔹 Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Произошла ошибка";
      })

      // create
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.list.push(action.payload);
      })

      // update
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })

      // delete
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
