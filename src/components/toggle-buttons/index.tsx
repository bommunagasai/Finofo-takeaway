import { AddIcon, DragHandleIcon, HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";

interface ButtonOptions {
    icon: string;
    isSelected?: boolean;
}
interface ToggleButtonsOptions {
    buttons: Array<ButtonOptions>;
    isDisabled?: boolean;
    onSelect?: (selectedId: number) => void;
}

interface GetIconTypeOptions {
    iconType?: string;
    color?: string;
    bg?: string;
    focusable?: boolean,
}
export const GetIconType: React.FC<GetIconTypeOptions> = ({ iconType, color, bg, focusable }) => {
    const iconProps = {
        color,
        bg,
        focusable
    }
    switch (iconType) {
        case 'list':
            return <HamburgerIcon {...iconProps} />;
        case 'grid':
            return <DragHandleIcon {...iconProps} />;
        case 'add':
            return <AddIcon {...iconProps} />;
        default:
            return <MinusIcon {...iconProps} />;
    }
}
const ToggleButtons: React.FC<ToggleButtonsOptions> = ({ buttons, isDisabled, onSelect }) => {


    return (
        <ButtonGroup size='sm' isAttached variant='outline' isDisabled={isDisabled}>
            {
                buttons.map(({ icon, isSelected }, i) => {
                    return (
                        <IconButton
                            aria-label={icon}
                            onClick={() => onSelect && onSelect(i)}
                            icon={<GetIconType iconType={icon} color={isSelected ? 'gray.500' : undefined} />} bg={isSelected ? 'gray.50' : undefined} />
                    )
                })
            }
        </ButtonGroup>)
};

export default ToggleButtons