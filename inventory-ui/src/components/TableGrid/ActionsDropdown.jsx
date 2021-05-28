import React from "react";
import { Dropdown, Menu, Button } from "antd";

export default class ActionsDropdown extends React.Component {
  render() {
    const { actions, record } = this.props;
    if (
      !actions.find((item) => item.type === "primary") &&
      actions.length > 1
    ) {
      actions[0].type = "primary";
    }
    const primaryAction = actions.find((item) => item.type === "primary");
    const allInvisibleDropdownActions = actions.filter(
      (item) =>
        !item?.visibleDropdownAction ||
        (item?.visibleDropdownAction &&
          item.visibleDropdownAction(record) === true)
    );
    const invisibleDropdownActions = actions.filter(
      (item) => !item?.visibleDropdownAction
    );
    return (
      <React.Fragment>
        {actions.length > 1 &&
        (allInvisibleDropdownActions.length === actions.length - 1 ||
          invisibleDropdownActions.length === actions.length) ? (
          <Dropdown.Button
            type="primary"
            onClick={primaryAction?.onClick(record)}
            style={primaryAction?.style}
            overlay={
              <Menu>
                {actions
                  .filter((item) => item.type !== "primary")
                  .map((action, index) => (
                    <Menu.Item
                      disabled={action.enable ? !action.enable(record) : false}
                      style={{
                        color: action.type === "danger" ? "red" : undefined,
                        display:
                          action.visibleDropdownAction &&
                          !action.visibleDropdownAction(record)
                            ? "none"
                            : undefined,
                      }}
                      key={`action-${index.toString()}`}
                      onClick={action.onClick(record)}
                    >
                      {action.label}
                    </Menu.Item>
                  ))}
              </Menu>
            }
          >
            {primaryAction.label}
          </Dropdown.Button>
        ) : (
          <Button
            type={actions[0].type}
            disabled={actions[0].enable ? !actions[0].enable(record) : false}
            key={`action-1`}
            onClick={actions[0].onClick(record)}
            style={{
              display:
                actions[0].visibleActionProp &&
                !record[actions[0].visibleActionProp]
                  ? "none"
                  : undefined,
              ...actions[0].style,
            }}
          >
            {actions[0].label}
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export function renderGridActionDropdown(actions, record) {
  return <ActionsDropdown actions={actions} record={record} />;
}
