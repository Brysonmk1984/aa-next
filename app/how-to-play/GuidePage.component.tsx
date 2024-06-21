'use client';

import { useUserContext } from '@/contexts';
import { getArmies } from '@/services';
import { Army } from '@/types';
import { toKebabCase } from '@/utils';
import { getArmyImage } from '@/utils/army-image-map.util';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const GuidePage = () => {
  const { user } = useUserContext();
  const [armies, setArmies] = useState<Army[]>([]);

  useEffect(() => {
    (async () => {
      const armies = await getArmies();
      setArmies(armies);
    })();
  }, []);

  return (
    <>
      <h1>War Compendium</h1>
      <h2>The rules of The Great Realm</h2>

      <h3>In Battle</h3>
      <h4 className="ml-3">The Battlefield</h4>
      <p className="ml-6">
        Your army will face off against the opposing army on a battlefield 300 meters in length. It can be convenient to
        think of the battlefield as a number line where the eastern army begins at -150m and the western army starts at
        150m.
      </p>
      <h4 className="ml-3">Turns</h4>
      <p className="ml-6">
        The battle is automated and turn-based, with the eastern army taking action first, followed by the western army.
        Each turn, every combatant will take one of two actions: <strong>march</strong> or <strong>attack</strong>. If
        an opposing warrior is within range, the aggressor will attack, otherwise they will march. The turn is over when
        all combatants take their action, then the opposing side&apos;s turn begins.
      </p>
      <h4 className="ml-3">Blocking, Dodging & Hitting</h4>
      <div className="ml-6">
        If an aggressor attacks rather than marches, then one of three possible outcomes happen to a defender:
        <ol className="ml-12">
          <li>
            <strong>Block -</strong> The defender blocked the attack. This can happen if the defender carries a shield
            and has a <strong>shield rating</strong>&nbsp; or their <strong>armor type</strong> countered the{' '}
            <strong>weapon type</strong>. You can see the blocking rate under the "Weapon & Armor Types" section below.
          </li>
          <li>
            <strong>Dodge -</strong> The defender dodged the attack. The probability to dodge an attack is based on the
            defender&apos;s&nbsp;
            <strong>agility</strong> rating calculated against the attackers <strong>accuracy</strong> rating.
          </li>
          <li>
            <strong>Hit -</strong>If the defender fails to dodge and fails to block, then the aggressor&apos;s strike
            hit the defender. Hits are considered kills and the defending warrior is removed from further turns.
          </li>
        </ol>
      </div>
      <h4 className="ml-3">Win Conditions</h4>
      <div className="ml-6">
        There are two ways to win a battle:
        <ol className="ml-12">
          <li>Total Annihilation</li>
          <p>
            By far the most common way to win. With each side marching towards each other and engaging in battle, it is
            likely one side will eventually finish off the opposing force.
          </p>
          <li>Commander Capture</li>
          <p>
            An alternative win condition. If a ground force reaches the enemy commander, located at 150m for the eastern
            army or -150. for the western army, then the commander is considered captured and the battle ends in favor
            of the army that reached the commander. This is only possibly if the losing side only has air-borne warriors
            remaining and the winning side has ground soldiers that can continue to march and reach the commander.
          </p>
        </ol>
      </div>
      <h4 className="ml-3">Weapon & Armor Types</h4>
      <div className="ml-6">
        <strong>Chance to Hit Percentage:</strong>
        <table className="mb-20">
          <thead>
            <tr>
              <th></th>
              <th colspan="6">Weapon Type</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Blunt</th>
              <th>Edged</th>
              <th>Piercing</th>
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
              <td>0.75</td>
              <td>1.0</td>
              <td>1.0</td>
              <td>0.25</td>
              <td>0.25</td>
            </tr>
            <tr>
              <td className=" border-none">
                <strong>Armor Type</strong>
              </td>
              <td>
                <strong>Leather</strong>
              </td>
              <td>0.75</td>
              <td>0.75</td>
              <td>0.75</td>
              <td>0.5</td>
              <td>0.5</td>
            </tr>
            <tr>
              <td className=" border-none"></td>
              <td>
                <strong>Chain Mail</strong>
              </td>
              <td>0.5</td>
              <td>0.5</td>
              <td>0.6</td>
              <td>0.75</td>
              <td>1.0</td>
            </tr>
            <tr>
              <td className=" border-none"></td>
              <td>
                <strong>Plate Mail</strong>
              </td>
              <td>0.25</td>
              <td>0.25</td>
              <td>0.1</td>
              <td>1.0</td>
              <td>0.75</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="ml-3">Range, AoE & Spread</h4>
      <p className="ml-6">
        Every Warrior type has a range at which they can engage an enemy. The most common is 5m which is considered the
        limits of melee range. Some skirmishers have a slightly longer range, giving them an advantage since most
        warrirors will still need to march forward to get within their own attacking range. Then there&apos;s the truly
        ranged warriors who fight with bow and arrow and can fire their missles with a range of up to 150m. Finally,
        some warriors are flying units, and can only be reached by enemies who have a range of at least 15m.
      </p>
      <div className="ml-6">
        Some Warriors have an <strong>area of effect</strong> (AoE) value. This allows them to potentially hit multiple
        enemies in a single attack depending on the enemy&apos;s <strong>spread</strong> value (how spread-out they are
        in their battle formation). Potential aoe values are between 0.0 and 3.0 (meters). Potential spread values are
        between 1.0 and 3.0 meters; see the effects of an attack on an opposing force below
        <table className="my-20">
          <thead>
            <tr>
              <th></th>
              <th colspan="8">Area of Effect</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>0.0</th>
              <th>0.5</th>
              <th>1.0</th>
              <th>1.5</th>
              <th>2.0</th>
              <th>2.5</th>
              <th>3.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" border-none"></td>
              <td>
                <strong>1.0</strong>
              </td>
              <td>1</td>
              <td>2</td>
              <td>5</td>
              <td>9</td>
              <td>13</td>
              <td>20</td>
              <td>33</td>
            </tr>
            <tr>
              <td className=" border-none">
                <strong>Spread</strong>
              </td>
              <td>
                <strong>2.0</strong>
              </td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>5</td>
              <td>7</td>
              <td>9</td>
            </tr>
            <tr>
              <td className=" border-none"></td>
              <td>
                <strong>3.0</strong>
              </td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>2</td>
              <td>3</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="ml-6"></p>
      <h3>Out of Battle</h3>
      <h4 className="ml-3">Income & Upkeep</h4>
      <h4 className="ml-3">Enlisting Armies</h4>
      <h4 className="ml-3">The Campaign</h4>

      <div className="my-16">
        <h2>Warriors of The Great Realm:</h2>
        <Link href="/warriors">Learn more about the combatants</Link>
      </div>

      {!user && (
        <div className="flex justify-center mt-12">
          <button className="btn btn-red" onClick={() => window.location.assign('/founding')}>
            Begin
          </button>
        </div>
      )}
    </>
  );
};
