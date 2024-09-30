import {
  Box,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCensusStore } from "../store/useCensusStore";

const OverviewPage = () => {
  const [selectedColumn, setSelectedColumn] = useState("");

  const { fetchAllColumns, fetchData, columns, data, loading } =
    useCensusStore();
  useEffect(() => {
    fetchAllColumns();
  }, []);

  const handleColumnChange = async (column: string) => {
    setSelectedColumn(column);
    await fetchData(column);
  };

  return (
    <Box padding="4">
      <Select
        placeholder="Select option"
        onChange={(e) => handleColumnChange(e.target.value)}
      >
        {columns.map((column) => (
          <option value={column.name} key={column.cid}>
            {column.name}
          </option>
        ))}
      </Select>
      {loading ? (
        <Spinner size="xl" />
      ) : data.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Value</Th>
              <Th>Count</Th>
              <Th>Average age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  {row[selectedColumn] !== null ? row[selectedColumn] : "N/A"}
                </Td>
                <Td>{row.count !== null ? row.count : "N/A"}</Td>
                <Td>
                  {row.avg_age !== null ? row.avg_age?.toFixed(1) : "N/A"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No data available</Text>
      )}
    </Box>
  );
};

export default OverviewPage;
