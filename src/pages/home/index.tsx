import { useEffect, useState, useMemo, useRef } from "react";
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, Text, useBoolean, useDisclosure, useMediaQuery } from "@chakra-ui/react";

import useFetch from "../../hooks/useFetch";
import useDataGroupBy from "../../hooks/useDataGroupBy";
import useJar from "../../hooks/useJar";
import FriutsList from "./elements/friuts-list";
import FruitsChart from "./elements/fruits-chart";
import JarList from "./elements/jar-list";
import { GROUP_BY_LIST, headData } from "./constants";
import Loader from "./elements/loader";
import ErrorWidget from "./elements/error-widget";
import Toolbar from "./elements/toolbar";

const Home: React.FC = () => {
    const { isFetching, data = [], error, fetch } = useFetch({
        method: 'get',
        url: '/api/fruit/all',
    });
    const manipulatedData: Array<object> = useMemo(() => (
        data ? data.map(({
            nutritions = { calories: 0 }, name, family, order, genus, id
        }) => ({ name, family, order, genus, id, calories: nutritions?.calories || 0 })) : []
    ), [data && data.length]);

    const fruitIdToProps: any = useMemo(() => {
        let idToProps: any = {}
        if (data) {
            data.forEach((v: any) => {
                idToProps[v.id] = { name: v.name, calories: v?.nutritions?.calories || 0 }
            })
        }
        return idToProps;
    }, [data && data.length]);

    useEffect(() => {
        fetch();
    }, []);


    const [isListLayout, setFlag] = useBoolean();
    const handleSelectLayout: (selectedId: number) => void = (selectedId) => {
        if (selectedId) {
            setFlag.off();
        } else {
            setFlag.on();
        }
    };

    const [groupBy, setGroupBy] = useState(GROUP_BY_LIST[0]);
    const { groupedData } = useDataGroupBy(manipulatedData, groupBy);

    const { jarItems, addItemInJar, removeItemInJar } = useJar();
    const handleAction = (action: string, data: any) => {
        if (action === 'add') {
            addItemInJar(data.id)
        } else if (action == 'delete') {
            removeItemInJar(data.id)
        };
    };
    const handleBulkAddItemsToJar = (items: Array<object>) => {
        items.forEach((v: any) => {
            addItemInJar(v.id)
        });
    };
    const jarItemsList: Array<any> = useMemo(() => {
        let itemsList: Array<object> = [];
        Object.entries(jarItems).forEach(([id, value]) => {
            if (value) {
                itemsList.push({
                    id,
                    name: fruitIdToProps[id]?.name,
                    calories: fruitIdToProps[id]?.calories,
                    quantity: value,
                    totalCalories: value * (fruitIdToProps[id]?.calories || 0),
                })
            }
        });
        return itemsList;
    }, [Object.keys(jarItems).length, Object.values(jarItems).reduce((acc, current) => (acc) + (current), 0)]);
    const [isDesktop] = useMediaQuery('(min-width: 1200px)');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any = useRef()
    return <Grid templateColumns={isDesktop ? 'repeat(9, 1fr)' : 'repeat(5, 1fr)'} p='4' gap='4'>
        <GridItem colSpan={5}>

            <Flex alignItems={'center'} justifyContent={'flex-end'} gap='2'>
                <Toolbar
                    setGroupBy={setGroupBy}
                    isListLayout={isListLayout}
                    handleSelectLayout={handleSelectLayout}
                />
                {!isDesktop ? (
                    <>
                        <Button ref={btnRef} size='sm' variant='outline' colorScheme='blackAlpha' onClick={onOpen}>
                            Jar: {jarItemsList.length} fruits
                        </Button>
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                            size='lg'
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Jar</DrawerHeader>
                                <DrawerBody>
                                    <JarList
                                        headData={headData}
                                        jarItemsList={jarItemsList}
                                        handleAction={handleAction}
                                    />
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : null}
            </Flex>
            <Box py='4'>
                {
                    error ? <ErrorWidget /> : (
                        isFetching ? <Loader /> : <FriutsList
                            groupBy={groupBy}
                            groupedData={groupedData}
                            handleBulkAddItemsToJar={handleBulkAddItemsToJar}
                            handleAction={handleAction}
                            headData={headData}
                            manipulatedData={manipulatedData}
                            isListLayout={isListLayout}
                        />)
                }
            </Box>
        </GridItem>
        {isDesktop ? <GridItem colSpan={4}>
            <Box borderWidth='1px' borderRadius='lg'>
                <Text fontSize='xl' px='4' py='2'>
                    <Text as='b'>Jar</Text>
                </Text>
                <Divider />
                <Box p='4'>
                    <FruitsChart jarItemsList={jarItemsList} />
                    <JarList
                        headData={headData}
                        jarItemsList={jarItemsList}
                        handleAction={handleAction}
                    />
                </Box>
            </Box>
        </GridItem> : null}
    </Grid>
};

export default Home;