import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login by default", () => {
  render(<App />);
  const linkElement = screen.getByText(/Please sign in/i);
  expect(linkElement).toBeInTheDocument();
});
