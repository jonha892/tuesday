import { Table, Typography, Card } from "antd";
import { ColumnsType } from "antd/es/table";
import { Device } from "shared/event.ts";

const { Title } = Typography;

const data: Device[] = [];

export default function TablePage() {
  const columns: ColumnsType<Device> = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      render: (value: Device["id"]) => value,
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      render: (value: Device["location"]) => value,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (value: Device["type"]) => value,
    },
    {
      title: "Device Health",
      key: "device_health",
      dataIndex: "device_health",
      render: (value: Device["device_health"]) => value,
    },
    {
      title: "Last Used",
      key: "last_used",
      dataIndex: "last_used",
      render: (value: Device["last_used"]) => value,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (value: Device["price"]) => value,
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
      render: (value: Device["color"]) => value,
    },
  ];

  return (
    <div>
      <Title level={2}>Devices</Title>

      <Card title="Sample Data Table">
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
}
