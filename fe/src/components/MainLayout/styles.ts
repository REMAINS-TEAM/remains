import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    center: {
      display: "flex",
      padding: theme.spacing(2),
      maxWidth: "1180px",
    },
  })
);
