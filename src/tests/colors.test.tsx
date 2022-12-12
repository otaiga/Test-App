import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server } from "./support";
import Colors from "../pages/Colors";

// Mock server for api calls
beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test("Color page loads", async () => {
  // // Render the Colors page
  render(<Colors />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getAllByRole("columnheader").length).toEqual(4);
  expect(screen.getAllByRole("row").length).toEqual(4);
  expect(
    screen.getByRole("columnheader", { name: "Color" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "Pantone" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "Name" })
  ).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Id" })).toBeInTheDocument();
});
