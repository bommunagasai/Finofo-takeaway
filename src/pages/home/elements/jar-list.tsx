import React from "react"
import Table, { ColTypes } from "../../../components/table"
import { GROUP_BY_LIST } from "../constants"

interface JarListOptions {
    headData: Array<any>;
    jarItemsList: Array<any>;
    handleAction: (id: string, data: any) => void;
}
const JarList: React.FC<JarListOptions> = ({
    headData,
    jarItemsList,
    handleAction,
}) => {

    return (
        <Table
            headData={[...headData.filter(v => ([...GROUP_BY_LIST, 'action'].indexOf(v.key) < 0)),
            {
                key: 'quantity',
                label: 'Qty',
                type: ColTypes.NUMERIC,
            },
            {
                key: 'totalCalories',
                label: 'Total Calories',
                type: ColTypes.NUMERIC,
            },
            {
                label: 'Action',
                key: 'actions',
                type: ColTypes.ACTIONS_ICONS,
                actions: [{
                    icon: 'delete',
                    id: 'delete',
                    hint: 'Remove from Jar',
                },]
            }
            ]}
            bodyData={jarItemsList}
            onAction={handleAction}
            caption={`Total calories in Jar: ${jarItemsList.reduce((acc, current) => (acc) + (current.totalCalories), 0)}`}
        />
    )
}

export default JarList;