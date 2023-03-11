import { FC } from "react";
import { ITurbine } from "../../models/tableDataModels";

interface TurbineCardProps {
    turbine: ITurbine;
 }

const TurbineCard: FC<TurbineCardProps> = ({turbine}) => {
   return (
      <div className="card">
         <div className="card__container">
            <h4>
               <b>{turbine.name}, марка турбины: {turbine.type}</b>
            </h4>
            <p>Установленная электрическая мощность: {turbine.electricityPower} МВТ</p>
            <p>Тепловая мощность: {turbine.thermalPower} Гкал/час</p>
            <p>Выработка электроэнергии: {turbine.electricityPower} т/ч</p>
         </div>
      </div>
   );
};

export default TurbineCard;