import React from 'react'
import { AiFillInstagram, AiOutlineGithub, AiFillCodeSandboxSquare } from 'react-icons/ai'

import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
const Footer = () => {
  const [AIModel, setAIModel] = React.useState(1);

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
      <FormControl sx={{ m: 1, minWidth: 2000 }}>

      <InputLabel id="demo-simple-select-label">Change Recommendation</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={AIModel}
          label="Set AI Model"
          onChange={handleChange}
        >
        <MenuItem value={1}>
          <em>Change Recommendation Model</em>
        </MenuItem>

          <MenuItem value={10}>Model 1</MenuItem>
          <MenuItem value={20}>Model 2</MenuItem>
          <MenuItem value={30}>Model 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Footer