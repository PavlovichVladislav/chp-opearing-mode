import React, { useState } from "react";
import TableInput from "../TableInput/TableInput";

const BoilersTable = () => {
   // const boilers = [
   //    "Котел ст. № 3",
   //    "Котел ст. № 4",
   //    "Котел ст. № 5",
   //    "Котел ст. № 6",
   //    "Котел ст. № 7",
   //    "Котел ст. № 8",
   //    "Котел ст. № 9",
   //    "Котел ст. № 10",
   // ];

   const [strNum, setStrNum] = useState<number>(1);

   const header = [
      "Новосибирская ТЭЦ-2, станционный номер котла",
      "Марка котла",
      "Номинальная максимальная производительность, т/ч",
      "Число пусков сначала эксплуатации",
   ];

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
         {renderTable(header, 3)}
         <button className="button" onClick={() => setStrNum(strNum + 1)}>Добавить строку</button>
      </div>
   );
};

export default BoilersTable;
