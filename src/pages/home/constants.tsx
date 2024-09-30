import { ColTypes } from "../../components/table";

const headData = [
    {
        label: 'Name',
        key: 'name',
    },
    {
        label: 'Family',
        key: 'family'
    },
    {
        label: 'Order',
        key: 'order'
    },
    {
        label: 'Genus',
        key: 'genus'
    },
    {
        label: 'Calories',
        key: 'calories',
        type: ColTypes.NUMERIC
    },
    {
        label: 'Action',
        key: 'action',
        type: ColTypes.ACTIONS_ICONS,
        actions: [
            {
                icon: 'add',
                id: 'add',
                hint: 'Add to Jar',
            },
        ]
    }
]
const GROUP_BY_LIST = ['none', 'family', 'order', 'genus'];

export {
    headData,
    GROUP_BY_LIST
}