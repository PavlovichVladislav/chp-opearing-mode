import { useState } from "react";
import { header } from "../../data/turbinesTableData";
import TableInput from "../TableInput/TableInput";

const TurbinesTable = () => {
   const [rowsNumber, setRowsNumber] = useState(1);

   const addRow = () => {
      setRowsNumber((rowsNumber) => rowsNumber + 1);
   };

   const renderRows = (columnsNumber: number) => {
      const rows = [];

      for (let i = 0; i < rowsNumber; i++) {
         rows.push(<tr key={i}>{renderRow(i, columnsNumber)}</tr>);
      }

      return rows;
   };

   const renderRow = (rowNumber: number, columnsNumber: number) => {
      const row = [];

      for (let i = 0; i < columnsNumber; i++) {
         row.push(
            <td key={i}>
               <TableInput rowNumber={rowNumber} columnNumber={i} tableName="turbines" />
            </td>
         );
      }

      return row;
   };

   const renderTable = (columns: string[]) => {
      return (
         <table className="table table_string">
            <thead>
               <tr>
                  {columns.map((name, i) => (
                     <th key={i}>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{renderRows(columns.length)}</tbody>
         </table>
      );
   };

   return (
      <>
         <h2 className="subtitle">Турбины</h2>
         {renderTable(header)}
         <button className="button" onClick={addRow}>
            Добавить строку
         </button>
      </>
   );
};

export default TurbinesTable;
