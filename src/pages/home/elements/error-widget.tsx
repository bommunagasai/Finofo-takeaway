import { WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import React from "react";

const ErrorWidget: React.FC = () => {
    return <Box borderWidth='1px' borderRadius='lg' borderColor={'red.200'}>
        <Flex justifyContent={'center'} p='4' gap='8'>
            <WarningTwoIcon color='red.400' boxSize='4em' />
            <VStack alignItems={'start'} gap='2'>
                <Text fontSize={'x-large'} as={'b'} color='red.500' align={'left'}>Opps</Text>
                <Text color='red.200'>Something went wrong, please visit after sometime</Text>
                <Button
                    size='sm'
                    colorScheme='red'
                    onClick={() => window.location.reload()}
                >
                    Refresh
                </Button>
            </VStack>
        </Flex>
    </Box>
}

export default ErrorWidget;