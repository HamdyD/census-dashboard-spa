import { Select, Text, HStack, IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useCensusStore } from "../store/useCensusStore";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  selectedColumn: string;
  limit: number;
  setLimit: (limit: number) => void;
};

const Pagination = ({
  page,
  setPage,
  selectedColumn,
  limit,
  setLimit,
}: PaginationProps) => {
  const { fetchData, totalPages } = useCensusStore();

  const handleNextPage = async () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchData(selectedColumn, nextPage, limit);
    }
  };

  const handlePrevPage = async () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      await fetchData(selectedColumn, prevPage, limit);
    }
  };

  const handleLimitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setPage(1); // Reset to page 1 when limit changes
    await fetchData(selectedColumn, page, newLimit);
  };
  return (
    <Flex
      padding="4"
      width="100%"
      justifyContent="space-between"
      background="white"
      boxShadow="sm"
      border="1px solid lightgray"
      borderRadius="xl"
    >
      <HStack spacing="4">
        <Text>Show:</Text>
        <Select
          value={limit}
          onChange={handleLimitChange}
          backgroundColor="white"
          boxShadow="sm"
          maxWidth="100px"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
        <Text whiteSpace="nowrap">items per page</Text>
      </HStack>
      <HStack spacing="4">
        <IconButton
          aria-label="previous page"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevPage}
          isDisabled={page === 1}
          colorScheme="purple"
        />
        <Text>
          Page {page} of {totalPages}
        </Text>
        <IconButton
          aria-label="next page"
          icon={<ChevronRightIcon />}
          onClick={handleNextPage}
          isDisabled={page === totalPages}
          colorScheme="purple"
        />
      </HStack>
    </Flex>
  );
};

export default Pagination;
