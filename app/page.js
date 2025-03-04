"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [target, setTarget] = useState("");
    const [tunnelUrl, setTunnelUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Backend API URL (Railway deployment)
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://buddha-is-live-production.up.railway.app";

    const createTunnel = async () => {
        setLoading(true);
        setError("");
        setTunnelUrl("");

        try {
            const { data } = await axios.post(`${backendUrl}/create-tunnel`, { target });
            setTunnelUrl(data.tunnelUrl);
        } catch (err) {
            setError("Failed to create tunnel. Ensure your backend is running.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">🔗 Self-Hosted Ngrok</h1>

                <input
                    type="text"
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter target URL (e.g. http://localhost:3000)"
                />

                <button
                    className={`w-full mt-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={createTunnel}
                    disabled={loading}
                >
                    {loading ? "Creating Tunnel..." : "Create Tunnel"}
                </button>

                {error && <p className="text-red-400 mt-3 text-center">{error}</p>}

                {tunnelUrl && (
                    <div className="mt-4 text-center">
                        <p className="text-green-400">✅ Tunnel Created:</p>
                        <a
                            href={`https://${tunnelUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            {tunnelUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
