import { screen, render } from "@testing-library/react"
import App from "./App"

describe('App', ()=>{
    test("should render App component correctly", () => {
        render(<App />)
        const firstHeadingElement = screen.getByRole("heading", {name: /single select/i})
        expect(firstHeadingElement).toBeInTheDocument()
    })
})