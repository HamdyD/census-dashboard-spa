import {
  Select,
  Text,
  Card,
  CardBody,
  Heading,
  Skeleton,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useCensusStore } from "../store/useCensusStore";

type SideBarProps = {
  selectedColumn: string;
  setSelectedColumn: (column: string) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
};

const SideBar = ({
  selectedColumn,
  setSelectedColumn,
  page,
  setPage,
  limit,
}: SideBarProps) => {
  const { columns, loading, totalCount, fetchData } = useCensusStore();

  const handleColumnChange = async (column: string) => {
    if (!column) {
      setSelectedColumn(column);
      return;
    }
    setSelectedColumn(column);
    setPage(1);
    await fetchData(column, page, limit);
  };
  return (
    <Flex
      direction="column"
      backgroundColor="purple.500"
      width="300px"
      padding="6"
    >
      <Heading size="sm" whiteSpace="nowrap" color="white" marginBottom="4">
        Select a column:
      </Heading>
      <Select
        placeholder="Select option"
        onChange={(e) => handleColumnChange(e.target.value)}
        backgroundColor="white"
        boxShadow="sm"
        isDisabled={loading}
      >
        {columns.map((column) => (
          <option value={column.name} key={column.cid}>
            {column.name}
          </option>
        ))}
      </Select>
      <Divider marginY="4" />

      {loading ? (
        <Card marginBottom="4">
          <CardBody>
            <Skeleton height="20px" width="100%" />
          </CardBody>
        </Card>
      ) : (
        <Card marginBottom="4">
          <CardBody>
            {selectedColumn ? (
              <Text>
                You have <strong>{totalCount}</strong> result
                {totalCount > 1 ? "s" : ""} for the column{" "}
                <strong>{selectedColumn}</strong>
              </Text>
            ) : (
              <Text>Please select an option above</Text>
            )}
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default SideBar;
