import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { failServer, server } from "./support";
import Users from "../pages/Users";

describe("Functioning api calls", () => {
  // Mock server for api calls
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  test("Users page loads", async () => {
    // // Render the Colors page
    render(<Users />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    expect(screen.getAllByRole("columnheader").length).toEqual(4);
    expect(screen.getAllByRole("row").length).toEqual(4);
    expect(
      screen.getByRole("columnheader", { name: "Avatar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Email" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Id" })
    ).toBeInTheDocument();
  });
});

describe("Failing api calls", () => {
  // Mock server for api calls
  beforeAll(() => {
    failServer.listen();
  });

  afterAll(() => {
    failServer.close();
  });

  test("Users page has error displayed", async () => {
    // // Render the Colors page
    render(<Users />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    expect(screen.getByLabelText(/error/i)).toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toEqual(1);
  });
});
