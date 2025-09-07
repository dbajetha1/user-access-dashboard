export default function networkgraph() {
  return (
        <section id="network-graph-view" className="view-section hidden">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Access Network Graph</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div id="graph-container" className="w-full"></div>
                <div id="legend-container" className="flex flex-wrap justify-center gap-6 mt-8"></div>
            </div>
        </section>
  );
}