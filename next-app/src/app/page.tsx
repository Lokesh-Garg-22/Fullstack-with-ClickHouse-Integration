"use client";

import axios from "@/lib/axios";
import Head from "next/head";
import { useEffect, useState } from "react";

interface DataItem {
  [key: string]: any; // Allows arbitrary properties with any type
}

const Home = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>("/api/data");
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Head>
        <title>Next.js with ClickHouse</title>
      </Head>
      <main>
        <h1>Data from ClickHouse</h1>
        <ul>
          {data.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
