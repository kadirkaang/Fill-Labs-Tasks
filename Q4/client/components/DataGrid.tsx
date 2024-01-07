"use client"
import * as React from "react";

import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import MaterialCheckbox from "@mui/material/Checkbox";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";

import {
  HeaderCellSelect,
  CellSelect,
  SelectClickTypes,
  SelectTypes,
  useRowSelect,
} from "@table-library/react-table-library/select";

interface User {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  ID: number;
  Name: string;
  Surname: string;
  Email: string;
}

const DataComponent = ({ nodes }: { nodes: User[] }) => {
  const data = { nodes };

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  80px repeat(4, minmax(0, 1fr));
      `,
    BaseCell: `
        border: 1px solid #a0a8ae;
        padding: 8px 16px;
    `,
  });

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action: any, state: any) {
    // console.log(action, state); 
    console.log(state.ids);

  }

  return (
    <MaterialThemeProvider theme={createMaterialTheme({})}>
      <Table
        data={data}
        theme={theme}
        layout={{ custom: true }}
        select={select}
      >
        {(tableList: User[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell stiff>
                  <MaterialCheckbox
                    inputProps={{ "aria-label": "select all" }}
                    size="small"
                    checked={select.state.all}
                    indeterminate={!select.state.all && !select.state.none}
                    onChange={select.fns.onToggleAll}
                  />
                </HeaderCell>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Surname</HeaderCell>
                <HeaderCell>Email</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: User) => (
                <Row key={item.ID} item={item}>
                  <Cell stiff>
                    <MaterialCheckbox
                      inputProps={{ "aria-label": "select item" }}
                      size="small"
                      checked={select.state.ids.includes(item.ID)}
                      onChange={() => select.fns.onToggleById(item.ID)}
                    />
                  </Cell>
                  <Cell >{item.ID}</Cell>
                  <Cell>{item.Name}</Cell>
                  <Cell>{item.Surname}</Cell>
                  <Cell>{item.Email}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </MaterialThemeProvider>
  );
};

export default DataComponent;