import React from "react";

import { Box, Container, Typography } from "@mui/material";

function Layout({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  return (
    <Container maxWidth="lg">
      <Box
        className="jumbotron"
        sx={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ paddingBottom: "20px" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {description}
        </Typography>
      </Box>
      <div className={className}>{children}</div>
    </Container>
  );
}

export default Layout;
