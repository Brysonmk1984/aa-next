import { PageTemplate } from '@/components/PageTemplate.component';
import { getArmies } from '@/services';
import { toKebabCase } from '@/utils';
import { getArmyImage } from '@/utils/army-image-map.util';
import Image from 'next/image';

type PageProps = {
  params: {
    warrior: string;
  };
};

export default async function Page({ params }: PageProps) {
  const armies = await getArmies();

  let matchingArmy = armies.find((army) => {
    if (toKebabCase(army.name) === decodeURIComponent(params.warrior)) {
      return army.name;
    }
  });

  if (!matchingArmy) {
    throw new Error('No Matching Army');
  }

  return (
    <PageTemplate>
      <h1 className="block">{matchingArmy.name}</h1>

      <div className="flex">
        <div className="relative w-[550px] h-[750px]">
          <Image
            src={`/images/armies/${getArmyImage(matchingArmy.name)}.webp`}
            alt={matchingArmy.name}
            objectFit="cover"
            fill
          />
        </div>
        <div>
          <dl>
            {Object.entries(matchingArmy).map(([k, v], i) => {
              if (k !== 'lore') {
                return (
                  <div key={i} className="flex justify-between mb-1">
                    <dt className=" font-bold">{k}:</dt>
                    <dt className=" max-w-[250px] text-lg">{typeof v === 'boolean' ? JSON.stringify(v) : v}</dt>
                  </div>
                );
              }
            })}
          </dl>
          <p className="w-[450px] mt-12 text-lg">{matchingArmy.lore}</p>
        </div>
      </div>
    </PageTemplate>
  );
}
