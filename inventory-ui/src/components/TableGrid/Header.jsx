import * as React from "react";
import { Button, Row, Col, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default class Header extends React.Component {
  static defaultProps = {
    allowCreate: false,
    createActionPosition: "footer",
  };
  render() {
    const {
      icon,
      title,
      titleClass,
      addButtonType,
      addButtonStyle,
      addButtonText,
      allowCreate = false,
      createActionPosition = "footer",
      showCreateModal,
    } = this.props;

    return (
      <div>
        <Row className={"datagrid-header"}>
          <Col lg={18} sm={13}>
            <div className={"datagrid-title-wrapper"}>
              {title ? (
                typeof title === "string" ? (
                  <Title level={1} className={"datagrid-title " + titleClass}>
                    {title}
                  </Title>
                ) : (
                  title
                )
              ) : null}
            </div>
          </Col>
          <Col lg={6} sm={11} style={{ textAlign: "right" }}>
            {allowCreate && (
              <Button
                className="datagrid-add-btn"
                type={addButtonType || "primary"}
                onClick={showCreateModal}
                style={addButtonStyle}
                icon={<PlusOutlined />}
              >
                {addButtonText}
              </Button>
            )}
          </Col>
        </Row>
        {(title || (allowCreate && createActionPosition === "topRight")) && (
          <Divider type={"horizontal"} className={"divider-horizontal"} />
        )}
      </div>
    );
  }
}
