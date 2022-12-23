import React, { FC } from "react";
import { IBoiler } from "../../models/boiler";

interface EquipmentCardProps {
   boiler: IBoiler;
 }

const EquipmentCard: FC<EquipmentCardProps> = ({boiler}) => {
   return (
      <div className="card">
         <div className="card__container">
            <h4>
               <b>{boiler.name}, марка котла: {boiler.type}</b>
            </h4>
            <p>Теплопроизводительность: {boiler.perfomance} т/ч</p>
         </div>
      </div>
   );
};

export default EquipmentCard;
