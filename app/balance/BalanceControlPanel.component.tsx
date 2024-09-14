'use client';

import { BALANCE_TESTING_PASSWORD, ENVIRONMENT } from '@/configs/environment.config';
import { useGameContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

interface BalanceControlPanel {}

export const BalanceControlPanel: ComponentType<BalanceControlPanel> = () => {
  const { armies } = useGameContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const isProd = ENVIRONMENT === 'prod';
  const [disablePage, setDisablePage] = useState(isProd ? true : false);

  useEffect(() => {
    if (isProd) {
      const result = prompt('Enter Password');

      if (result !== BALANCE_TESTING_PASSWORD) {
        return router.push('/');
      }
      setDisablePage(false);
    }
  }, []);
  console.log('ASD', armies);

  return (
    <div>
      {isProd && disablePage && <div className="bg-[#000] w-full h-full absolute top-0 left-0 z-100 opacity-60"></div>}
      <form>
        <div className="grid grid-cols-2 gap-3 border-b-2">
          <div className="border-r-2 pr-4">
            <h2 className="text-center border-b-2">East</h2>
          </div>
          <div>
            <h2 className="text-center border-b-2">West</h2>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button type="submit" className="btn btn-transparent ">
            Run
          </button>
        </div>
      </form>
    </div>
  );
};
