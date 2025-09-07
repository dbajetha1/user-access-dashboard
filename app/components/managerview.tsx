export default function managerview() {
  return (
    <section id="manager-view" className="view-section hidden">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Team Access Overview</h2>
                
                {/* Team Access Summary Table */}
                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm mb-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">Employee Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AD Groups</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Okta Apps</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GCP Projects</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">Risk</th>
                                </tr>
                            </thead>
                            <tbody id="team-summary-table-body" className="bg-white divide-y divide-gray-200">
                                {/* Employee rows will be dynamically added here by JavaScript */}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* D3.js Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Access Distribution</h3>
                    <div id="chart-container" className="w-full"></div>
                    <div id="chart-legend" className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium"></div>
                </div>

                {/* Suggested Actions & Insights */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Suggested Actions & Insights</h3>
                    <ul className="space-y-3" id="manager-insights-list">
                        {/* Insights will be dynamically added here */}
                    </ul>
                </div>
            </section>
  );
}