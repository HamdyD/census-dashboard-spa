import { create } from "zustand";
import { getAllColumns, getDataByColumn } from "../services/censusService";
import { ColumnT, ColumnDataT } from "../types/columnType";

type CensusState = {
  columns: ColumnT[];
  data: ColumnDataT[];
  loading: boolean;
  fetchAllColumns: () => Promise<void>;
  fetchData: (column: string, page: number, limit: number) => Promise<void>;
  totalPages: number;
  totalCount: number;
};

export const useCensusStore = create<CensusState>((set) => ({
  columns: [],
  data: [],
  loading: false,
  totalPages: 0,
  totalCount: 0,
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
  fetchData: async (column: string, page = 1, limit = 100) => {
    set({ loading: true });
    try {
      const response = await getDataByColumn(column, page, limit);
      set({
        data: response.data,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
      });
    } catch (error) {
      console.error(`Error fetching data for column ${column}:`, error);
    } finally {
      set({ loading: false });
    }
  },
}));
