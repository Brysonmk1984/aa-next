'use client';

import { ComponentType } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

interface Auth {}

export const AuthPage: ComponentType<Auth> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('DATA', data);

  console.log(watch('example')); // watch input value by passing the name of it

  console.log({formState});
  

  return (
    <>
      <h1 className="block text-center">Login</h1>
      <div className="w-2/3 mx-auto">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        {/* register your input into the hook by invoking the "register" function */}
        <input className="mb-8  w-full" defaultValue="test" {...register('example')} placeholder="Enter Email" />

        {/* include validation with required or other standard HTML validation rules */}
        <input className="mb-8  w-full" {...register('exampleRequired', { required: true })}  placeholder="Enter Password" />
        {/* errors will return when field validation fails  */}
        {formState.errors.exampleRequired && <span>This field is required</span>}

        <input className="btn btn-transparent" type="submit"  />
        <h2 className='mt-8 text-lg'>Or <span className='link-style'>click here </span>to Sign Up</h2>
      </form>
      </div>
    </>
  );
};
