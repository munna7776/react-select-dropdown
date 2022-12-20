import { screen, render } from "@testing-library/react"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import Option from "./Option"

describe("Option", ()=>{
    test("on hover of list, the tick should be shown in the circle", async()=>{
        userEvent.setup()
        const mockOptionClick = vi.fn()
        render(<Option option="India" isOptionSelected={false} onOptionClick={mockOptionClick} />)
        
        const list = screen.getByRole("listitem")
        expect(list).toBeInTheDocument()

        await userEvent.hover(list)
        expect(list).toHaveClass("_hoveredList_51966b")

        await userEvent.unhover(list)
        expect(list).not.toHaveClass("_hoveredList_51966b")

    })

    test("onOptionClick should be called on click of list and colorfulcheckbox should be shown in the list", async()=>{
        userEvent.setup()
        const mockOptionClick = vi.fn()
        const {rerender} = render(<Option option="India" isOptionSelected={false} onOptionClick={mockOptionClick} />)
        
        const list = screen.getByRole("listitem")
        expect(list).not.toHaveClass("_activeList_51966b")

        await userEvent.click(list)

        expect(mockOptionClick).toHaveBeenCalledWith("India")
        expect(mockOptionClick).toHaveBeenCalledTimes(1)

        rerender(<Option option="India" isOptionSelected={true} onOptionClick={mockOptionClick}/>)

        expect(list).toHaveClass("_activeList_51966b")
    })
})