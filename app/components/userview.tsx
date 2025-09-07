import Usertemplate from "@/app/components/userviewtemplate"
import { User } from "../types";
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
                        "adGroups": ["Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins","Marketing-Team", "GCP-Billing-Admins"],
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
export default async function Userview({email}: {email: string}) {
    email = decodeURIComponent(email);
    const user = await getUserByEmail(email);
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <Usertemplate user={user}/>
        </div>
    )
}