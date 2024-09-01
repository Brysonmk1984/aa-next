import { AoeSpreadValues } from '@/types/game-data.type';
import { ComponentType } from 'react';
import { AoeSpreadRow } from './AoeSpreadRow.component';

interface AoeSpreadTable {
  aoeSpreadValues: AoeSpreadValues;
}

export const AoeSpreadTable: ComponentType<AoeSpreadTable> = ({ aoeSpreadValues }) => {
  return (
    <table className="my-20">
      <thead>
        <tr>
          <th></th>
          <th colSpan={8}>Area of Effect</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          {aoeSpreadValues['1'].map((aoeTuple) => (
            <td key={aoeTuple[0]}>{aoeTuple[0].toFixed(1)}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(aoeSpreadValues).map((spreadEntry, i) => (
          <AoeSpreadRow key={i} spreadEntry={spreadEntry} />
        ))}
      </tbody>
    </table>
  );
};
