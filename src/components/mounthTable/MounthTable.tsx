import React from "react";
import { header, months } from "../data/moutnTableData";
import TableInput from "../TableInput/TableInput";

const MounthTable = () => {
   const renderString = (string: number, columns: number, dataType: number) => {
      const res = [];

      for (let i = 1; i < columns; i++) {
         res.push(
            <td>
               <TableInput
                  monthNumber={string}
                  valueType={i}
                  key={i}
                  dataType={dataType}
               />
            </td>
         );
      }

      return res;
   };

   const renderTable = (
      stringNames: string[],
      columnNames: string[],
      dataType: number
   ) => {
      return (
         <table className="table">
            <thead>
               <tr>
                  {columnNames.map((name) => (
                     <th>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {stringNames.map((stringName, index) => (
                  <tr>
                     <td>{stringName}</td>
                     {renderString(index, columnNames.length, dataType)}
                  </tr>
               ))}
            </tbody>
         </table>
      );
   };

   return <div>{renderTable(months, header, 1)}</div>;
};

export default MounthTable;
