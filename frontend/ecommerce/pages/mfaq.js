
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




function mfaq() {
  
const FAQQuestions = [
  {"title": "What is this Application?", "description":"This is a demo application with the objective of presenting our AI recommendation model."},
 
]

const FakeFAQ = [
  {"title": "How do I place an order ?", "description":"To place an order you can speak to one of our Client Advisors on: WhatsApp and/or call us at +917-323-1351. Email us at maher@ecommerce.com"},
 {"title": "Can I still order a past season item?", "description":"Yes you can, for further details please contact our Client Care Team who will be able to advise further."},
]
  

return (
  <div className="App">
    <h1>About</h1>
    <br/>

    {FAQQuestions.map((faqKey) => {
      return(<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {faqKey["title"]}
        </AccordionSummary>
        <AccordionDetails>
       
        {faqKey["description"]}
        </AccordionDetails>
      </Accordion>)
    })}


   <br/>
    <h3>Fake FAQ Questions</h3>

    <br/>
    
    {FakeFAQ.map((faqKey) => {
      return(<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {faqKey["title"]}
        </AccordionSummary>
        <AccordionDetails>
       
        {faqKey["description"]}
        </AccordionDetails>
      </Accordion>)
    })}
    
  </div>
    
  );
}


export default mfaq;




