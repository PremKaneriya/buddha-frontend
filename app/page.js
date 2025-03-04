'use client';
import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [target, setTarget] = useState("");
    const [tunnelUrl, setTunnelUrl] = useState("");

    // Use environment variable for backend URL
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://buddha-is-live-production.up.railway.app";

    const createTunnel = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/create-tunnel`, { target });
            setTunnelUrl(data.tunnelUrl);
        } catch (error) {
            console.error("Error creating tunnel:", error);
            alert("Failed to create tunnel. Check your backend.");
        }
    };

    return (
        <div>
            <h1>Self-Hosted Ngrok</h1>
            <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter target URL"
            />
            <button onClick={createTunnel}>Create Tunnel</button>

            {tunnelUrl && (
                <p>Your Tunnel: 
                    <a href={`http://${tunnelUrl}`} target="_blank" rel="noopener noreferrer">{tunnelUrl}</a>
                </p>
            )}
        </div>
    );
}
