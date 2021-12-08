import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: "8px",
      boxShadow: "0 1px 2px rgb(0 0 0 / 20%)",
      width: "fit-content",
    },
  })
);
