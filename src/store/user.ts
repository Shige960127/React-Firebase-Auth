import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

export type UserState = {
  isLogined: boolean;
  status: "initial" | "success" | "failure" | "pending";
};

const auth = getAuth();

export const getUser = createAsyncThunk("getUser", async () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return true;
      }
    });
  } catch (error) {
    console.log({ error });
  }
  return false;
});

export const handleSignIn = createAsyncThunk(
  "handleSignIn",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        return true;
      }
    } catch (error) {
      alert(error);
    }
    return false;
  }
);

export const handleSignOut = createAsyncThunk("handleSignOut", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
});

export const user = createSlice({
  name: "user",
  initialState: <UserState>{
    isLogined: false,
    status: "initial",
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    // signIn　関数が成功した時
    builder.addCase(
      handleSignIn.fulfilled,
      (state, { payload }: { payload: boolean }) => {
        state.isLogined = payload;
        state.status = "success";
      }
    );
    // signIn　関数の実行中
    builder.addCase(handleSignIn.pending, (state) => {
      state.status = "pending";
    });
    // signIn　関数が失敗した時
    builder.addCase(handleSignIn.rejected, (state) => {
      state.status = "failure";
    });
    // getUser　関数が成功した時
    builder.addCase(
      getUser.fulfilled,
      (state, { payload }: { payload: boolean }) => {
        state.isLogined = payload;
        state.status = "success";
      }
    );
    // getUser　関数の実行中
    builder.addCase(getUser.pending, (state) => {
      state.status = "pending";
    });
    // getUser　関数が失敗した時
    builder.addCase(getUser.rejected, (state) => {
      state.status = "failure";
    });
    // signOut　関数の実行中　関数が成功した時
    builder.addCase(handleSignOut.fulfilled, (state) => {
      state.isLogined = false;
      state.status = "success";
    });
    // signOut　関数の実行中
    builder.addCase(handleSignOut.pending, (state) => {
      state.status = "pending";
    });
    // getUser　関数が失敗した時
    builder.addCase(handleSignOut.rejected, (state) => {
      state.status = "failure";
    });
  },
});
export default user.reducer;
