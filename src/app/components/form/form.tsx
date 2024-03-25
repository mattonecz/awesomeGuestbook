import React, { useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import "./styles.css";
import { DepartmentType, addVisitor, Visitor } from "../../features/visitorsSlice";
import { Person, Restore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

export const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [mailError, setMailError] = useState(false);
  const visitors = useSelector((state: any) => state.visitors);
  const mailRegex = new RegExp(
    "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"
  );

  const handleReset = () => {
    setName("");
    setEmail("");
    setDepartment(0);
    setCheckbox(false);
    setMailError(false);
  };
  const dispatch = useDispatch();
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(event.target.checked);
  };

  const handleAddVisitor = () => {
    const mailUnique = !visitors.filter((item: Visitor) => item.email === email)
      .length;
    if (!email.trim().length || !mailRegex.test(email) || !mailUnique) {
      setMailError(true);
      return;
    }
    dispatch(addVisitor({ name, email, department }));
    handleReset();
  };

  return (
    <Box className="formBox" display="inline-grid" width={450} padding='16px' borderRadius='10px' boxShadow='0px 2px 10px 0px #463F3F33' height='fit-content' marginRight='24px'>
      <Box>
        <Typography variant="h6">Add new visitor</Typography>
        <span>Fill name, email address and the department.</span>
      </Box>
      <TextField
        label="Full name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <TextField
        type="email"
        label="Email address"
        error={mailError}
        helperText={mailError ? "Valid unique email is required!" : ""}
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        required
        onFocus={() => {
          if (mailError) {
            setMailError(false);
          }
        }}
      />
      <TextField
        select
        label="Department"
        value={department}
        onChange={(evt) => setDepartment(parseInt(evt.target.value))}
      >
        <MenuItem value={0}>{DepartmentType[DepartmentType.Accounting]}</MenuItem>
        <MenuItem value={1}>{DepartmentType[DepartmentType.IT]}</MenuItem>
        <MenuItem value={2}>{DepartmentType[DepartmentType.Management]}</MenuItem>
        <MenuItem value={3}>{DepartmentType[DepartmentType.Marketing]}</MenuItem>
        <MenuItem value={4}>{DepartmentType[DepartmentType.Sales]}</MenuItem>
      </TextField>
      <FormControlLabel
        control={<Checkbox checked={checkbox} onChange={handleCheckbox} />}
        label="I agree to be added to the table"
      />
      <Box display="flex">
        <Button
          onClick={handleReset}
          variant="outlined"
          className="buttonReset"
        >
          <Restore />
          RESET FORM
        </Button>
        <Button
          onClick={handleAddVisitor}
          disabled={!checkbox}
          variant="contained"
          fullWidth
        >
          <Person />
          ADD NEW VISITOR
        </Button>
      </Box>
    </Box>
  );
};
