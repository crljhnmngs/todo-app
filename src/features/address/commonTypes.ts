export type AddressState = {
    data: AddresssDataResponse | null;
    loading: boolean;
    error: string | null;
};

export type AddresssDataResponse = Address[];

type Address = {
    id: number;
    name: string;
    iso2: string;
};
