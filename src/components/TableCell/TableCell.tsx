import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   setBoilerValue,
   setMonthsTableValue,
   setTurbineValue,
} from "../../store/slices/yearTaskSlice";

interface TableCellProps {
   rowNumber: number;
   columnNumber: number;
   tableName: string;
}

const TableCell: FC<TableCellProps> = ({ rowNumber, columnNumber, tableName }) => {
   const [value, setValue] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
      switch (tableName) {
         case "months": {
            dispatch(
               setMonthsTableValue({
                  rowNumber: rowNumber,
                  value: Number(value),
                  columnNumber,
               })
            );
            break;
         }
         case "turbines": {
            dispatch(
               setTurbineValue({
                  rowNumber: rowNumber,
                  value,
                  columnNumber,
               })
            );
            break;
         }
         case "boilers": {
            dispatch(
               setBoilerValue({
                  rowNumber: rowNumber,
                  value,
                  columnNumber,
               })
            );
            break;
         }
      }
      // eslint-disable-next-line
   }, [value]);

   return (
      <td>
         <input
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
         />
      </td>
   );
};

export default TableCell;
