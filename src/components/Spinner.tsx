const Spinner = () => {
  return (
    <div
      aria-label="loading"
      className="inline-block px-4 pt-5 pb-4 overflow-hidden align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-4 sm:align-middle sm:max-w-lg sm:p-6"
    >
      <div className="flex justify-center">
        <div
          className="animate-spin inline-block w-[120px] h-[120px] border-8 rounded-full text-blue-300 border-t-blue-500"
          role="status"
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
