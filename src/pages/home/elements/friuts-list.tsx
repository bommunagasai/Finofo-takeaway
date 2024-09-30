import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Table from "../../../components/table";
import { GROUP_BY_LIST } from "../constants";
import { GetIconType } from "../../../components/toggle-buttons";
import List from "../../../components/list";

interface GetListItemOptions {
    data: any;
    handleAction: (id: string, data: any) => void;
}
const GetListItem: React.FC<GetListItemOptions> = ({ data, handleAction }) => {
    return <HStack gap='2' pb='2'>
        <Text>{data.name}</Text>
        <Badge>Calories: {data.calories}</Badge>
        <Tooltip label='Add to Jar'>
            <IconButton
                size='xs'
                as='span'
                aria-label={'add'}
                icon={<GetIconType iconType={'add'} />}
                onClick={(e) => {
                    e.stopPropagation();
                    handleAction('add', data);
                }}
            />
        </Tooltip>
    </HStack>
}

interface FriutsListOptions {
    groupBy: string;
    groupedData: object;
    headData: Array<any>;
    manipulatedData: Array<any>;
    handleAction: (id: string, data: any) => void;
    handleBulkAddItemsToJar: (items: Array<object>) => void;
    isListLayout: boolean;
};

const FriutsList: React.FC<FriutsListOptions> = ({
    groupBy,
    groupedData,
    handleBulkAddItemsToJar,
    handleAction,
    headData,
    manipulatedData,
    isListLayout,
}) => {
    return (
        GROUP_BY_LIST.indexOf(groupBy) > 0 ? (<Accordion>
            {Object.entries(groupedData).map(([key, value]) => (
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                <HStack gap='2'>
                                    <Text>{key}</Text>
                                    <Tooltip label={`Add this ${groupBy} to Jar`}>
                                        <IconButton
                                            size='xs'
                                            as='span'
                                            aria-label={'add'}
                                            icon={<GetIconType iconType={'add'} />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBulkAddItemsToJar(value);
                                            }}
                                        />
                                    </Tooltip>
                                </HStack>
                                <HStack gap='2' fontSize='sm'>
                                    <Text color='gray.400'>Friuts:</Text>
                                    <Text>{value.length}</Text>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {
                            isListLayout ? <Box borderWidth='1px' borderRadius='lg' py='4' px='6'>
                                <List list={value.map((d: any) => (<GetListItem data={d} handleAction={handleAction} />))} />
                            </Box>
                                : <Table
                                    headData={headData.filter(v => v.key != groupBy)}
                                    bodyData={value}
                                    onAction={handleAction}
                                />
                        }
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
        ) : (
            isListLayout ? <Box borderWidth='1px' borderRadius='lg' py='4' px='6'>
                <List list={manipulatedData.map(d => (<GetListItem data={d} handleAction={handleAction} />))} />
            </Box>
                : <Table
                    headData={headData}
                    bodyData={manipulatedData}
                    onAction={handleAction}
                />
        )
    )
}

export default FriutsList;