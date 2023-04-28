import React from "react";
import { BoilersTable, EquipmentList, MounthTable, TurbinesTable } from "../components";

const Equipment = () => {
   return (
      <>
         <h1 className="title">
            Выполнение годового задания по производству электрической и тепловой энергии по месяцам
            года
         </h1>
         <MounthTable />
         <TurbinesTable />
         <BoilersTable />
         <EquipmentList />
      </>
   );
};

export default Equipment;
