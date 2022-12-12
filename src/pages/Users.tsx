import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import CheckBoxGroup from "../components/CheckBoxGroup";
import { UserData, getApiData } from "../lib/apiClient";
import ErrorNotification from "../components/ErrorNotification";
import Spinner from "../components/Spinner";

// Users page to display from API results in table format
const Users = () => {
  // Allow for error states
  const [error, setError] = useState<boolean>(false);
  // Allow wait for load from api
  const [loading, setLoading] = useState(false);
  // set state for users and checkboxes
  const [users, setUsers] = useState<UserData[]>([]);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    avatar: true,
    name: true,
    email: true,
    id: true,
  });

  // Update the checkboxes with callback from CheckBoxGroup
  const updateCheckboxes = (name: string, value: boolean) => {
    const currentBoxes = { ...checkboxes };
    currentBoxes[name] = !value;
    setCheckboxes(currentBoxes);
  };

  // Retrieve data from endpoint
  const retrieveData = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const dataResponse = await getApiData("users", signal);
      setUsers(dataResponse.data as UserData[]);
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setError(true);
      setLoading(false);
    }
    return () => {
      // cancel the request before the component unmounts
      controller.abort();
    };
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <main className="flex-1 justify-center items-center text-center ">
      <div className="py-6 px-6">
        <div className="flex justify-between mx-auto max-w-5xl">
          <CheckBoxGroup
            checkboxes={checkboxes}
            updateCheckboxes={updateCheckboxes}
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden md:rounded-lg">
                  <UserTable data={users} checkboxes={checkboxes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <ErrorNotification
          title="Error"
          description="Unable to populate user data"
        />
      )}
      {loading && <Spinner />}
    </main>
  );
};

export default Users;
