
import {Networkgraph, Userview} from "@/app/components";
const currentUser = {
  id: "user-1",
  name: "Jane Doe",
  isManager: true,
  access: {
    adGroups: [
      { name: "Marketing-Team", role: "Member", purpose: "Marketing Access" },
      { name: "GCP-Billing-Admins" },
    ],
    oktaApps: [
      { name: "Slack", role: "User" },
      { name: "GitHub", purpose: "Repo Access" },
    ],
    gcpProjects: ["Project-A", "Project-B"],
  },
};

export default function Home() {
    return (
        <main>
            <Userview email="jdoe@gmail.com"/>
            <Networkgraph/>

        </main>

    );
    }