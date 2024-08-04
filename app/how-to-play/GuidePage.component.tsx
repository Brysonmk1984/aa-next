'use client';

import { useUserContext } from '@/contexts';
import { getArmies } from '@/services';
import { Army } from '@/types';
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
          <li>
            <strong>Total Annihilation</strong>
          </li>
          <p>
            By far the most common way to win. With each side marching towards each other and engaging in battle, it is
            likely one side will eventually finish off the opposing force.
          </p>
          <li>
            <strong>Commander Capture</strong>
          </li>
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
              <th colSpan={6}>Weapon Type</th>
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
              <th colSpan={8}>Area of Effect</th>
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
      <p className="ml-6">
        Every Hour, your nation will gain income at a rate of <strong>100 + (max_campaign_level_completed * 10)</strong>
        . This means that the more levels completed in the campaign, the more income received every hour from that point
        forward.{' '}
        <em>
          eg: The fictitious "Marsh Walkers" nation just defeated the Level 10 campaign nation in battle. They will now
          collect income at a rate of 200 (100 + (10 * 10)).
        </em>
      </p>
      <p className="ml-6">
        In addition to collecting income, nations will also be taxed an upkeep charge depending on the size of their
        standing army. The larger the army, the larger the upkeep charge. Upkeep is applied immediately after the hourly
        income is updated. The upkeep is calculated as followed:
      </p>
      <table className="ml-6 mb-12">
        <thead>
          <tr>
            <th>Upkeep Bracket</th>
            <th>Warrior Count</th>
            <th>Cost of Upkeep per Hour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>None</td>
            <td>10k soldiers or less</td>
            <td>0 gold</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>Over 10k soldiers</td>
            <td>25 gold</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>Over 50k soldiers</td>
            <td>75 gold</td>
          </tr>
          <tr>
            <td>High</td>
            <td>Over 90k soldiers</td>
            <td>150 gold</td>
          </tr>
        </tbody>
      </table>
      <h4 className="ml-3">Enlisting Armies</h4>
      <div className="ml-6">
        <p>
          In order to progress, your nation will inevitably need to grow its army to face larger threats. There are two
          ways to do this:
        </p>
        <ol className="ml-12">
          <li>
            <strong>Enlist more warriors using gold</strong>
          </li>
          <p>
            As more income is collected, your nation will have more gold to spend enlisting warriors to grow your army.
            <Link href="warriors">Click here</Link> to enlist more warriors.
          </p>
          <li>
            <strong>Recruit warriors from a defeated nation</strong>
          </li>
          <p>
            Progressing through the campaign, you'll sometimes be rewarded with some warriors of the same type you've
            just defeated. These warriors will automatically be added to your standing army.
          </p>
        </ol>
      </div>
      <h4 className="ml-3">The Campaign</h4>
      <p className="ml-6">
        There is currently one game mode available - the campaign. You start out as a small faction attempting to live
        independently from other nations, but competing nations have the same idea. You'll need to fight to expand your
        territory by defeating neighboring nations. Your standing army starts out small; just a mere 100 militia men. In
        order to progress through the campaign your nation will have to face ever-larger and more diverse armies and so
        it will take time to acquire enough gold grow your forces to a point where you can defeat a neighboring nation.
        The first opposing nation call timidly call themselves "The Fretfull Ones" and have a standing army of 1,000
        Militia. What will it take to conquer these wheyfaced neighbors? <Link href="/campaign">Click here</Link> to go
        to the campaign.
      </p>

      <div className="my-16">
        <h2>Warriors of The Great Realm:</h2>
        <Link href="/warriors">Learn more about the combatants</Link>
      </div>

      {!user && (
        <div className="flex justify-center mt-12">
          <button className="btn btn-transparent" onClick={() => window.location.assign('/founding')}>
            Begin
          </button>
        </div>
      )}
    </>
  );
};
