export default function Navbar() {
  return (
    <>
    <nav className="w-full bg-white shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
    {/* Left Side: Logo / Title */}
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Access Dashboard
      </h1>
      <p className="text-gray-500 text-sm">
        View your permissions or manage your Team's access.
      </p>
    </div>

    {/* Right Side: Navigation Buttons */}
    <div className="flex items-center space-x-3 mt-4 md:mt-0">
      <button
        id="user-view-btn"
        className="px-5 py-2 rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
      >
        User View
      </button>
      <button
        id="manager-view-btn"
        className="px-5 py-2 rounded-full font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all shadow-sm"
      >
        Manager View
      </button>
      <button
        id="network-view-btn"
        className="px-5 py-2 rounded-full font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all shadow-sm"
      >
        Network Graph
      </button>
    </div>
    </nav>
    </>
  );
}