import { TableContainer, Table as TableComponent, TableCaption, Thead, Tr, Th, Tbody, Td, IconButton, Tooltip, HStack } from "@chakra-ui/react"
import { GetIconType } from "../toggle-buttons";

export enum ColTypes {
    NUMERIC = 'numeric',
    ACTIONS_ICONS = 'actions-icons',
}
interface actionOptions {
    icon: string;
    id: string;
    renderCondition?: (data: object) => boolean;
    hint?: string;
}
interface headDataOptions {
    type?: ColTypes;
    key: string;
    label: string;
    actions?: Array<actionOptions>;
}
interface TableOptions {
    headData: Array<headDataOptions>;
    bodyData: Array<any>;
    onAction?: (id: string, data: any) => void;
    caption?: string;
}
const Table: React.FC<TableOptions> = ({
    headData,
    bodyData,
    caption,
    onAction,
}) => {

    return (
        <TableContainer 
            borderWidth='1px'
            borderRadius='lg'
        >
            <TableComponent
                variant='simple'
                size='sm'
            >
                {caption ? <TableCaption>{caption}</TableCaption> : null}
                <Thead>
                    <Tr>
                        {
                            headData.map(({ type, label }, i) => (
                                <Th isNumeric={type == ColTypes.NUMERIC} key={`head-${i}`}>
                                    {label}
                                </Th>
                            ))
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        bodyData.map((data, i) => (<Tr>
                            {headData.map(({ type, key, actions = [] }, i) => (
                                <Td isNumeric={type == ColTypes.NUMERIC} key={`body-${i}`}>{
                                    type == ColTypes.ACTIONS_ICONS ? (
                                        <HStack gap={1}>
                                            {
                                                actions.map(({ id, icon, hint }) => (id && icon ?
                                                    <Tooltip label={hint}>
                                                        <IconButton
                                                            aria-label={icon}
                                                            size={'xs'}
                                                            icon={<GetIconType iconType={icon} focusable />}
                                                            onClick={() => {
                                                                if (onAction) onAction(id, data);
                                                            }}
                                                        />
                                                    </Tooltip> : '--'))
                                            }
                                        </HStack>
                                    ) : data?.[key] || '--'
                                }</Td>
                            ))}
                        </Tr>
                        ))
                    }
                </Tbody>
            </TableComponent>
        </TableContainer>
    )
}

export default Table;