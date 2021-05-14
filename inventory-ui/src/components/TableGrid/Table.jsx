import * as React from "react";
import { Table as AntTable } from "ant-table-extensions";
import { get } from "lodash";
import { SearchOutlined } from "@ant-design/icons";

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
  render() {
    const {
      searchEnabled = true,
      searchTablePlaceholder,
      isTableInvisible,
      keyProperty,
      loading,
      locale,
      expandedRowRender,
      showHeader,
      onChange,
      dataSource,
    } = this.props;

    let { columns } = this.props;

    return (
      <div className={"datagrid-table"}>
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
