import { screen, render } from "@testing-library/react"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { countryList } from "@/consts"
import Select from "./Select"

const options = countryList.slice(0,4)

const singleSelectProps = {
    optionsList : options, 
    value: "", 
    onChange: (value: string) => {}
}

const multipleSelectProps = {
    optionsList: options,
    value: [],
    onChange:(value: string[]) => {}
}

describe("Select", ()=>{
    test("should render select component correctly", ()=>{
        render(<Select {...singleSelectProps} />)
        const selectContainer = screen.getByRole("listbox")
        expect(selectContainer).toBeInTheDocument()
    })

    test("should show list of options when clicked on select container", async() => {
        userEvent.setup()
        render(<Select {...singleSelectProps} />)
        const selectContainer = screen.getByRole("listbox")
        await userEvent.click(selectContainer)

        const optionsContainer = screen.getByRole("list")
        expect(optionsContainer).toBeInTheDocument()
    })

    test("should show a list of length four in the options container", async()=>{
        userEvent.setup()
        render(<Select {...singleSelectProps} />)
        const selectContainer = screen.getByRole("listbox")
        await userEvent.click(selectContainer)

        const listElements = screen.getAllByRole("listitem")
        expect(listElements).toHaveLength(options.length)
        expect(listElements[0]).not.toHaveClass("_activeList_51966b _hoveredList_51966b")
    })

    describe("Single Select", ()=>{
        test("on option click, the value of option must be visible in the select box", async()=>{
            userEvent.setup()
            const onChangeMockFunction = vi.fn()
            const { rerender } = render(<Select {...singleSelectProps} onChange={onChangeMockFunction} />)
            const selectContainer = screen.getByRole("listbox")
            await userEvent.click(selectContainer)

            const listElements = screen.getAllByRole("listitem")
            await userEvent.click(listElements[0])
            expect(onChangeMockFunction).toHaveBeenCalledWith("Afghanistan")
            expect(onChangeMockFunction).toHaveBeenCalledTimes(1)
            
            rerender(<Select {...singleSelectProps} onChange={onChangeMockFunction} value="Afghanistan" />)
            expect(selectContainer.firstChild).toHaveTextContent("Afghanistan")

            await userEvent.click(listElements[1])
            expect(onChangeMockFunction).toHaveBeenCalledWith("Albania")
            expect(onChangeMockFunction).toHaveBeenCalledTimes(2)

            rerender(<Select {...singleSelectProps} onChange={onChangeMockFunction} value="Albania" />)

            expect(listElements[0]).not.toHaveClass("_activeList_51966b")
            expect(listElements[1]).toHaveClass("_activeList_51966b")
            expect(selectContainer.firstChild).toHaveTextContent("Albania")

        })
    })
    describe("Multiple Select", ()=>{
        test("on any option click, the option should be visible in the select box", async()=>{
            userEvent.setup()
            const onChangeMockFunction = vi.fn()
            const { rerender } = render(<Select isMultiSelect {...multipleSelectProps} onChange={onChangeMockFunction} />)
            const selectContainer = screen.getByRole("listbox")
            await userEvent.click(selectContainer)

            const listElements = screen.getAllByRole("listitem")
            // clicking on the first option
            await userEvent.click(listElements[0])
            expect(onChangeMockFunction).toHaveBeenCalledWith(["Afghanistan"])
            expect(onChangeMockFunction).toHaveBeenCalledTimes(1)

            rerender(<Select isMultiSelect {...multipleSelectProps} value={["Afghanistan"]} onChange={onChangeMockFunction} />)

            // clicking on the second option
            await userEvent.click(listElements[1])
            expect(onChangeMockFunction).toHaveBeenCalledWith(["Afghanistan", "Albania"])
            expect(onChangeMockFunction).toHaveBeenCalledTimes(2)

            rerender(<Select isMultiSelect {...multipleSelectProps} value={["Afghanistan","Albania"]} onChange={onChangeMockFunction} />)

            const selectedOptions = screen.getAllByRole("button")
            expect(selectedOptions).toHaveLength(2)
            
            // if selected option Afghanistan is clicked , it will not be in the select box
            await userEvent.click(listElements[0])
            expect(onChangeMockFunction).toHaveBeenCalledWith(["Albania"])
            expect(onChangeMockFunction).toHaveBeenCalledTimes(3)

            rerender(<Select isMultiSelect {...multipleSelectProps} value={["Albania"]} onChange={onChangeMockFunction} />)
            const optionSelected = screen.getByRole("button")
            expect(optionSelected.firstChild).toHaveTextContent("Albania")
        })
    })
})