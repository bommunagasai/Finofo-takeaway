import { Flex, Text } from "@chakra-ui/react"
import Select from "../../../components/select"
import ToggleButtons from "../../../components/toggle-buttons"
import { GROUP_BY_LIST } from "../constants";

interface ToolbarOptions {
    setGroupBy: (value: string) => void;
    isListLayout: boolean;
    handleSelectLayout: (selectedId: number) => void;
    isDesktop: boolean;
};

const Toolbar: React.FC<ToolbarOptions> = ({ setGroupBy, isListLayout, handleSelectLayout, isDesktop }) => {

    return <Flex minWidth='max-content' alignItems='center' justifyContent={'flex-end'} gap='2'>
        <Text color='gray.400'>Group By:</Text>
        <Select
            options={GROUP_BY_LIST.map(v => ({ label: v.toUpperCase(), value: v }))}
            onSelect={(e) => setGroupBy(e.target.value)}
        />
        {isDesktop ? <ToggleButtons
            buttons={[
                { icon: 'list', isSelected: isListLayout },
                { icon: 'grid', isSelected: !isListLayout },
            ]}
            onSelect={handleSelectLayout}
        /> : null}

    </Flex>
};

export default Toolbar;