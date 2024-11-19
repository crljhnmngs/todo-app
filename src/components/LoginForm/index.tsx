import React, { useEffect, useCallback } from 'react';
import { Input } from '../Input';
import { LoginFormData } from '../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidationRule } from '../../lib/utils';
import { Button } from '../Button';
import { useLoginUser } from '../../hooks/auth/useLoginUser';
import { Loading } from '../Loading';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';

export const LoginForm = () => {
    const { handleLogin, success, loading } = useLoginUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormData> = useCallback(
        (data) => {
            handleLogin(data);
        },
        [handleLogin]
    );

    useEffect(() => {
        if (success) {
            navigate(ROUTES.TODO);
        }
    }, [success, navigate]);

    //IMPROVEMENTS:
    //Add forget password or email option
    //Add sign in to google account option

    return (
        <React.Fragment>
            {loading && <Loading />}
            <form
                className="h-auto w-[30rem] bg-white rounded-lg border pb-8 my-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full flex flex-col justify-center items-center pt-8 gap-1">
                    <span className="font-semibold text-3xl">
                        Login to your account
                    </span>
                </div>
                <div className="w-full px-9 mt-11 flex flex-col gap-4">
                    <Input
                        name="email"
                        type="text"
                        label={'Email'}
                        register={register}
                        rules={emailValidationRule}
                        error={errors.email?.message}
                    />
                    <Input
                        name="password"
                        type="password"
                        label={'Password'}
                        register={register}
                        rules={{
                            required: 'required',
                            minLength: {
                                value: 6,
                                message: 'invalid',
                            },
                        }}
                        error={errors.password?.message}
                    />
                </div>
                <div className="flex justify-center items-center mt-9">
                    <Button
                        buttonType="Primary"
                        className="w-60"
                        onClick={() => {}}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
};
