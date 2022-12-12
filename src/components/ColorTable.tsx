import { capitalise } from "../lib/utils";

// Return custom field for certain field names
const formattedEntry = (
  key: string,
  record: { [key: string]: number | string }
) => {
  switch (key) {
    case "pantone":
      return (
        <td
          key={key}
          className="whitespace-nowrap px-3 py-4 text-sm text-gray-900"
        >
          {record.pantone_value}
        </td>
      );
    case "color":
      return (
        <td
          key={key}
          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
        >
          <div className="flex items-center">
            <div
              className="h-10 w-10 flex-shrink-0"
              style={{ background: record[key] }}
            ></div>
          </div>
        </td>
      );
    default:
      return (
        <td
          key={key}
          className="whitespace-nowrap px-3 py-4 text-sm text-gray-900"
        >
          {record[key]}
        </td>
      );
  }
};

// Display Color Table
const ColorTable = ({
  data,
  keys,
}: {
  data: { [key: string]: number | string }[];
  keys: string[];
}) => {
  return (
    <table className="min-w-full text-left">
      <thead>
        <tr>
          {keys.map((name, i) => {
            return (
              <th
                key={i}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
              >
                {capitalise(name)}
              </th>
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
              return formattedEntry(key, record);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ColorTable;
