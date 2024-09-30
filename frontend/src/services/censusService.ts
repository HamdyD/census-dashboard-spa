import axios from "axios";
import { ColumnDataT, ColumnT } from "../types/columnType";

const API_URL = "http://localhost:3000";

export const getAllColumns = async (): Promise<{ columns: ColumnT[] }> => {
  try {
    const response = await axios.get(`${API_URL}/columns`);
    return { columns: response.data.columns };
  } catch (error) {
    console.error("Error fetching columns: ", error);
    throw error;
  }
};

export const getDataByColumn = async (
  column: string
): Promise<{ data: ColumnDataT[] }> => {
  try {
    const response = await axios.get(`${API_URL}/data`, {
      params: { column },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for column ${column}: `, error);
    throw error;
  }
};
