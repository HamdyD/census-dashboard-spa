import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type TableSkeletonProps = {
  limit: number;
};

const TableSkeleton = ({ limit }: TableSkeletonProps) => {
  return (
    <TableContainer width="100%" borderRadius="xl" boxShadow="sm">
      <Table backgroundColor="white">
        <Thead backgroundColor="purple.500">
          <Tr>
            <Th color="white">Value</Th>
            <Th color="white">Count</Th>
            <Th color="white">Average age</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Generate skeleton rows based on the limit to avoid content layout shifts */}
          {Array.from({ length: limit }).map((_, index) => (
            <Tr key={index}>
              <Td>
                <Skeleton height="20px" />
              </Td>
              <Td>
                <Skeleton height="20px" />
              </Td>
              <Td>
                <Skeleton height="20px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
