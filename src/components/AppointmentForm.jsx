import React from "react";
import "./appoint.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Swal from 'sweetalert2'

const label = { inputProps: { "aria-label": "Switch demo" } };

const Url = "http://localhost:5000/getdeatils";

const fetchDatails = async () => {
  const response = await axios.get(Url).then((res) => res.data);
  console.log("response", response);
  return response;
};

const AppointmentForm = () => {

  const navigate = useNavigate();

  const [Doctor, setDoctor] = useState("");
  const [appointChannel, setAppointChannel] = useState("");
  const [appointTItle, setAppointTitle] = useState("");
  const [time, setTime] = useState("");
  const [appointType, setappointType] = useState("");
  const [bp , setBp] = useState("");
  const [temp , setTemp] = useState("")

  
  const [data, setData] = useState();
  const [patient , setPatient] = useState()

  const handelTableData = (i) =>{
    setPatient(data[i])
  }

  const sendData = async () =>{
    await axios.post("http://localhost:5000/addappointment",{

      id: String(patient.id),
      name: String(patient.name),
      contact: String(patient.contact),
      doctorName: String(Doctor),
      // time: String(time),
      appointmentType: String(appointType),
      bp: String(bp),
      temp: String(temp),

    }).then(res => res.data);

  }


  const handelSubmitData =() =>{

    sendData()
    Swal.fire(
      'Appointment Booked',
      '',
      'success'
    )

    navigate('/DownloadForm')

    

  }


  useEffect(() => {
    fetchDatails().then((data) => setData(data));
  }, []);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* profile form starts  */}

          <div class="col-md-4">
            <div className="box-1 ">
              <div className="inner-box ">
                <input
                  type="search"
                  name=""
                  id="searchbar"
                  placeholder="            Search by Name/ Mobile Number"
                />
                <i class="fa-solid fa-magnifying-glass serachicon"></i>

                <button className="profile-button">VIEW PROFILE</button>
              </div>

              <div className="inner-box-2">
                <div className="inner-box-new">
                  <h6 className="heading-1">
                    Fullname
                    {/* <div class="vl"></div> */}
                  </h6>

                  <h6 className="heading-2">Contact</h6>
                </div>

                <div className="row">
                  <table className="scroll-col">
                    {data &&
                      data.map((cval, i) => {
                        return (
                          <>
                            <tr className="tab-line" >
                              <td onClick={()=>{handelTableData(i)}}>{cval.name}</td>
                              <td>{cval.contact}</td>
                            </tr>
                          </>
                        );
                      })}
                  </table>
                </div>

                <div className="inner-box-new">
                  <table className="dummy-data mt-2">
                    <tr>
                      <td>1 Row Selected</td>
                      <td>6-10 of 20</td>
                    </tr>
                  </table>
                </div>
              </div>

              <h5 className=" heading-detail-2 mt-2 ">profile Details</h5>

              <div className="img-div">
                <img
                  src={patient ? patient.profilePicture : ""}
                  alt=""
                  height={90}
                  width={90}
                />
               <p className="pat-name">{patient ? patient.name : ""}</p>
              </div>

              <div className="deatils-div">
                <p>Location : N/A </p>
                <p>Contact : {patient ? patient.contact : ""}</p>
                <p>Email id : N/A </p>
              </div>



            </div>
          </div>

          {/* profile form ends */}

          {/* appointment form Starts */}

          <div className="col-md-8">
            <div className="container">
              <div className="row">
                    
                <div className="col">
                  <h5 className="heading-detail">Details</h5>

                  <Box sx={{ Width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select Doctor</InputLabel>
                      <Select
                        onChange={(event) => setDoctor(event.target.value)}
                      >
                        <MenuItem value={"Ntin Mane"}>Dr.Ntin Mane </MenuItem>
                        <MenuItem value={"Surya Marne"}>
                          Dr.palki sharma
                        </MenuItem>
                        <MenuItem value={"Dr.Shruti kamble"}>
                          Dr.Shruti kamble
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <br />
                  <Box sx={{ Width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select Appointment Channel</InputLabel>
                      <Select
                        onChange={(event) =>
                          setAppointChannel(event.target.value)
                        }
                      >
                        <MenuItem value={"OPD"}>OPD</MenuItem>
                        <MenuItem value={"Orthopaedics"}>
                          Orthopaedics{" "}
                        </MenuItem>
                        <MenuItem value={"Internal medicine"}>
                          Internal medicine
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <br />

                  <Box
                    sx={{
                      width: 400,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Appointment Title"
                      onChange={(event) => setAppointTitle(event.target.value)}
                    />
                  </Box>
                </div>

                <div className="col">
                  <h4 className="heading-detail">Appointment Details</h4>

                  <table className="pidtab">
                    <tr>
                      <td>{patient ? patient.name: ""}</td>
                      <td>PID:{patient ? patient.id: ""}</td>
                    </tr>
                  </table>

                  <table className="pidtab-2">
                    <tr>
                      <td> walkin Appointment</td>
                      <td>
                        <Switch {...label} />
                      </td>
                    </tr>
                  </table>

                  <table>
                    <tr>
                      <td>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel>Time</InputLabel>
                          <Select
                            onChange={(event) => setTime(event.target.value)}
                          >
                            <MenuItem value={"10:00 Am"}>10:00 Am</MenuItem>
                            <MenuItem value={"10:30 Am"}>10:30 Am</MenuItem>
                            <MenuItem value={"11:00 Am"}>11:00 Am</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                      <td>
                        <input className="date-input" type="date"></input>
                      </td>
                    </tr>
                  </table>

                  <Box sx={{ Width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select Appointment Type</InputLabel>
                      <Select
                        onChange={(event) => setappointType(event.target.value)}
                      >
                        <MenuItem value={"physical examinations"}>
                          physical examinations
                        </MenuItem>
                        <MenuItem value={"follow-up visit"}>
                          follow-up visit
                        </MenuItem>
                        <MenuItem value={"urgent visits"}>
                          urgent visits
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <hr className="mt-2" />

                <table>
                  <tr>
                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="BP"
                          variant="outlined"
                          onChange={(event) => setBp(event.target.value)}
                        />
                      </Box>
                    </td>

                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Temp"
                          variant="outlined"
                          onChange={(event) => setTemp(event.target.value)}
                        />
                      </Box>
                    </td>
                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Height"
                          variant="outlined"
                        />
                      </Box>
                    </td>
                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Weigth"
                          variant="outlined"
                        />
                      </Box>
                    </td>
                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="SPO2"
                          variant="outlined"
                        />
                      </Box>
                    </td>
                    <td>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "10ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Pluse Rate"
                          variant="outlined"
                        />
                      </Box>
                    </td>
                  </tr>
                </table>

                <div className="col">
                  <Box
                    sx={{
                      width: 400,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField fullWidth label="Reason" id="fullWidth" />
                  </Box>
                </div>

                <div className="col">
                  <Box sx={{ Width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel >
                        Need For Doctor
                      </InputLabel>
                      <Select
                        //  onChange={(event) =>setNeed(event.target.value)}
                        
                      >
                        <MenuItem value={"Fever"}>Fever</MenuItem>
                        <MenuItem value={"Body Pain"}>Body Pain</MenuItem>
                        <MenuItem value={"Anxiety"}>Anxiety</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                      
                       
              </div>
              <button type="reset" className=" reset-button">reset</button>
              <button type="submit" className="reset-button" onClick={handelSubmitData}>submit</button>
              
            </div>
          </div>
          
          {/* apppointment  form ends  */}
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
