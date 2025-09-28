import { useEffect, useState } from "react";

import { Table, Typography, Card } from "antd";
import { ColumnsType } from "antd/es/table";

import { Device, devicesSchema } from "shared/event.ts";
import { getApiUrl } from "../config/env.ts";

const { Title } = Typography;

const simpleStrCompare = (a: string, b: string) => {
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0;
};

export default function TablePage() {
  const [data, setData] = useState<Device[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getApiUrl("/api/devices/all"));
      const result = await response.json();
      console.log("Response data:", result);
      const parsedResult: Device[] = devicesSchema.parse(result);
      setData(parsedResult);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<Device> = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      render: (value: Device["id"]) => value,
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      sorter: (a, b) => simpleStrCompare(a.location, b.location),
      render: (value: Device["location"]) => value,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      sorter: (a, b) => simpleStrCompare(a.type, b.type),
      render: (value: Device["type"]) => value,
    },
    {
      title: "Device Health",
      key: "device_health",
      dataIndex: "device_health",
      sorter: (a, b) => simpleStrCompare(a.device_health, b.device_health),
      render: (value: Device["device_health"]) => value,
    },
    {
      title: "Last Used (MM/DD/YYYY)",
      key: "last_used",
      dataIndex: "last_used",
      sorter: (a, b) => {
        const dateA = new Date(a.last_used);
        const dateB = new Date(b.last_used);
        return dateA.getTime() - dateB.getTime();
      },
      render: (value: Device["last_used"]) => value,
    },
    {
      title: "Price (EUR)",
      key: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (value: Device["price"]) => value.toFixed(2),
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
      sorter: (a, b) => a.color.localeCompare(b.color),
      render: (value: Device["color"]) => (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: 4,
              backgroundColor: value,
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            aria-label={`Color swatch for ${value}`}
          />
          <span>{value}</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title="Devices">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  );
}
