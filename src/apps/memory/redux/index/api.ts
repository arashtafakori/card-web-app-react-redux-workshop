import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { networkError } from "../general/reducers/notificationReducer";

let api = axios.create({
  baseURL: process.env.REACT_APP_MEMORY_SERVICE_URL
});

export interface indicesListParams {
  bookletId: string;
  isDeleted: boolean | null;
}

export const getIndicesList = createAsyncThunk(
  "indices/getIndicesList",
  async (params: indicesListParams, thunkAPI: any) => {
    try {
      const url = `/v1/Booklets/${params.bookletId}/Indices?isDeleted=${params.isDeleted}`;

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const getIndex = createAsyncThunk(
  "indices/getIndex",
  async (id: any, thunkAPI) => {
    try {
      const response = await api.get(`/v1/indices/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);


export const addIndex = createAsyncThunk(
  "indices/addIndex",
  async (newBooklet: any, thunkAPI) => {
    try {
      const response = await api.post(
        `/v1/indices`, newBooklet);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const editIndexName = createAsyncThunk(
  "indices/editIndexName",
  async (modifiedItem: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/indices/editIndexName`,
        data: modifiedItem,
        method: "PATCH"
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);


export const deleteIndex = createAsyncThunk(
  "indices/deleteIndex",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/indices/delete/${id}`,
        method: "PATCH"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const restoreIndex = createAsyncThunk(
  "indices/restoreIndex",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/indices/restore/${id}`,
        method: "PATCH"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const deleteIndexPermanently = createAsyncThunk(
  "indices/deleteIndexPermanently",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/indices/${id}`,
        method: "DELETE"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const emptyIndicesTrash = createAsyncThunk(
  "indices/emptyIndicesTrash",
  async (bookletId: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/indices/emptyTrash/${bookletId}`,
        method: "DELETE"
      });
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);
