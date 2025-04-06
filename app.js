import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_BASE = "https://argrid.glitch.me/api";

export default function Dashboard() {
  const [price, setPrice] = useState(null);
  const [demand, setDemand] = useState(null);
  const [emissions, setEmissions] = useState(null);
  const [transfers, setTransfers] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/price`).then(res => res.json()).then(setPrice);
    fetch(`${API_BASE}/demand`).then(res => res.json()).then(setDemand);
    fetch(`${API_BASE}/emissions`).then(res => res.json()).then(setEmissions);
    fetch(`${API_BASE}/transfers`).then(res => res.json()).then(setTransfers);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">National Grid: Live</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Price per MWh</h2>
            <p className="text-2xl">{price ? `£${price.value}/MWh` : "Loading..."}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Demand</h2>
            <p className="text-2xl">{demand ? `${demand.value}°C` : "Loading..."}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Emissions per kWh</h2>
            <p className="text-2xl">{emissions ? `${emissions.value} µg/m³` : "Loading..."}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Transfers</h2>
            <p className="text-2xl">{transfers ? `${transfers.value} GW` : "Loading..."}</p>
          </CardContent>
        </Card>
      </div>

      {/* Example chart */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Demand Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={demand?.history || []}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
