import { render, screen } from "@testing-library/react";
import axios from "axios";
import { login, getUserId, logout, refresh } from "./session";

jest.mock("axios");

describe("login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Returns a valid login", async () => {
    const data = {
      status: 200,
      data: {
        access: "fakeAccess",
        refresh: "fakeRefresh",
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(login("user", "pwd")).resolves;

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("access")).toBe("fakeAccess");
    expect(localStorage.getItem("refresh")).toBe("fakeRefresh");
  });

  it("Returns an invalid login", async () => {
    const data = {
      data: {
        status: 401,
        detail: "No active account found with the given credentials",
      },
    };
    axios.post.mockImplementationOnce(() => Promise.reject(data));

    await expect(login("user", "pwd")).rejects;

    expect(localStorage.getItem("access")).toBeNull();
    expect(localStorage.getItem("refresh")).toBeNull();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("Resolves user id for any valid jwt", async () => {
    localStorage.setItem(
      "access",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjY3MzYzMjU4LCJleHAiOjE5MTk4MjA0NTgsInVzZXJfaWQiOjEyMzR9.KOvfJA2m1ekWHBWjNeJmJoFhnubuM6JOeEkI17SuCWY"
    );
    let id = getUserId();
    expect(id).toBe(1234);
  });

  it("Does not resolves user id for an expired jwt", async () => {
    localStorage.setItem(
      "access",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjY3MzYzMjU4LCJleHAiOjE2NjczNjMyNTgsInVzZXJfaWQiOjEyMzR9._wbwB7N11moRdltkcsobO36U58glzWe_ms5aelSCVg4"
    );
    let id = getUserId();
    expect(id).toBe(null);
  });

  it("Logout without token", () => {
    logout();

    expect(localStorage.getItem("access")).toBeNull();
    expect(localStorage.getItem("refresh")).toBeNull();
  });

  it("Logout with token", () => {
    localStorage.setItem("access", "old.access.token");
    localStorage.setItem("refresh", "old.refresh.token");

    logout();

    expect(localStorage.getItem("access")).toBeNull();
    expect(localStorage.getItem("refresh")).toBeNull();
  });

  it("Refresh session token", async () => {
    localStorage.setItem("access", "old.access.token");
    localStorage.setItem("refresh", "old.refresh.token");
    const data = {
      data: {
        access: "new.access.token",
        refresh: "new.refresh.token",
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(refresh()).resolves;

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("access")).toBe("new.access.token");
    expect(localStorage.getItem("refresh")).toBe("new.refresh.token");
  });

  it("Refresh session token do not send access token", async () => {
    const data = {
      data: {
        refresh: "new.refresh.token",
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(refresh()).resolves;

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("access")).toBeNull();
    expect(localStorage.getItem("refresh")).toBe("new.refresh.token");
  });

  it("Refresh session token invalid", async () => {
    localStorage.setItem("refresh", "old.refresh.token");
    const data = {
      status: 401,
      data: {
        detail: "Token is invalid or expired",
        code: "token_not_valid",
      },
    };
    axios.post.mockImplementationOnce(() => Promise.reject(data));

    await expect(refresh()).rejects;

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("access")).toBeNull();
    expect(localStorage.getItem("refresh")).toBe("old.refresh.token");
  });
});
