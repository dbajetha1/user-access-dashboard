// "use client";
// import { User } from "../types";
// import DOMPurify from "dompurify";
// export default function Userview({user}: {user: User}) {
//     console.log(user.name);
//     const accessCounts = {
//                 'AD Groups': user.access.adGroups.length,
//                 'Okta Apps': user.access.oktaApps.length,
//                 'GCP Projects': user.access.gcpProjects.length,
//             };
//     let htmlcard = ""
//     for (const [key, value] of Object.entries(accessCounts)) {
//                 const card = `<div class="bg-gray-100 rounded-2xl p-6 shadow-sm"><h3 class="text-sm font-medium text-gray-500 uppercase">${key}</h3><p class="mt-2 text-4xl font-bold text-gray-900">${value}</p></div>`;
//                 htmlcard += card;
//             }
//     htmlcard = DOMPurify.sanitize(htmlcard);
//     let detailsContainer = ""
//     const renderList = (title : string, items:string[]) => {
//         if (items.length === 0) return '';
//         const listItems = items.map(item => `<li class="px-4 py-2 border-b last:border-b-0 border-gray-200">${item}</li>`).join('');
//         return `<div class="bg-white rounded-xl shadow-sm border border-gray-200"><div class="px-6 py-4 bg-gray-50 rounded-t-xl"><h3 class="text-xl font-semibold text-gray-900">${title}</h3></div><ul class="divide-y divide-gray-100">${listItems}</ul></div>`;
//     };

//     detailsContainer += renderList('AD Group Memberships', user.access.adGroups);
//     detailsContainer += renderList('Okta Application Assignments', user.access.oktaApps.map(app => `${app.name} - ${app.purpose}`));
//     detailsContainer += renderList('GCP Project Access', user.access.gcpProjects.map(proj => `${proj.name} (${proj.role})`));
//     detailsContainer = DOMPurify.sanitize(detailsContainer);
//     return (
//         <section id="user-view" className="view-section">
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Access</h2>
                
//                 {/* <!-- Total Access Overview --> */}
//                 {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="user-overview-container"> */}
//                     {/* <!-- Cards will be dynamically added here by JavaScript --> */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="user-overview-container" dangerouslySetInnerHTML={{ __html: htmlcard }}/>

//                 {/* <!-- Detailed Access Lists --> */}
//                 <div className="space-y-6" id="user-details-container" dangerouslySetInnerHTML={{ __html: detailsContainer }}/>

//                 {/* <!-- Actionable Links --> */}
//                 <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
//                     <button className="px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors shadow">Request New Access</button>
//                     <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">Revoke Access</button>
//                     <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">Report an Issue</button>
//                 </div>
//             </section>
//     )
// }
"use client";
import { useState } from "react";
import { User } from "../../types";

export default function Userview({ user }: { user: User }) {
  const accessCounts = {
    "AD Groups": user.access.adGroups.length,
    "Okta Apps": user.access.oktaApps.length,
    "GCP Projects": user.access.gcpProjects.length,
  };

  // Track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "AD Groups": true, // Default expanded
  });

  // Track pagination per section
  const [pageBySection, setPageBySection] = useState<Record<string, number>>({});

  // Track "show all" toggle per section
  const [showAllBySection, setShowAllBySection] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    setPageBySection((prev) => ({ ...prev, [section]: 0 })); // reset page
  };

  return (
    <section id="user-view" className="view-section">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Access</h2>

      {/* Access summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(accessCounts).map(([key, value]) => (
          <div
            key={key}
            className="bg-gray-100 rounded-2xl p-6 shadow-sm cursor-pointer hover:bg-gray-200 transition"
            onClick={() => toggleSection(key)}
          >
            <h3 className="text-sm font-medium text-gray-500 uppercase">{key}</h3>
            <p className="mt-2 text-4xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-blue-500 mt-2">
              {openSections[key] ? "Hide details ▲" : "Show details ▼"}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Access Lists */}
      <div className="space-y-6">
        {openSections["AD Groups"] && (
          <DetailList
            title="AD Group Memberships"
            items={user.access.adGroups}
            section="AD Groups"
            pageBySection={pageBySection}
            setPageBySection={setPageBySection}
            showAllBySection={showAllBySection}
            setShowAllBySection={setShowAllBySection}
          />
        )}
        {openSections["Okta Apps"] && (
          <DetailList
            title="Okta Application Assignments"
            items={user.access.oktaApps.map(
              (app) => `${app.name} - ${app.purpose}`
            )}
            section="Okta Apps"
            pageBySection={pageBySection}
            setPageBySection={setPageBySection}
            showAllBySection={showAllBySection}
            setShowAllBySection={setShowAllBySection}
          />
        )}
        {openSections["GCP Projects"] && (
          <DetailList
            title="GCP Project Access"
            items={user.access.gcpProjects.map(
              (proj) => `${proj.name} (${proj.role})`
            )}
            section="GCP Projects"
            pageBySection={pageBySection}
            setPageBySection={setPageBySection}
            showAllBySection={showAllBySection}
            setShowAllBySection={setShowAllBySection}
          />
        )}
      </div>

      {/* Actionable Links */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
        <button className="px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors shadow">
          Request New Access
        </button>
        <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">
          Revoke Access
        </button>
        <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">
          Report an Issue
        </button>
      </div>
    </section>
  );
}

// A helper component for rendering a list with pagination + show all
function DetailList({
  title,
  items,
  section,
  pageBySection,
  setPageBySection,
  showAllBySection,
  setShowAllBySection,
}: {
  title: string;
  items: string[];
  section: string;
  pageBySection: Record<string, number>;
  setPageBySection: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  showAllBySection: Record<string, boolean>;
  setShowAllBySection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const pageSize = 5;
  const currentPage = pageBySection[section] || 0;
  const totalPages = Math.ceil(items.length / pageSize);

  const showAll = showAllBySection[section] || false;

  const start = currentPage * pageSize;
  const end = start + pageSize;
  const paginatedItems = showAll ? items : items.slice(start, end);

  const nextPage = () =>
    setPageBySection((prev) => ({
      ...prev,
      [section]: Math.min((prev[section] || 0) + 1, totalPages - 1),
    }));

  const prevPage = () =>
    setPageBySection((prev) => ({
      ...prev,
      [section]: Math.max((prev[section] || 0) - 1, 0),
    }));

  const toggleShowAll = () =>
    setShowAllBySection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 bg-gray-50 rounded-t-xl flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleShowAll}
            className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            {showAll ? "Show Paginated" : "Show All"}
          </button>
          {!showAll && (
            <span className="text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages || 1}
            </span>
          )}
        </div>
      </div>
      <ul className="divide-y divide-gray-100">
        {paginatedItems.map((item, i) => (
          <li
            key={i}
            className="px-4 py-2 border-b last:border-b-0 border-gray-200"
          >
            {item}
          </li>
        ))}
      </ul>
      {!showAll && totalPages > 1 && (
        <div className="flex justify-between px-4 py-3 bg-gray-50">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}