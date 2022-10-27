import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from "./login";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders without crashing", () => {
  const mockLoginHandler = (userId) => {
    return {};
  };
  render(<Login handleLoginChange={mockLoginHandler} />);
  const linkElement = screen.getByText(/Please sign in/i);
  expect(linkElement).toBeInTheDocument();
});

test("On click calls handler", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Login handleLoginChange={onChange} />, container);
  });
  const submitButton = document.querySelector("#submit");
  act(() => {
    submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});
