import React, { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

import * as styles from "./styles";

function Component({ children, sx }: { children: ReactNode; sx?: SxProps }) {
  return (
    <Box
      sx={{
        ...styles.container,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default React.memo(Component);
