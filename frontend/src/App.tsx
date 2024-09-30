import { ChakraProvider } from "@chakra-ui/react";
import OverviewPage from "./components/OverviewPage";

const App = () => {
  return (
    <ChakraProvider>
      <OverviewPage />
    </ChakraProvider>
  );
};

export default App;
