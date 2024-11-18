import React, { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../Input';
import { RegisterFormData } from '../../types';
import { Select } from '../Select';
import { GENDER } from '../../lib/enum';
import { Button } from '../Button';
import {
    customToast,
    emailValidationRule,
    passwordMatchRule,
} from '../../lib/utils';
import { Loading } from '../Loading';
import { useRegisterUser } from '../../hooks/auth/useRegisterUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/root';
import {
    selectCountry,
    selectCountryError,
    selectCountryLoading,
} from '../../features/address/country/counrtySelector';
import { fetchCountries } from '../../features/address/country/countryThunks';
import {
    selectProvince,
    selectProvinceError,
    selectProvinceLoading,
} from '../../features/address/province/provinceSelector';
import { fetchProvinces } from '../../features/address/province/provinceThunks';

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<RegisterFormData>();
    const { handleRegister, success, loading } = useRegisterUser();

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        handleRegister(data);
    };
    const password = watch('password');
    const country = watch('country');

    useEffect(() => {
        success && reset();
    }, [success, reset]);

    const dispatch = useDispatch<AppDispatch>();
    const countries = useSelector(selectCountry);
    const countriesLoading = useSelector(selectCountryLoading);
    const countriesError = useSelector(selectCountryError);
    const province = useSelector(selectProvince);
    const provinceLoading = useSelector(selectProvinceLoading);
    const provinceError = useSelector(selectProvinceError);

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    if (countriesError) {
        customToast({
            message: countriesError,
            type: 'error',
        });
    }

    if (provinceError) {
        customToast({
            message: provinceError,
            type: 'error',
        });
    }
    const countryOptions = useMemo(() => {
        return (
            countries?.map((country) => ({
                id: country.id,
                label: country.name,
                value: country.iso2,
            })) || []
        );
    }, [countries]);

    useEffect(() => {
        if (country) {
            const iso2 = countryOptions
                .filter((c) => c.label === country)
                .map((c) => c.value)[0];
            dispatch(fetchProvinces(iso2));
        }
    }, [country, dispatch, countryOptions]);

    const provinceOptions =
        province?.map((prov) => ({
            id: prov.id,
            label: prov.name,
            value: prov.iso2,
        })) || [];

    return (
        <React.Fragment>
            {loading && <Loading />}
            <form
                className="h-17/20 w-[40rem] bg-white rounded-lg border"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full flex flex-col justify-center items-center pt-8 gap-1">
                    <span className="font-semibold text-3xl">
                        Registration Form
                    </span>
                    <span className="text-sm text-gray-600">
                        Fill out the form carefully for registration
                    </span>
                </div>
                <div className="w-full px-9 mt-10 flex flex-col gap-4">
                    <div className="flex gap-5">
                        <Input
                            name="firstname"
                            type="text"
                            label={'First Name'}
                            register={register}
                            rules={{ required: 'required' }}
                            error={errors.firstname?.message}
                        />
                        <Input
                            name="lastname"
                            type="text"
                            label={'Last Name'}
                            register={register}
                            rules={{ required: 'required' }}
                            error={errors.lastname?.message}
                        />
                    </div>
                    <div className="flex gap-5">
                        <Select
                            name="gender"
                            label={'Gender'}
                            options={GENDER}
                            placeholder="Select Gender"
                            register={register}
                            rules={{ required: 'required' }}
                            error={errors.gender?.message}
                        />
                        <Input
                            name="age"
                            type="number"
                            label={'Age'}
                            register={register}
                            rules={{ required: 'required' }}
                            error={errors.age?.message}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select
                            name="country"
                            label={'Country'}
                            options={countryOptions}
                            placeholder="Select Country"
                            register={register}
                            loading={countriesLoading}
                            rules={{ required: 'required' }}
                            error={errors.country?.message}
                        />
                        <Select
                            name="province"
                            label={'State/Province'}
                            options={provinceOptions}
                            placeholder="Select State/Province"
                            register={register}
                            loading={provinceLoading}
                            rules={{ required: 'required' }}
                            error={errors.province?.message}
                        />
                        <Select
                            name="city"
                            label={'City'}
                            options={GENDER}
                            placeholder="Select City"
                            register={register}
                            rules={{ required: 'required' }}
                            error={errors.city?.message}
                        />
                    </div>
                    <div className="flex">
                        <Input
                            name="email"
                            type="text"
                            label={'Email'}
                            register={register}
                            rules={emailValidationRule}
                            error={errors.email?.message}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-2">
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
                            <Input
                                name="confirmPassword"
                                type="password"
                                label={'Confirm Password'}
                                register={register}
                                rules={passwordMatchRule(password)}
                                error={errors.confirmPassword?.message}
                            />
                        </div>
                        <div>
                            <span className="text-sm">
                                Password must be at least 6 characters long
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                        <Button
                            buttonType="Primary"
                            className="w-60"
                            onClick={() => {}}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};
