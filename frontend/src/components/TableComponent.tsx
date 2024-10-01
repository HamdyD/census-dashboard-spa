import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import { useCensusStore } from "../store/useCensusStore";

type TableComponentProps = {
  selectedColumn: string;
};

const TableComponent = ({ selectedColumn }: TableComponentProps) => {
  const { data } = useCensusStore();
  return (
    <TableContainer
      width="100%"
      borderRadius="xl"
      border="1px solid lightgray"
      boxShadow="sm"
    >
      <Table backgroundColor="white">
        <Thead backgroundColor="purple.500">
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
              <Td>{row.avg_age !== null ? row.avg_age?.toFixed(1) : "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
