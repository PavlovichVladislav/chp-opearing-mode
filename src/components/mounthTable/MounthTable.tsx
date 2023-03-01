import { header, months } from "../../data/moutnTableData";
import TableInput from "../TableInput/TableInput";

const MounthTable = () => {
   const renderRow = (rowNumber: number, columnsNumber: number, dataType: number) => {
      const row = [];

      for (let i = 1; i < columnsNumber; i++) {
         row.push(
            <td key={i}>
               <TableInput monthNumber={rowNumber} valueType={i} dataType={dataType} />
            </td>
         );
      }

      return row;
   };

   const renderRows = (rowNames: string[], columnsNumber: number, dataType: number) => {
      return rowNames.map((rowName, i) => (
         <tr key={i}>
            <td>{rowName}</td>
            {renderRow(i, columnsNumber, dataType)}
         </tr>
      ));
   };

   const renderTable = (rowNames: string[], columnNames: string[], dataType: number) => {
      return (
         <table className="table">
            <thead>
               <tr>
                  {columnNames.map((name, i) => (
                     <th key={i}>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{renderRows(rowNames, columnNames.length, dataType)}</tbody>
         </table>
      );
   };

   return <>{renderTable(months, header, 1)}</>;
};

export default MounthTable;
