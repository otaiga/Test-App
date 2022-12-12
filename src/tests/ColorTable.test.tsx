import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import CheckBoxGroup from "../components/CheckBoxGroup";
import ColorTable from "../components/ColorTable";
import { colorData } from "./support";

// Initial state for the checkboxes
const initialState = {
  color: true,
  pantone: true,
  name: true,
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
      <ColorTable checkboxes={checkboxes} data={colorData} />
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
    name: "Pantone",
  });

  // Uncheck the checkbox
  fireEvent.click(checkbox);

  // expect Avatar field to not be in the headers
  expect(checkbox).not.toBeChecked();
  expect(screen.getAllByRole("columnheader").length).toEqual(3);
  expect(
    screen.queryByRole("columnheader", { name: "Pantone" })
  ).not.toBeInTheDocument();

  // Re-check the checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getAllByRole("columnheader").length).toEqual(4);
  expect(
    screen.getByRole("columnheader", { name: "Pantone" })
  ).toBeInTheDocument();
});
