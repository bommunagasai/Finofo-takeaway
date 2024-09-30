import { ListItem, OrderedList } from "@chakra-ui/react"
import React, { ReactElement } from "react"

interface ListOptions {
    list: Array<ReactElement>
};
const List: React.FC<ListOptions> = ({ list }) => {
    return <OrderedList>
        {list.map((el) => <ListItem mb='2' borderBottom={'1px'} borderColor={'gray.100'}>{el}</ListItem>)}
    </OrderedList>
}

export default List;