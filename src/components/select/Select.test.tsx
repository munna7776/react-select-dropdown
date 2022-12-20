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
    test("should render single select component correctly", ()=>{
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
        const onChangeMockFunction = vi.fn()
        render(<Select {...singleSelectProps} onChange={onChangeMockFunction} />)
        const selectContainer = screen.getByRole("listbox")
        await userEvent.click(selectContainer)

        const listElements = screen.getAllByRole("listitem")
        expect(listElements).toHaveLength(options.length)

        await userEvent.click(listElements[0])
        expect(onChangeMockFunction).toHaveBeenCalledWith("Afghanistan")
        expect(onChangeMockFunction).toHaveBeenCalledTimes(1)
    })
    // describe("Single Select", ()=>{

    // })
    // describe("Multiple Select", ()=>{
        
    // })
})