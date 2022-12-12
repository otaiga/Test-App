import Navigation from "../components/Navigation";

// Layout for the app view
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component */}
        <div className="flex min-h-0 flex-1 flex-col bg-blue-100 ">
          <div className="flex h-16 flex-shrink-0 items-center px-4 ">
            <img className="h-8 w-auto" src="/logo.svg" alt="Test App" />
            <h1 className="ml-3 text-xl">Test App</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <Navigation />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 md:bg-white bg-blue-100 items-center justify-between">
          <img
            className="md:hidden h-8 w-auto px-4"
            src="/logo.svg"
            alt="Test App"
          />
        </div>
        {/* main components*/}
        {children}
      </div>
    </div>
  );
};

export default Layout;
