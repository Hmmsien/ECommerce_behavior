import Head from 'next/head';
import Description from '../components/Description';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
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
      
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
    </div>  
  );
}

export default about