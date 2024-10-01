import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/react";

const EmptyState = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="300px"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      padding="4"
      textAlign="center"
    >
      <WarningIcon boxSize="12" color="gray.400" marginBottom="4" />
      <Heading as="h3" size="lg" marginBottom="2">
        No data available
      </Heading>
      <Text mb="4">Please select an option to view the data.</Text>
    </Flex>
  );
};

export default EmptyState;
