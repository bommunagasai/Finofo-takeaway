import { Flex, Spinner } from "@chakra-ui/react"

const Loader = () => {
    return <Flex p='8' alignItems={'center'} justifyContent={'center'}>
        <Spinner />
    </Flex>
}

export default Loader;