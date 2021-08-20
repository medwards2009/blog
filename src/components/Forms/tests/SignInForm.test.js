import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SignInForm } from "../index";
import blogApi from "../../../api/blogApi";
import {
  unsuccessfullSignIn,
  successfullSignIn,
  unverifiedAccount,
} from "./testData";

jest.mock("../../../api/blogApi");
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Sign up form", () => {
  test("renders", () => {
    render(<SignInForm />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test("doen't submit invalid form", () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.queryByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/email/i)).toHaveStyle(
      "border-color: red"
    );
  });

  test("start over button resets the page", async () => {
    blogApi.post.mockRejectedValueOnce(unsuccessfullSignIn);
    render(<SignInForm />);
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
      expect(screen.queryByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/email/i)).toHaveValue("");
    });
  });

  test("form successfully submitted", async () => {
    blogApi.post.mockResolvedValueOnce(successfullSignIn);
    const closeForm = jest.fn();
    render(<SignInForm closeForm={closeForm} />);
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "johnsmith@gmail.com" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/password/i), {
      target: { value: 123456 },
    });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(closeForm).toHaveBeenCalled();
    });
  });

  test("handleBlur function adds border colors as necessary", () => {
    render(<SignInForm />);
    fireEvent.blur(screen.queryByPlaceholderText(/email/i));
    expect(screen.queryByPlaceholderText(/email/i)).toHaveStyle(
      "border-color: red"
    );
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "John@test.com" },
    });
    fireEvent.blur(screen.queryByPlaceholderText(/email/i));
    expect(screen.queryByPlaceholderText(/email/i)).not.toHaveStyle(
      "border-color: red"
    );
  });

  test("unverified account displays correct error message", async () => {
    blogApi.post.mockRejectedValueOnce(unverifiedAccount);
    render(<SignInForm />);
    fireEvent.change(screen.queryByPlaceholderText(/email/i), {
      target: { value: "johnsmith@gmail.com" },
    });
    fireEvent.change(screen.queryByPlaceholderText(/password/i), {
      target: { value: 123456 },
    });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/please/i)).toBeInTheDocument();
    });
  });
});
