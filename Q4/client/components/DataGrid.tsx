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

const nodes = [
    {
        id: "1",
        name: "Ali",
        type: "Human",
        isAdmin: false,
    },
    {
        id: "2",
        name: "Mah",
        type: "Human",
        isAdmin: false,
    },
    {
        id: "3",
        name: "Ahmet",
        type: "Human",
        isAdmin: false,
    }
];

const DataComponent = () => {
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

  function onSelectChange(action:any, state:any) {
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
        {(tableList:object[]) => (
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
              {tableList.map((item:any) => (
                <Row key={item.id} item={item}>
                  <Cell stiff>
                    <MaterialCheckbox
                      inputProps={{ "aria-label": "select item" }}
                      size="small"
                      checked={select.state.ids.includes(item.id)}
                      onChange={() => select.fns.onToggleById(item.id)}
                    />
                  </Cell>
                  <Cell >{item.id}</Cell>
                  <Cell>{item.name}</Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isAdmin.toString()}</Cell>
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