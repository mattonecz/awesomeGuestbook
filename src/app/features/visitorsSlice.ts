import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum DepartmentType {
  "Marketing" = 3,
  "IT" = 1,
  "Sales" = 4,
  "Management" = 2,
  "Accounting" = 0,
}

export type Visitor = {
  name: string;
  email: string;
  department: DepartmentType;
};

export interface VisitorsState {
  visitors: Visitor[];
}

const initialState: VisitorsState = {
  visitors: [],
};

export const appNameSlice = createSlice({
  name: "appName",
  initialState,
  reducers: {
    addVisitor: (state, action: PayloadAction<Visitor>) => {
      state.visitors.push(action.payload);
    },
    removeVisitors: (state, action: PayloadAction<string[]>) => {
      state.visitors = state.visitors.filter(
        (visitor) => !action.payload.includes(visitor.email)
      );
    },
  },
});

export const { addVisitor, removeVisitors } = appNameSlice.actions;

export default appNameSlice.reducer;
