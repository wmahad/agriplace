import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "components/Main";
import { Vegetables } from "./components/Vegetables";
import { Fruits } from "./components/Fruits";
import { Layout, Space, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space>
          <Link to="/">Home</Link>
          <Link to="/admin/fruits">Fruits</Link>
          <Link to="/admin/vegetables">Vegetables</Link>
        </Space>
      </Header>
      <Content style={{ padding: "0 50px", minHeight: "92vh" }}>
        <div
          style={{
            padding: 24,
            marginTop: 24,
            minHeight: "80vh",
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route index element={<Main />} />
            <Route path="/:id" element={<Main />} />
            <Route path="/admin/vegetables" element={<Vegetables />} />
            <Route path="/admin/fruits" element={<Fruits />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
