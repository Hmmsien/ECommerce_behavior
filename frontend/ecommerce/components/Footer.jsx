import React from 'react'
import { AiFillInstagram, AiOutlineGithub, AiFillCodeSandboxSquare } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container' >
      <p>2022 CTP data Science Project</p>

      <p className="icons">
        {/* <AiFillInstagram /> */}
        <a target="_blank" href="https://github.com/Hmmsien/ECommerce_behavior"> <AiOutlineGithub /> </a>
        <a target="_blank" href="https://www.figma.com/file/bMmUmMtKJt9aUwKWHKW5LH/Data-Science?node-id=0%3A1"> < AiFillCodeSandboxSquare /></a>
      </p>

    </div>
  )
}

export default Footer