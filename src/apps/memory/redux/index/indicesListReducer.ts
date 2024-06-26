import {addIndex, deleteIndex, deleteIndexPermanently, editIndexName, emptyIndicesTrash, getIndicesList, restoreIndex} from "./api";
import { ModelState, getStatus, getTypePrefix } from "../../../../utils/httpRequest";
import { Index } from "../../models";
import { createSlice } from "@reduxjs/toolkit";
 
let indicesListReducer = {
  undoItem: (state: any, action: any) => {
    state.data.splice(action.payload.index, 0, action.payload.item);
  }
};

export let indicesListExtraReducer = (builder: any) => {
  builder.addCase(getIndicesList.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(getIndicesList.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data = action.payload;
    })
    .addCase(getIndicesList.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(addIndex.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(addIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data.push(action.payload);
    })
    .addCase(addIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.payload;
    });

  //----

  builder.addCase(editIndexName.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(editIndexName.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const updatedItem = action.payload;
      const index = state.data.findIndex(
        (item: any) => item.id === updatedItem.id);
      if (index !== -1) state.data[index] = updatedItem;
    })
    .addCase(editIndexName.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteIndex.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.splice(index, 1);
    })
    .addCase(deleteIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(restoreIndex.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(restoreIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const restoredItemId = action.payload;
      let index = state.data.findIndex(
        (item: any) => item.id === restoredItemId);
      if (index !== -1)
        state.data.splice(index, 1);
    })
    .addCase(restoreIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteIndexPermanently.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteIndexPermanently.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.splice(index, 1);
    })
    .addCase(deleteIndexPermanently.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(emptyIndicesTrash.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(emptyIndicesTrash.fulfilled, (state: any, action: any) => {
 
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data = (ModelState.initiateListData<Index>()).data;
    })
    .addCase(emptyIndicesTrash.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });
};
 

var indicesListSlice = createSlice({
  name: "indices-list",
  initialState: ModelState.initiateListData<Index>(),
  reducers: indicesListReducer,
  extraReducers: indicesListExtraReducer
});

export default indicesListSlice;
export const { undoItem } = indicesListSlice.actions;