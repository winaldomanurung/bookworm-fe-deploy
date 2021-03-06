import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { createCategory } from "./apiAdmin";

import DashboardLayout from "../core/DashboardLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

function AddCategory() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const closeModal = () => {
    setIsLoading(false);
    setError("");
    setSuccess(false);
  };

  const changeHandler = (e) => {
    setError("");
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);
    // Make request to API to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        setIsLoading(true);
      } else {
        setError("");
        setSuccess(true);
        setIsLoading(true);
      }
    });
  };

  const showSpinner = () => {
    return (
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  };

  const showError = () => {
    return (
      <Modal
        open={false}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
    );
  };

  const showSuccess = () => {
    return (
      <Modal
        open={success}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Category '{name}' is created successfully.
          </Typography>
        </Box>
      </Modal>
    );
  };

  const newCategoryForm = () => {
    return (
      <FormControl sx={{ minWidth: "500px" }} variant="outlined">
        <TextField
          // error={name ? false : true}
          // component={Paper}

          inputProps={{ style: { background: "white" } }}
          id="name"
          label=" Category Name"
          type="text"
          // helperText="Incorrect entry."
          style={{
            marginTop: "25px",
          }}
          onChange={changeHandler}
          value={name}
        />
        <Button
          variant="contained"
          style={{
            marginTop: "25px",
          }}
          onClick={submitHandler}
        >
          Create Category
        </Button>
      </FormControl>
    );
  };
  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Create Category" description="">
        {showSpinner()}
        {showError()}
        {showSuccess()}
        {newCategoryForm()}
      </DashboardLayout>
    </Box>
  );
}

export default AddCategory;
