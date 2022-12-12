import { capitalise } from "../lib/utils";

// Checkbox group component expects checkbox labels and callback function
const CheckboxGroup = ({
  checkboxes,
  updateCheckboxes,
}: {
  checkboxes: { [key: string]: boolean };
  updateCheckboxes: (name: string, value: boolean) => void;
}) => {
  return (
    <div className="flex ring-1 ring-gray-400 p-3 w-full justify-between">
      {Object.entries(checkboxes).map(([name, value], i) => {
        return (
          <div key={i} className="flex justify-between px-4">
            <label className="flex">
              <input
                name={name}
                type="checkbox"
                checked={value}
                onChange={() => updateCheckboxes(name, value)}
              />
              <p className="ml-2">{capitalise(name)}</p>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
