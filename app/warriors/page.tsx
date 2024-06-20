import { PageTemplate } from '@/components/PageTemplate.component';
import { getArmies } from '@/services';
import { toKebabCase } from '@/utils';
import { getArmyImage } from '@/utils/army-image-map.util';
import Image from 'next/image';
import Link from 'next/link';

export default async function WarriorsPage() {
  const armies = await getArmies();
  return (
    <PageTemplate>
      <h1>Warriors of The Great Realm:</h1>

      <div className="flex flex-wrap items-center justify-around">
        {armies
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((armies) => {
            const { id, name } = armies;

            return (
              <div key={id} className="w-[300px]">
                <div className="relative w-[300px] h-[350px]">
                  <Link href={`/warriors/${encodeURIComponent(toKebabCase(name))}`}>
                    <Image src={`/images/armies/${getArmyImage(name)}.webp`} alt={name} objectFit="cover" fill />
                  </Link>
                </div>
                <div className="text-center">
                  <h3 className=" text-2xl">{name}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </PageTemplate>
  );
}
