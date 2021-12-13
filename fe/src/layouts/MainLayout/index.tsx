import React, { ReactNode } from "react";
import * as styles from "./styles";
import { Box } from "@mui/material";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.center}>{children}</Box>
    </Box>
  );
}

export default React.memo(MainLayout);
