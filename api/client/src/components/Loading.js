import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div style={{ padding: "20px" }}>
      Loading...
      <CircularProgress color="success"/> <br></br>
    </div>
  );
}

export default Loading