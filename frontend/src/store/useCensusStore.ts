import { create } from "zustand";
import { getAllColumns, getDataByColumn } from "../services/censusService";
import { ColumnT, ColumnDataT } from "../types/columnType";

type CensusState = {
  columns: ColumnT[];
  data: ColumnDataT[];
  loading: boolean;
  fetchAllColumns: () => Promise<void>;
  fetchData: (column: string) => Promise<void>;
};

export const useCensusStore = create<CensusState>((set) => ({
  columns: [],
  data: [],
  loading: false,

  fetchAllColumns: async () => {
    set({ loading: true });
    try {
      const response = await getAllColumns();
      set({ columns: response.columns });
    } catch (error) {
      console.error("Error fetching columns: ", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchData: async (column: string) => {
    set({ loading: false });
    try {
      const response = await getDataByColumn(column);
      set({ data: response.data });
    } catch (error) {
      console.error(`Error fetching data for column ${column}:`, error);
    } finally {
      set({ loading: false });
    }
  },
}));
