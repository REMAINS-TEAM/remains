import React, { ReactNode } from "react";
import useStyles from "./styles";

function MainLayout({ children }: { children: ReactNode }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.center}>{children}</div>
    </div>
  );
}

export default React.memo(MainLayout);
