import React, { useEffect, useMemo, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../Input';
import { Options, RegisterFormData } from '../../types';
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
} from '../../features/address/country/countrySelector';
import { fetchCountries } from '../../features/address/country/countryThunks';
import {
    selectProvince,
    selectProvinceError,
    selectProvinceLoading,
} from '../../features/address/province/provinceSelector';
import { fetchProvinces } from '../../features/address/province/provinceThunks';
import {
    selectCity,
    selectCityError,
    selectCityLoading,
} from '../../features/address/city/citySelector';
import { fetchCities } from '../../features/address/city/cityThunks';

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<RegisterFormData>();
    const { handleRegister, success, loading } = useRegisterUser();

    const dispatch = useDispatch<AppDispatch>();

    // Form field watchers
    const password = watch('password');
    const country = watch('country');
    const province = watch('province');

    // Selectors
    const countries = useSelector(selectCountry);
    const countriesLoading = useSelector(selectCountryLoading);
    const countriesError = useSelector(selectCountryError);
    const provinces = useSelector(selectProvince);
    const provincesLoading = useSelector(selectProvinceLoading);
    const provincesError = useSelector(selectProvinceError);
    const cities = useSelector(selectCity);
    const citiesLoading = useSelector(selectCityLoading);
    const citiesError = useSelector(selectCityError);

    // Submit Handler
    const onSubmit: SubmitHandler<RegisterFormData> = useCallback(
        (data) => {
            handleRegister(data);
        },
        [handleRegister]
    );

    // Reset form on successful registration
    useEffect(() => {
        if (success) {
            reset();
            provinceOptions.length = 0;
            cityOptions.length = 0;
        }
    }, [success, reset]);

    // Fetch countries on mount
    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    // Handle error messages
    useEffect(() => {
        const errors = [
            { error: countriesError, message: 'Error fetching countries' },
            { error: provincesError, message: 'Error fetching provinces' },
            { error: citiesError, message: 'Error fetching cities' },
        ];
        errors.forEach(({ error, message }) => {
            if (error) {
                customToast({ message, type: 'error' });
            }
        });
    }, [countriesError, provincesError, citiesError]);

    // Generate options for select country
    const countryOptions = useMemo(
        () =>
            countries?.map((country) => ({
                id: country.id,
                label: country.name,
                value: country.iso2,
            })) || [],
        [countries]
    );

    // Generate options for select province
    let provinceOptions = useMemo(
        () =>
            provinces?.map((prov) => ({
                id: prov.id,
                label: prov.name,
                value: prov.iso2,
            })) || [],
        [provinces]
    );

    // Generate options for select city
    let cityOptions = useMemo(
        () =>
            cities?.map((cit) => ({
                id: cit.id,
                label: cit.name,
                value: cit.iso2,
            })) || [],
        [cities]
    );

    // Extract ISO codes
    const getIso2Value = useCallback(
        (options: Options[], label: string) =>
            options.find((opt: any) => opt.label === label)?.value,
        []
    );

    const countryIso2 = getIso2Value(countryOptions, country);
    const provinceIso2 = getIso2Value(provinceOptions, province);

    // Fetch provinces when country changes
    useEffect(() => {
        if (countryIso2) {
            dispatch(fetchProvinces(countryIso2));
        }
    }, [dispatch, countryIso2]);

    // Fetch cities when province changes
    useEffect(() => {
        if (provinceIso2 && countryIso2) {
            dispatch(fetchCities({ ciso: countryIso2, piso: provinceIso2 }));
        }
    }, [dispatch, provinceIso2, countryIso2]);

    return (
        <React.Fragment>
            {loading && <Loading />}
            <form
                className="h-auto w-[40rem] bg-white rounded-lg border pb-8 my-10"
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
                            rules={{
                                required: countryOptions.length
                                    ? 'required'
                                    : false,
                            }}
                            error={errors.country?.message}
                        />
                        <Select
                            name="province"
                            label={'State/Province'}
                            options={provinceOptions}
                            placeholder="Select State/Province"
                            register={register}
                            loading={provincesLoading}
                            rules={{
                                required: provinceOptions.length
                                    ? 'required'
                                    : false,
                            }}
                            error={errors.province?.message}
                        />
                        <Select
                            name="city"
                            label={'City'}
                            options={cityOptions}
                            placeholder="Select City"
                            register={register}
                            loading={citiesLoading}
                            rules={{
                                required: cityOptions.length
                                    ? 'required'
                                    : false,
                            }}
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
