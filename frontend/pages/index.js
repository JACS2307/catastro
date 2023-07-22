import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button, Divider,  } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { ALL_PREDIOS } from "../src/graphql/querys/gql";

import React, { useState } from 'react';
import {
  BankOutlined,
  EnvironmentOutlined,
  FormatPainterOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Card, Space } from 'antd';

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
  getItem("Propietario", "propietario", <UserOutlined />),
];

<elementos />

const Home = () => {
  const router = useRouter();
  const { loading, data } = useQuery(ALL_PREDIOS);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  const page = (e) => {
    console.log('click ', e.key);

    router.push(`/${e.key}`)
  }
  return (
    <Layout
    style={{
      minHeight: '100vh',
    }}
  >
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
      <Header theme="dark"
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      />
      <Content
        style={{
          margin: '0 16px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}
        >
        CONTENIDO
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        CATASTRO ©2023 Created by Julieth Cortes
      </Footer>
    </Layout>
  </Layout>
);
};



export default Home;

