import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import CheckBoxGroup from "../components/CheckBoxGroup";
import { capitalise } from "../lib/utils";

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
    <CheckBoxGroup
      checkboxes={checkboxes}
      updateCheckboxes={updateCheckboxes}
    />
  );
};

test("Group checkboxes should be populated with provided names and default to checked", () => {
  // Render the TestApp mock
  render(<TestApp />);

  // Loop through all available checkboxes to ensure all are checked
  Object.keys(initialState).map((checkboxName) => {
    const checkbox = screen.getByRole("checkbox", {
      name: capitalise(checkboxName),
    });
    expect(checkbox).toBeChecked();
  });
});

test("Checbox functionality works", () => {
  // Render the TestApp mock
  render(<TestApp />);

  // Obtain one checkbox to test click
  const checkbox = screen.getByRole("checkbox", {
    name: "Avatar",
  });

  // Uncheck the checkbox
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();

  // Re-check the checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
