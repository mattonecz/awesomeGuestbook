import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { removeVisitors, Visitor } from "../../features/visitorsSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import "./styles.css";
import { Department } from "../department/department";

export const VisitorsTable: React.FC = () => {
  const dispatch = useDispatch();

  const visitors = useSelector((state: any) => state.visitors);
  type VisitorWithCheckbox = Visitor & { checked: boolean };
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    email: string
  ) => {
    if (event.target.checked) {
      setSelected([...selected, email]);
    } else {
      setSelected(selected.filter((itm) => itm !== email));
    }
  };

  const handleRemoveVisitors = () => {
    if (selected.length) {
      dispatch(removeVisitors(selected));
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(visitors.map((itm: Visitor) => itm.email));
    } else {
      setSelected([]);
    }
  };

  const rows: VisitorWithCheckbox[] = visitors.map((itm: Visitor) => {
    return {
      name: itm.name,
      email: itm.email,
      department: itm.department,
      checked: selected.includes(itm.email),
    };
  });

  return (
    <Box
      boxShadow="0px 2px 10px 0px #463F3F33"
      borderRadius="10px"
      width="1448px"
    >
      <Typography padding="16px" variant="h4">
        Visitor management
      </Typography>
      <Box padding="6px">
        <Checkbox checked={rows.some((itm) => itm.checked)} />
        <Button
          onClick={handleRemoveVisitors}
          color="error"
          variant="contained"
        >
          Remove
        </Button>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={
                      visitors.length && rows.every((itm) => itm.checked)
                    }
                  />
                }
                label={<Typography fontWeight={600}>Visitor</Typography>}
              />
            </TableCell>
            <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight={600}>Department</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <FormControlLabel
                  checked={row.checked}
                  control={
                    <Checkbox
                      onChange={(evt) => handleSelect(evt, row.email)}
                    />
                  }
                  label={
                    <Typography fontWeight={600} variant="body2">
                      {row.name}
                    </Typography>
                  }
                />
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">
                <Department department={row.department} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
