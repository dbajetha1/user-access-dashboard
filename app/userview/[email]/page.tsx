

type User = {
  id: string;
  name: string;
  email: string;
  isManager: boolean;
  access: {
    adGroups: string[];
    oktaApps: { name: string; purpose: string }[];
    gcpProjects: { name: string; role: string }[];
  };
};


type UserviewProps = {
  user: User[];
};

// export const getServerSideProps: GetServerSideProps<UserviewProps> = async (context) => {
//   // Get email from dynamic route
//   const email = context.params?.email as string;
//   console.log("Fetching data for email:", email);
//   if (!email) {
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
//   // Call API to fetch user by email
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`);
//   const users: User[] = await res.json();

//   return {
//     props: {
//       user: users[0] || null, // pass first user or null
//     },
//   };
// };
async function getUserByEmail(email: string): Promise<User | null> {
  if (!email) return null;
  console.log("Fetching data for email:", email); 
  // Users dummy data
  const users = [
                {
                    "id": "user-jane-d",
                    "name": "Jane Doe",
                    "email": "jdoe@gmail.com",
                    "isManager": false,
                    "access": {
                        "adGroups": ["Marketing-Team", "GCP-Billing-Admins"],
                        "oktaApps": [
                            { "name": "Slack", "purpose": "Communication" },
                            { "name": "Google Workspace", "purpose": "Productivity Suite" }
                        ],
                        "gcpProjects": [
                            { "name": "gcp-project-alpha-123", "role": "Editor" }
                        ]
                    }
                },
                {
                    "id": "user-john-s",
                    "name": "John Smith",
                    "isManager": false,
                    "email": "jsmith@gmail.com",
                    "access": {
                        "adGroups": ["Engineering-Team", "Project-A-Viewers"],
                        "oktaApps": [
                            { "name": "Slack", "purpose": "Communication" },
                            { "name": "Jira", "purpose": "Project Management" },
                            { "name": "GitHub", "purpose": "Code Repository" }
                        ],
                        "gcpProjects": [
                            { "name": "gcp-project-beta-456", "role": "Viewer" }
                        ]
                    }
                },
                {
                    "id": "user-sarah-l",
                    "name": "Sarah Lee",
                    "isManager": false,
                    "email": "slee@gmail.com",
                    "access": {
                        "adGroups": ["Finance-Team", "GCP-Billing-Admins", "Finance-Compliance-2025"],
                        "oktaApps": [
                            { "name": "Slack", "purpose": "Communication" },
                            { "name": "NetSuite", "purpose": "ERP" },
                            { "name": "Google Workspace", "purpose": "Productivity Suite" }
                        ],
                        "gcpProjects": [
                            { "name": "gcp-production-main", "role": "Viewer" },
                            { "name": "gcp-project-epsilon-987", "role": "Editor" }
                        ]
                    }
                }
            ]
  // const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`);
  // if (!res.ok) return null;
  
  return users.filter(users=>users.email===email)[0];
}

export default async function Userview({ params }: { params: { email: string } }) {
  let email = await params.email;
  email = decodeURIComponent(email);
  const user = await getUserByEmail(email);
  if (!user) {
    return <div>User not found</div>;
  }
  const accessCounts = {
                'AD Groups': user.access.adGroups.length,
                'Okta Apps': user.access.oktaApps.length,
                'GCP Projects': user.access.gcpProjects.length,
            };
  let htmlcard = ""
  for (const [key, value] of Object.entries(accessCounts)) {
                const card = `<div class="bg-gray-100 rounded-2xl p-6 shadow-sm"><h3 class="text-sm font-medium text-gray-500 uppercase">${key}</h3><p class="mt-2 text-4xl font-bold text-gray-900">${value}</p></div>`;
                htmlcard += card;
            }
  let detailsContainer = ""
  const renderList = (title : string, items:string[]) => {
      if (items.length === 0) return '';
      const listItems = items.map(item => `<li class="px-4 py-2 border-b last:border-b-0 border-gray-200">${item}</li>`).join('');
      return `<div class="bg-white rounded-xl shadow-sm border border-gray-200"><div class="px-6 py-4 bg-gray-50 rounded-t-xl"><h3 class="text-xl font-semibold text-gray-900">${title}</h3></div><ul class="divide-y divide-gray-100">${listItems}</ul></div>`;
  };

  detailsContainer += renderList('AD Group Memberships', user.access.adGroups);
  detailsContainer += renderList('Okta Application Assignments', user.access.oktaApps.map(app => `${app.name} - ${app.purpose}`));
  detailsContainer += renderList('GCP Project Access', user.access.gcpProjects.map(proj => `${proj.name} (${proj.role})`));

  return (
    <section id="user-view" className="view-section">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Access</h2>
                
                {/* <!-- Total Access Overview --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="user-overview-container">
                    {/* <!-- Cards will be dynamically added here by JavaScript --> */}
                    <div dangerouslySetInnerHTML={{ __html: htmlcard }}/>
                </div>

                {/* <!-- Detailed Access Lists --> */}
                <div className="space-y-6" id="user-details-container">
                    {/* <!-- Detailed lists will be dynamically added here by JavaScript --> */}
                    <div dangerouslySetInnerHTML={{ __html: detailsContainer }}/>
                </div>

                {/* <!-- Actionable Links --> */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
                    <button className="px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors shadow">Request New Access</button>
                    <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">Revoke Access</button>
                    <button className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300">Report an Issue</button>
                </div>
            </section>
  );
}
