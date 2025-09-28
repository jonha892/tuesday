import { useEffect, useState } from "react";
import { Card, Typography, Badge, Spin } from "antd";
import { getApiUrl } from "../config/env.ts";

const { Title, Text } = Typography;

type Health = { ok: boolean; time: string };

export default function Home() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl("/api/health"));
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON but got:", contentType, text);
        throw new Error(`Expected JSON response but got ${contentType}`);
      }

      const healthData = await response.json();
      setHealth(healthData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch health status:", error);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on component mount
    fetchHealth();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchHealth, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = () => {
    if (loading) return <Badge status="processing" text="Checking..." />;
    if (!health) return <Badge status="error" text="Offline" />;
    return health.ok ? (
      <Badge status="success" text="Online" />
    ) : (
      <Badge status="error" text="Error" />
    );
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div>
      <Title level={2}>Home</Title>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Server Status</span>
            {getStatusBadge()}
          </div>
        }
        style={{ marginTop: 16 }}
        extra={loading && <Spin size="small" />}
      >
        {health ? (
          <div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>Server Time: </Text>
              <Text code>{formatTimestamp(health.time)}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong>Status: </Text>
              <Text type={health.ok ? "success" : "danger"}>
                {health.ok ? "Healthy" : "Unhealthy"}
              </Text>
            </div>
            {lastUpdate && (
              <div>
                <Text strong>Last Updated: </Text>
                <Text type="secondary">{lastUpdate.toLocaleTimeString()}</Text>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Text type="danger">Unable to connect to server</Text>
            {lastUpdate && (
              <div style={{ marginTop: 8 }}>
                <Text strong>Last Attempt: </Text>
                <Text type="secondary">{lastUpdate.toLocaleTimeString()}</Text>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
