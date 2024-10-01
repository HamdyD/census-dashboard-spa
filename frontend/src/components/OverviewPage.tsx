import {
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCensusStore } from "../store/useCensusStore";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";
import TableComponent from "./TableComponent";
import DoughnutChart from "./Charts";
import SideBar from "./Sidebar";
import EmptyState from "./EmptyState";

const OverviewPage = () => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { fetchAllColumns, data, loading } = useCensusStore();

  useEffect(() => {
    fetchAllColumns();
  }, []);

  return (
    <Flex>
      <SideBar
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        page={page}
        setPage={setPage}
        limit={limit}
      />
      <VStack
        padding="4"
        backgroundColor="gray.50"
        minHeight="100vh"
        width="100vw"
      >
        <Tabs colorScheme="purple" minWidth="700px">
          <TabList>
            <Tab>Table</Tab>
            <Tab>Chart</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedColumn ? (
                <Box>
                  {loading ? (
                    <TableSkeleton limit={limit} />
                  ) : data.length > 0 ? (
                    <TableComponent selectedColumn={selectedColumn} />
                  ) : (
                    <Text>No data available</Text>
                  )}
                  <Box marginTop="2">
                    <Pagination
                      page={page}
                      setPage={setPage}
                      selectedColumn={selectedColumn}
                      limit={limit}
                      setLimit={setLimit}
                    />
                  </Box>
                </Box>
              ) : (
                <EmptyState />
              )}
            </TabPanel>
            <TabPanel>
              {selectedColumn ? (
                <DoughnutChart selectedColumn={selectedColumn} />
              ) : (
                <EmptyState />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Flex>
  );
};

export default OverviewPage;
