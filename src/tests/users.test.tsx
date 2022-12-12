import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "./support";
import Users from "../pages/Users";

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
  expect(screen.getByRole("columnheader", { name: "Id" })).toBeInTheDocument();
});
