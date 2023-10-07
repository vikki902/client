import React from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import { addUserDetail } from "../services/Api";
import { redirect, useNavigate } from "react-router-dom";
import DownloadForm from "./DownloadForm.js";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@mui/material";

const Container = styled(FormGroup)`
  width: 20%;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

  & > div {
    margin-top: 20px;
  }
`;

const Form = () => {
  const DefaultValue = {
    name: "",
    email: "",
    phone: "",
  };

  const [user, setuser] = useState(DefaultValue);
  const [state, setState] = useState(true);
  // const navigate = useNavigate();

  const OnValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
   
  };

  const AddDetails = async () => {
    setState(true);
    await addUserDetail(user);
    console.log("added to db");
  };

  return (
    <>
      {state ? (
        <>
          <DownloadForm />
        </>
      ) : (
        <Container>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              onChange={(e) => {
                OnValueChange(e);
              }}
              name="name"
            />
          </FormControl>

          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              onChange={(e) => {
                OnValueChange(e);
              }}
              name="email"
            />
          </FormControl>

          <FormControl>
            <InputLabel>Phone</InputLabel>
            <Input
              onChange={(e) => {
                OnValueChange(e);
              }}
              name="phone"
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{ marginTop: "30px" }}
            onClick={() => AddDetails()}
          >
            submit
          </Button>
        </Container>
      )}
    </>
  );
};

export default Form;
