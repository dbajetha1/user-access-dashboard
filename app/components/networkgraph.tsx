"use client";
import { useEffect, useRef } from "react";
import NeoVis, { NeovisConfig } from "neovis.js";

export default function Graph() {
  const visRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visRef.current) return;

    const config: NeovisConfig = {
      containerId: visRef.current.id,
      neo4j:{
        serverUrl: "neo4j://127.0.0.1:7687", // Or neo4j+s:// for Aura
        serverUser: "neo4j",
        serverPassword: "root1234",
      },
      labels: {
        Application: {
          label: "appName", // show appname inside node
          // size: "appName",         // size nodes based on numeric // group/color by linkurl
        },
        User: {
          label: "firstName", // show firstname inside node
          // size: "email",           // size nodes based on numeric id
        },
      },
      relationships: {
        USES: {
          // caption: true, // show the relationship type (label on edge)
          // width: "5", // thickness of the edge
          color: "red",  // color of the edge
          arrows: {
            to: "true",    // show arrow pointing to target node
          },
        },
      },
      initialCypher: `
        MATCH (u:User)-[r:USES]->(a:Application)
        RETURN u, r, a
        LIMIT 50
      `,
    };

    const viz = new NeoVis(config);
    viz.render();

    // Example: reload after 5s with new query
    // setTimeout(() => {
    //   viz.renderWithCypher("MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 10");
    // }, 5000);
  }, []);

  return (
    <div
      id="viz"
      ref={visRef}
      className="w-full h-[600px] border rounded-xl shadow-md"
    />
  );
}
