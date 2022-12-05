import Head from 'next/head';
import Description from '../components/Description';
import "react-data-table-component-extensions/dist/index.css";
import { columns, data } from '../components/ViewData.js';

function about() {
  const tableData = {
    columns,
    data
  };

  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
      <Description />
      <h1>View our data here</h1>
      
        <p>Maher was here</p>
        
    </div>  
  );
}

export default about