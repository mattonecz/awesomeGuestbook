import { Chip } from "@mui/material";
import * as React from "react";
import { DepartmentType } from "../../features/visitorsSlice";

export type DepartmentProps = {
  department: number;
};

export const Department: React.FC<DepartmentProps> = ({ department }) => {
  return (
    <Chip
      label={DepartmentType[department]}
      //this is ugly, wanted to use switch but couldnt get correct type + changed the primary color so now im missing it, i could fix it but not enough time
      color={
        department === 0
          ? "success"
          : department === 1
            ? "secondary"
            : department === 2
              ? "primary"
              : department === 3
                ? "info"
                : "default"
      }
    />
  );
};
