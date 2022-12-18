
type MultiSelectProps = {
    isMultiSelect: true,
    value: string[],
    onChange: (value: string[]) => void
}

type SingleSelectProps = {
    isMultiSelect?: false,
    value: string;
    onChange: (value: string) => void
}

export type SelectProps = {
    optionsList: string[]
} & ( MultiSelectProps | SingleSelectProps )

export type OptionProps = {
    option: string;
    isOptionSelected: boolean;
    onOptionClick: (option: string) => void
}
