import { Army } from '@/types';
import classNames from 'classnames';
import { ComponentType, ReactNode } from 'react';

interface ArmyListItem {
  army: Army;
  className: string;
  children: ReactNode;
}

export const ArmyListItem: ComponentType<ArmyListItem> = ({ army, className, children }) => {
  return (
    <div className={classNames('flex gap-3 items-center', className)}>
      <strong>{army.name}</strong>
      {children}
    </div>
  );
};
