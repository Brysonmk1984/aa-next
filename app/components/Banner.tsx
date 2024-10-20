import { ComponentType } from 'react';
import { PiWarningFill } from 'react-icons/pi';

interface BannerProps {}

export const Banner: ComponentType<BannerProps> = () => {
  return (
    <div className="bg-red text-ivory px-4 py-2 flex items-center gap-2 border-b-off-black border-b-2">
      <span>
        <PiWarningFill />
      </span>
      <strong>Notice:</strong> Armies of Avalore is in early alpha stage. Features & functionality are still under
      development and may not work. Everything is subject to change.
    </div>
  );
};
