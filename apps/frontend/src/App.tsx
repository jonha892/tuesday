import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { HomeOutlined, FormOutlined, TableOutlined } from "@ant-design/icons";
import Home from "./pages/Home.tsx";
import FormPage from "./pages/FormPage.tsx";
import TablePage from "./pages/TablePage.tsx";
import "./styles/baseline.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
    path: "/",
  },
  {
    key: "form",
    icon: <FormOutlined />,
    label: "Form",
    path: "/form",
  },
  {
    key: "table",
    icon: <TableOutlined />,
    label: "Table",
    path: "/table",
  },
];

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current menu key based on pathname
  const getCurrentMenuKey = () => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem ? currentItem.key : "home";
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const menuItem = menuItems.find((item) => item.key === key);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const msg = "⚡ React + Vite + Deno";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: "#001529" }}>
        <div style={{ padding: "0 24px" }}>
          <Title level={3} style={{ color: "white", margin: "14px 0" }}>
            {msg}
          </Title>
        </div>
      </Header>

      <Layout>
        <Sider width={250} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            selectedKeys={[getCurrentMenuKey()]}
            onClick={handleMenuClick}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Sider>

        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
