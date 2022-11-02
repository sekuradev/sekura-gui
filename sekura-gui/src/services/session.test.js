import { render, screen } from "@testing-library/react";
import axios from "axios";
import { login, getUserId } from "./session";

jest.mock("axios");

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe("login", () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  it("Returns a valid login", async () => {
    const data = {
      data: {
        refresh: "fakeRefresh",
        access: "fakeAccess",
      },
    };
    axios.post.mockImplementationOnce((x, y) => Promise.resolve(data));
    await expect(login("user", "pwd")).resolves;
    expect(global.localStorage.getItem("access")).toBe("fakeAccess");
    expect(global.localStorage.getItem("refresh")).toBe("fakeRefresh");
  });

  it("Returns an invalid login", async () => {
    const data = {
      data: {
        detail: "No active account found with the given credentials",
      },
    };
    axios.post.mockImplementationOnce((x, y) =>
      Promise.reject(new Error("Unauthorized"))
    );
    expect(global.localStorage.getItem("access")).toBe(null);
    expect(global.localStorage.getItem("refresh")).toBe(null);
  });

  it("Resolves user id for any valid jwt", async () => {
    global.localStorage.setItem(
      "access",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjY3MzYzMjU4LCJleHAiOjE5MTk4MjA0NTgsInVzZXJfaWQiOjEyMzR9.KOvfJA2m1ekWHBWjNeJmJoFhnubuM6JOeEkI17SuCWY"
    );
    let id = getUserId();
    expect(id).toBe(1234);
  });

  it("Does not resolves user id for an expired jwt", async () => {
    global.localStorage.setItem(
      "access",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjY3MzYzMjU4LCJleHAiOjE2NjczNjMyNTgsInVzZXJfaWQiOjEyMzR9._wbwB7N11moRdltkcsobO36U58glzWe_ms5aelSCVg4"
    );
    let id = getUserId();
    expect(id).toBe(null);
  });
});
