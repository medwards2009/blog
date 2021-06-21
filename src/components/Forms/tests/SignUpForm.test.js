import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SignUpForm } from "../index";
import blogApi from "../../../api/blogApi";
import { accountExists, successfullSubmit } from "./testData";

jest.mock("../../../api/blogApi");

describe("Sign up form", () => {
  test("renders", () => {
    render(<SignUpForm />);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("doen't submit invalid form", () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.queryByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/first name/i)).toHaveStyle(
      "border-color: red"
    );
  });

  test("displays Error Screen when email entered with existing account", async () => {
    blogApi.post.mockRejectedValueOnce(accountExists);
    render(<SignUpForm />);
    fireEvent.change(screen.queryByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "johnsmith@gmail.com" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/password/i), {
      target: { value: 123456 },
    });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error: An account with email johnsmith@gmail.com already exists"
        )
      ).toBeInTheDocument();
    });
  });

  test("start over button resets the page", async () => {
    blogApi.post.mockRejectedValueOnce(accountExists);
    render(<SignUpForm />);
    fireEvent.change(screen.queryByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "johnsmith@gmail.com" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/password/i), {
      target: { value: 123456 },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText(/submit/i));
    });

    fireEvent.click(screen.getByText(/start over/i));

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/first name/i)).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/first name/i)).toHaveValue("");
    });
  });

  test("form successfully submitted", async () => {
    blogApi.post.mockResolvedValueOnce(successfullSubmit);
    render(<SignUpForm />);
    fireEvent.change(screen.queryByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "johnsmith@gmail.com" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/password/i), {
      target: { value: 123456 },
    });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  test("handleBlur function adds border colors as necessary", () => {
    render(<SignUpForm />);
    fireEvent.blur(screen.queryByPlaceholderText(/first name/i));
    expect(screen.queryByPlaceholderText(/first name/i)).toHaveStyle(
      "border-color: red"
    );
    fireEvent.change(screen.queryByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.blur(screen.queryByPlaceholderText(/first name/i));
    expect(screen.queryByPlaceholderText(/first name/i)).not.toHaveStyle(
      "border-color: red"
    );
  });
});
