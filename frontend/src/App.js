import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./component/AppHeader";
import Dashboard from "./component/Dashboard";
import ComapanyDetail from "./component/Company/ComapanyDetail";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "50px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:id" element={<ComapanyDetail />} />
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;
