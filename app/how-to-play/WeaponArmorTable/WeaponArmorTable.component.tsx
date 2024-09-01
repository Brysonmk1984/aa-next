import { WeaponArmorValues } from '@/types/game-data.type';
import { capitalize } from '@/utils';
import { ComponentType } from 'react';

interface WeaponArmorTableProps {
  weaponArmorValues: WeaponArmorValues;
}

export const WeaponArmorTable: ComponentType<WeaponArmorTableProps> = ({ weaponArmorValues: wav }) => {
  return (
    <table className="mb-20">
      <thead>
        <tr>
          <th></th>
          <th colSpan={6}>Weapon Type</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Edged</th>
          <th>Piercing</th>
          <th>Blunt</th>
          <th>Crushing</th>
          <th>Magic</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className=" border-none"></td>
          <td>
            <strong>Unarmored</strong>
          </td>
          <td>{wav['edged-unarmored']}</td>
          <td>{wav['piercing-unarmored']}</td>
          <td>{wav['blunt-unarmored']}</td>
          <td>{wav['crushing-unarmored']}</td>
          <td>{wav['magic-unarmored']}</td>
        </tr>
        <tr>
          <td className=" border-none">
            <strong>Armor Type</strong>
          </td>
          <td>
            <strong>Leather</strong>
          </td>
          <td>{wav['edged-leather']}</td>
          <td>{wav['piercing-leather']}</td>
          <td>{wav['blunt-leather']}</td>
          <td>{wav['crushing-leather']}</td>
          <td>{wav['magic-leather']}</td>
        </tr>
        <tr>
          <td className=" border-none"></td>
          <td>
            <strong>Chain Mail</strong>
          </td>
          <td>{wav['edged-chain']}</td>
          <td>{wav['piercing-chain']}</td>
          <td>{wav['blunt-chain']}</td>
          <td>{wav['crushing-chain']}</td>
          <td>{wav['magic-chain']}</td>
        </tr>
        <tr>
          <td className=" border-none"></td>
          <td>
            <strong>Plate Mail</strong>
          </td>
          <td>{wav['edged-plate']}</td>
          <td>{wav['piercing-plate']}</td>
          <td>{wav['blunt-plate']}</td>
          <td>{wav['crushing-plate']}</td>
          <td>{wav['magic-plate']}</td>
        </tr>
      </tbody>
    </table>
  );
};
