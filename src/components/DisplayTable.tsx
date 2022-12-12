import { capitalise } from "../lib/utils";

// Basic table maps over data and field customisations provided
const BasicTable = (
  data: { [key: string]: number | string }[],
  checkboxes: { [key: string]: boolean },
  formattedFields: (
    key: string,
    record: {
      [key: string]: string | number;
    }
  ) => JSX.Element
) => {
  const keys = Object.keys(checkboxes);
  return (
    <table className="min-w-full text-left">
      <thead>
        <tr>
          {Object.entries(checkboxes).map(([name, checked], i) => {
            return (
              checked && (
                <th
                  key={i}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                >
                  {capitalise(name)}
                </th>
              )
            );
          })}
        </tr>
      </thead>
      <tbody>
        {/* Map over the array entires returned from api */}
        {data.map((record) => (
          <tr key={record.id}>
            {/* Map over what we need to pick as row entries from each entry in the data array */}
            {keys.map((key) => {
              return checkboxes[key] && formattedFields(key, record);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicTable;
