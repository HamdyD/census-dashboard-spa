import {
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Card,
  CardBody,
  VStack,
  Heading,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCensusStore } from "../store/useCensusStore";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";

const OverviewPage = () => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { fetchAllColumns, fetchData, columns, data, loading, totalCount } =
    useCensusStore();

  useEffect(() => {
    fetchAllColumns();
  }, []);

  const handleColumnChange = async (column: string) => {
    setSelectedColumn(column);
    setPage(1);
    await fetchData(column, page, limit);
  };

  return (
    <VStack padding="4" backgroundColor="gray.50" minHeight="100vh">
      <Heading size="sm">Select a column</Heading>
      <Select
        placeholder="Select option"
        onChange={(e) => handleColumnChange(e.target.value)}
        marginBottom="4"
        backgroundColor="white"
        boxShadow="sm"
      >
        {columns.map((column) => (
          <option value={column.name} key={column.cid}>
            {column.name}
          </option>
        ))}
      </Select>

      <Card marginBottom="4">
        <CardBody>
          <Text>
            You have <strong>{totalCount}</strong> result
            {totalCount > 1 ? "s" : ""} for the column{" "}
            <strong>{selectedColumn}</strong>
          </Text>
        </CardBody>
      </Card>
      {loading ? (
        <TableSkeleton limit={limit} />
      ) : data.length > 0 ? (
        <TableContainer
          width="100%"
          borderRadius="xl"
          border="1px solid lightgray"
          boxShadow="sm"
        >
          <Table backgroundColor="white">
            <Thead backgroundColor="blue.500">
              <Tr>
                <Th color="white">Value</Th>
                <Th color="white">Count</Th>
                <Th color="white">Average age</Th>
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
        </TableContainer>
      ) : (
        <Text>No data available</Text>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        selectedColumn={selectedColumn}
        limit={limit}
        setLimit={setLimit}
      />
    </VStack>
  );
};

export default OverviewPage;
