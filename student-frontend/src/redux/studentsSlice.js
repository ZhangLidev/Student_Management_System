import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  students: [],
  status: 'idle',
  error: null,
};

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('http://localhost:5000/api/students');
  return response.data;
});

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = state.students.concat(action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
