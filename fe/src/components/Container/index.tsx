import React, { ReactNode } from "react";
import useStyles from "./styles";

function Component({ children }: { children: ReactNode }) {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
}

export default React.memo(Component);
