"use client";
import { useEffect, useRef } from "react";
import NeoVis, { NeovisConfig } from "neovis.js";

export default function Graph() {
  const visRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visRef.current) return;

    const config: NeovisConfig = {
      containerId: visRef.current.id,
      neo4j: {
        serverUrl: "neo4j://127.0.0.1:7687", // Or neo4j+s:// for Aura
        serverUser: "neo4j",
        serverPassword: "root1234",
      },
      labels: {
        Application: {
          label: "appName", // show appName inside node
        },
        User: {
          label: "firstName", // show firstName inside node
        },
      },
      relationships: {
        USES: {
          label: "USES", // show the relationship type on edge
          width: "1", // edge thickness
          color: { color: "red" }, // edge color
          arrows: {
            to: "to", // arrow pointing to target node
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
  }, []);

  return (
    <div
      id="viz"
      ref={visRef}
      className="w-full h-[600px] border rounded-xl shadow-md"
    />
  );
}