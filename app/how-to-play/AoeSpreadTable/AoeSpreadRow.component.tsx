import { ComponentType } from 'react';

interface AoeSpreadRowProps {
  spreadEntry: [string, Array<[number, number]>];
}

export const AoeSpreadRow: ComponentType<AoeSpreadRowProps> = ({ spreadEntry }) => {
  const [spread, aoeList] = spreadEntry;

  return (
    <tr>
      <td className=" border-none">{parseInt(spread) === 2 && 'Spread'}</td>
      <td>
        <strong>{parseInt(spread).toFixed(1).toString()}</strong>
      </td>
      {aoeList.map((aoeItem) => (
        <td key={aoeItem[0]}>{aoeItem[1]}</td>
      ))}
    </tr>
  );
};
