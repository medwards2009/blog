import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../index";

describe("Nav Bar", () => {
  test("renders nav", () => {
    render(<Nav />);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("sign up click opens sign up form", () => {
    render(<Nav />);
    fireEvent.click(screen.getByText(/sign up/i));

    expect(screen.queryByPlaceholderText(/first name/i)).toBeInTheDocument();
  });

  test("click outside sign up form closes the form", () => {
    const dom = render(<Nav />);
    fireEvent.click(screen.getByText(/sign up/i));
    fireEvent.click(dom.container.querySelector("#modal"));
    expect(
      screen.queryByPlaceholderText(/first name/i)
    ).not.toBeInTheDocument();
  });
});
