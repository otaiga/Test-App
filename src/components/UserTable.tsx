import DisplayTable from "./DisplayTable";

// Return custom field for certain field names
const formattedFields = (
  key: string,
  record: { [key: string]: number | string }
) => {
  switch (key) {
    case "name":
      return (
        <td
          key={key}
          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
        >
          {record.first_name} {record.last_name}
        </td>
      );
    case "avatar":
      return (
        <td
          key={key}
          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={record[key] as string}
                alt="User avatar"
              />
            </div>
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

// Display User Table
const UserTable = ({
  data,
  checkboxes,
}: {
  data: { [key: string]: number | string }[];
  checkboxes: {
    [key: string]: boolean;
  };
}) => {
  return DisplayTable(data, checkboxes, formattedFields);
};

export default UserTable;
