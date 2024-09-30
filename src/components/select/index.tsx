import { Select as SelectComponent } from '@chakra-ui/react';

interface OptionOptions {
    label: string;
    value: string;
}
interface SelectOptions {
    options: Array<OptionOptions>;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectOptions> = ({ options, onSelect }) => {

    return (
        <SelectComponent
            size='sm'
            onChange={onSelect}
            width={'max-content'}
        >
            {options.map(({ label, value }, i) => (
                <option value={value}>{label}</option>
            ))}
        </SelectComponent>
    );
};

export default Select;