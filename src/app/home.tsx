import { Box } from "@mui/material";
import React from "react";
import { Form } from "./components/form/form";
import { VisitorsTable } from "./components/visitorsTable/visitorsTable";

export const Home: React.FC = () => {
  return (
    <Box padding="24px" display="flex">
      <Form />
      <VisitorsTable />
    </Box>
  );
};
