import { useEffect, useState } from "react";
import CheckBoxGroup from "../components/CheckBoxGroup";
import ColorTable from "../components/ColorTable";
import { ColourData, getApiData } from "../lib/apiClient";

// Users page to display from API results in table format
const Users = () => {
  // Allow wait for load from api
  const [loading, setLoading] = useState(false);
  // Set color state and checkboxes
  const [colors, setColors] = useState<ColourData[]>([]);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    color: true,
    pantone: true,
    name: true,
    id: true,
  });

  // Update the checkboxes
  const updateCheckboxes = (name: string, value: boolean) => {
    const currentBoxes = { ...checkboxes };
    currentBoxes[name] = !value;
    setCheckboxes(currentBoxes);
  };

  // Retrieve data from endpoint
  const retrieveData = async () => {
    setLoading(true);
    try {
      const dataResponse = await getApiData("colors");
      setColors(dataResponse.data as ColourData[]);
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
    }
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
                  <ColorTable data={colors} checkboxes={checkboxes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <div aria-label="loading">Loading</div>}
    </main>
  );
};

export default Users;
