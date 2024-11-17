export type CountryState = {
    data: CountryDataResponse | null;
    loading: boolean;
    error: string | null;
};

export type CountryDataResponse = {
    results?: Country[] | null;
};

type Country = {
    id: number;
    name: string;
    iso2: string;
};
