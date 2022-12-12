import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import CheckBoxGroup from "../components/CheckBoxGroup";
import UserTable from "../components/UserTable";
import { userData } from "./support";

// Initial state for the checkboxes
const initialState = {
  avatar: true,
  name: true,
  email: true,
  id: true,
};

// Create JSX component to implement checkbox group with useState
const TestApp = () => {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>(
    initialState
  );

  const updateCheckboxes = (name: string, value: boolean) => {
    const currentBoxes = { ...checkboxes };
    currentBoxes[name] = !value;
    setCheckboxes(currentBoxes);
  };

  return (
    <>
      <CheckBoxGroup
        checkboxes={checkboxes}
        updateCheckboxes={updateCheckboxes}
      />
      <UserTable checkboxes={checkboxes} data={userData} />
    </>
  );
};

test("Checkbox functionality impacts display table", () => {
  // Render the TestApp mock
  render(<TestApp />);

  // ensure both rows and columns are equal to 4
  expect(screen.getAllByRole("columnheader").length).toEqual(4);
  expect(screen.getAllByRole("row").length).toEqual(4);

  // Obtain one checkbox to test click
  const checkbox = screen.getByRole("checkbox", {
    name: "Avatar",
  });

  // Uncheck the checkbox
  fireEvent.click(checkbox);

  // expect Avatar field to not be in the headers
  expect(checkbox).not.toBeChecked();
  expect(screen.getAllByRole("columnheader").length).toEqual(3);
  expect(
    screen.queryByRole("columnheader", { name: "Avatar" })
  ).not.toBeInTheDocument();

  // Re-check the checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getAllByRole("columnheader").length).toEqual(4);
  expect(
    screen.getByRole("columnheader", { name: "Avatar" })
  ).toBeInTheDocument();
});
