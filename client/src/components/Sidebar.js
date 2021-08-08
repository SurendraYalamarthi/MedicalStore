import React, { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { ACTIVE_TAB_KEY, EXPIRED_TAB_KEY, History_TAB_KEY, SALE_TAB_KEY, UPLOAD_TAB_KEY } from "../constants/tabKeys";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Sidebar({ onChange, defaultTab }) {
  const [data, setData] = useLocalStorage("auth");
  const [activeTab, setActiveTab] = useState(defaultTab);

  const onLogout = () => {
    if (data) setData({});
  };

  useEffect(() => {
    if (activeTab) {
      onChange(activeTab);
    }
  }, [activeTab, onChange]);

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container
        className="flex-grow-1"
        activeKey={activeTab}
        onSelect={setActiveTab}
      >
        <Row>
          <Col>
            <Nav
              variant="tabs"
              className="flex-column border border-left-0"
              style={{ height: "calc(100vh - 70px)" }}
            >
              <Nav.Item>
                <Nav.Link eventKey={ACTIVE_TAB_KEY}>Active </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={EXPIRED_TAB_KEY}>Expired</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={SALE_TAB_KEY}>Sale</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={UPLOAD_TAB_KEY}>Upload</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={History_TAB_KEY}>History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="w-100" onClick={onLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
