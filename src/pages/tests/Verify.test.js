import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";

import App from "../../App";
import blogApi from "../../api/blogApi";

jest.mock("../../api/blogApi");

describe("Verify Page", () => {
  test("renders error", async () => {
    blogApi.post.mockRejectedValueOnce({ status: 404 });
    const history = createMemoryHistory();
    window.history.pushState({}, "Test Verify", "/verify");
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/404: not found/i)).toBeInTheDocument();
    });
  });

  test("renders success", async () => {
    blogApi.post.mockResolvedValueOnce({
      status: 200,
      success: true,
    });
    const history = createMemoryHistory();
    window.history.pushState({}, "Test Verify", "/verify/mocktoken");
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(
        screen.getByText(/Thank you for verifying your user!/i)
      ).toBeInTheDocument();
    });
  });

  test("goes home on button press", async () => {
    blogApi.post.mockResolvedValueOnce({
      status: 200,
      success: true,
    });
    const history = createMemoryHistory();
    window.history.pushState({}, "Test Verify", "/verify/mocktoken");
    await waitFor(() => {
      render(
        <Router history={history}>
          <App />
        </Router>
      );
    });
    fireEvent.click(screen.getByText(/complete profile/i));
    await waitFor(() => {
      expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
  });
});
