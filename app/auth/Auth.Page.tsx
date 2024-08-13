'use client';

import { ComponentType, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

interface Auth {}

export const AuthPage: ComponentType<Auth> = ({}) => {
  const [displaySignUpView, setDisplaySignUpView] = useState(false);
  const { register, handleSubmit, watch, formState } = useForm<Inputs>();
  const { register: signInRegister, handleSubmit: signInSubmit, formState: signInFormState } = useForm<Inputs>();
  console.log(watch('example')); // watch input value by passing the name of it

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('Log in Data', data);

  const onSignInSubmit: SubmitHandler<Inputs> = (data) => console.log('Sign Up Data', data);

  const toggleView = () => {
    setDisplaySignUpView((val) => !val);
  };

  return displaySignUpView ? (
    <>
      <h1 className="block text-center">Sign Up</h1>
      <div className="w-2/3 mx-auto mt-8">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSignInSubmit)} className="flex flex-col items-left gap-3 text-center">
          <label className="flex justify-end align-baseline items-end">
            <span>Email</span>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="w-full" defaultValue="test" {...signInRegister('example')} />
          </label>

          <label className="flex justify-end align-baseline items-end">
            <span>Password</span>
            {/* include validation with required or other standard HTML validation rules */}
            <input className="w-full" type="password" {...signInRegister('exampleRequired', { required: true })} />
          </label>
          {/* errors will return when field validation fails  */}
          {formState.errors.exampleRequired && <span>This field is required</span>}

          <label className="flex justify-end align-baseline items-end">
            <span className="text-nowrap">Confirm Password</span>
            {/* include validation with required or other standard HTML validation rules */}
            <input className=" w-full" type="password" {...signInRegister('exampleRequired', { required: true })} />
          </label>
          {/* errors will return when field validation fails  */}
          {formState.errors.exampleRequired && <span>This field is required</span>}

          <input className="btn btn-transparent mt-12" type="submit" />
          <h2 className="mt-8 text-lg">
            Or{' '}
            <span className="link-style" onClick={toggleView}>
              click here{' '}
            </span>
            to Log In
          </h2>
        </form>
      </div>
    </>
  ) : (
    <>
      <h1 className="block text-center">Login</h1>
      <div className="w-2/3 mx-auto mt-8">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-left gap-3 text-center">
          <label className="flex justify-end align-baseline items-end">
            <span>Email</span>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="w-full" defaultValue="test" {...register('example')} />
          </label>

          <label className="flex justify-end align-baseline items-end">
            <span>Password</span>
            {/* include validation with required or other standard HTML validation rules */}
            <input className=" w-full" {...register('exampleRequired', { required: true })} />
          </label>
          {/* errors will return when field validation fails  */}
          {formState.errors.exampleRequired && <span>This field is required</span>}

          <input className="btn btn-transparent mt-12" type="submit" />
          <h2 className="mt-8 text-lg">
            Or{' '}
            <span className="link-style" onClick={toggleView}>
              click here{' '}
            </span>
            to Sign Up
          </h2>
        </form>
      </div>
    </>
  );
};
