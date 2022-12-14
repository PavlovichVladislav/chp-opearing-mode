import React, { useState } from "react";
import { header } from "../data/boilersTableData";
import TableInput from "../TableInput/TableInput";

const BoilersTable = () => {
   const [strNum, setStrNum] = useState<number>(1);

   const renderStrings = (columnsNum: number, dataType: number) => {
      const res = [];

      for (let i = 0; i < strNum; i++) {
         res.push(<tr>{renderString(i, columnsNum, dataType)}</tr>);
      }

      return res;
   };

   const renderString = (
      stringIndex: number,
      columnsNum: number,
      dataType: number
   ) => {
      const res = [];

      for (let i = 0; i < columnsNum; i++) {
         res.push(
            <td>
               <TableInput
                  monthNumber={stringIndex}
                  valueType={i}
                  key={i}
                  dataType={dataType}
               />
            </td>
         );
      }

      return res;
   };

   const renderTable = (columns: string[], dataType: number) => {
      return (
         <table className="table table_string">
            <thead>
               <tr>
                  {columns.map((name) => (
                     <th>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{renderStrings(columns.length, dataType)}</tbody>
         </table>
      );
   };

   return (
      <div>
         <h2 className="subtitle" >Бойлеры</h2>
         {renderTable(header, 3)}
         <button className="button" onClick={() => setStrNum(strNum + 1)}>Добавить строку</button>
      </div>
   );
};

export default BoilersTable;
