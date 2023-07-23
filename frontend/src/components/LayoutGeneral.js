import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    BankOutlined,
    EnvironmentOutlined,
    FormatPainterOutlined,
    HomeOutlined,
    UserOutlined,
    DeleteOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem("Home", "", <HomeOutlined />),
    getItem("Predio", "predio", <BankOutlined />),    
  ];

const LayoutGeneral = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const page = (e) => {
    console.log("click ", e.key);

    router.push(`/${e.key}`);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={page}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          theme="dark"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          CATASTRO ©2023 Created by Julieth Cortes
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutGeneral;
