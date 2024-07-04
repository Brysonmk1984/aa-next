'use client';
import { useNation } from '@/hooks/nation.hook';
import { CampaignNationProfile } from '@/types';

interface PreBattlePageProps {
  opposingNationDetails: CampaignNationProfile;
}

export const PreBattlePage = ({ opposingNationDetails }: PreBattlePageProps) => {
  const { nation, armies } = useNation();

  console.log(opposingNationDetails);

  return (
    <>
      <h1 className="block">Scouting Report</h1>
      <div>asd</div>
    </>
  );
};
