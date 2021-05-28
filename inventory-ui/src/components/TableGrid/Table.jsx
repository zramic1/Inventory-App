import * as React from "react";
import { Table as AntTable } from "ant-table-extensions";
import { get } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { renderGridActionDropdown } from "./ActionsDropdown";

const DataGridConstants = {
  PAGE_SIZE: 20,
  MIN_PAGE_SIZE: 15,
};

export default class Table extends React.Component {
  static defaultProps = {
    searchEnabled: true,
    showHeader: true,
    expandRowByClick: false,
    locale: {
      filterConfirm: "Ok",
      filterReset: "Reset",
      emptyText: "No Data",
    },
    loading: false,
    childrenColumnName: "children",
    recordStartEditingBehavior: "button",
    createActionPosition: "footer",
    columns: [
      {
        title: "code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
      },
    ],
  };
  constructor(props) {
    super(props);
    this.state = {
      expandedRowKeys: [],
      pageSize:
        props.pageSize != null
          ? props.pageSize
          : DataGridConstants.MIN_PAGE_SIZE,
    };
  }

  componentDidMount() {
    console.log("Ucitana je komponenta Table ", this.props);
  }

  render() {
    const {
      searchEnabled = true,
      searchTablePlaceholder,
      isTableInvisible,
      loading,
      locale,
      expandedRowRender,
      showHeader,
      onChange,
      dataSource,
      showUpdateModal,
      showDeleteModal,
    } = this.props;

    let _actions = [
      {
        id: "details",
        type: "primary",
        label: "Actions",
        onClick: (record) => (e) => { },
      },
      {
        type: "link",
        label: "Update item",
        onClick: (record) => (e) => showUpdateModal(e, record),
        enable: (record) => true,
      },
      {
        type: "link",
        label: "Delete item",
        onClick: (record) => (e) => showDeleteModal(e, record),
      },
    ];

    let { columns } = this.props;
    console.log("Data source", dataSource);
    if (dataSource) {
      columns = [
        ...columns,
        {
          dataIndex: "",
          key: "actions",
          width: 100,
          fixed: "right",
          render: (text, record) => {
            return renderGridActionDropdown(_actions, record);
          },
        },
      ];
    }

    return (
      <div className={"datagrid-table"}>
        {console.log("Columns su: ", columns)}
        {!isTableInvisible && (
          <AntTable
            //rowKey={(record) => record[keyProperty].toString()}
            columns={columns.map((item) => ({
              ...item,
              sortDirections: ["descend", "ascend"],
              sorter:
                item.key !== "actions" && !item.sorter
                  ? (a, b) =>
                    (String(get(a, item.dataIndex)) || "").localeCompare(
                      String(get(b, item.dataIndex)) || ""
                    )
                  : item.sorter ?? undefined,
            }))}
            dataSource={dataSource}
            loading={loading}
            locale={locale}
            rowClassName="row-edit-behavior"
            bordered={false}
            sortDirections={["descend", "ascend"]}
            expandedRowRender={expandedRowRender}
            size={"small"}
            showHeader={showHeader}
            onChange={onChange}
            searchable={searchEnabled}
            searchableProps={
              searchEnabled
                ? {
                  inputProps: {
                    placeholder: searchTablePlaceholder,
                    prefix: <SearchOutlined />,
                    className: "datagrid-search",
                  },
                  fuseProps: {
                    includeMatches: true,
                    ignoreLocation: true,
                  },
                }
                : undefined
            }
          />
        )}
      </div>
    );
  }
}
