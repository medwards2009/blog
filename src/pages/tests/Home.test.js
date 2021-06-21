import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../Home";

describe("Home Page", () => {
  test("renders", () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
