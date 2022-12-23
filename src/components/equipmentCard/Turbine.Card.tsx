import React, { FC } from "react";
import { ITurbine } from "../../models/turbine";

interface TurbineCardProps {
    turbine: ITurbine;
 }

const TurbineCard: FC<TurbineCardProps> = ({turbine}) => {
   return (
      <div className="card">
         <div className="card__container">
            <h4>
               <b>{turbine.name}, марка котла: {turbine.type}</b>
            </h4>
            <p>Установленная электрическая мощность: {turbine.electricityPower} МВТ</p>
         </div>
      </div>
   );
};

export default TurbineCard;