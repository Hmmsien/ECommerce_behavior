import React from 'react'
import { AiFillInstagram, AiOutlineGithub, AiFillCodeSandboxSquare } from 'react-icons/ai'

import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';


import { useStateContext } from '../context/StateContext'
import { useEffect } from 'react';
import Link from 'next/link';


/**
  Gets the time formatted as dd/mm/yyyy - hh:mm
* @param {datetime} event_time
 * @returns {string} Formatted time
 */
const formatDateTime = (event_time) => {

  const date = new Date(`${event_time}Z`)
  return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
}

const Footer = () => {
  const [AIModel, setAIModel] = React.useState(1);

  const { historial, resetHistorial } = useStateContext();


  const handleChange = (event) => {
    setAIModel(event.target.value);
  };

  return (
    <div className='footer-container' >
      <p>2022 CTP data Science Project</p>

      <p className="icons">
        {/* <AiFillInstagram /> */}
        <a target="_blank" href="https://github.com/Hmmsien/ECommerce_behavior"> <AiOutlineGithub /> </a>
        <a target="_blank" href="https://www.figma.com/file/bMmUmMtKJt9aUwKWHKW5LH/Data-Science?node-id=0%3A1"> < AiFillCodeSandboxSquare /></a>

      </p>
      {/* <FormControl sx={{ minWidth: "100%" }}>

        <InputLabel id="demo-simple-select-label">Change Recommendaion Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={AIModel}
          label="Set AI Model"
          onChange={handleChange}
        >

          <MenuItem value={1}>Model 1</MenuItem>
          <MenuItem value={2}>Model 2</MenuItem>
          <MenuItem value={3}>Model 3</MenuItem>
        </Select>
      </FormControl> */}

      <h5>User Historial: <button onClick={resetHistorial} >Reset Historial</button> </h5>


      {historial?.map((event) => <Link href={`/products/${event?.Product?.slug}`} >
        <a >
          {event.Interaction?.event_type} - Product: {event.Product?.product_name}  - {formatDateTime(event?.Interaction?.created_time)}
        </a>
      </Link>)}

    </div>
  )
}

export default Footer