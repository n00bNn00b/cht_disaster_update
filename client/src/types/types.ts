export interface Services {
    _id: string;
    teamName: string;
    workingArea: string;
    contact: string;
    providedService: string;
    status: string;
    date: string;
    isVerifiedByAdmin: boolean;
    __v?: number
}

export interface Areas {
    _id: string;
    areaName: string;
    date: string;
    __v: number
}

export interface Victim {
    _id: string;
    victimName?: string;
    familyMember?: number;
    contact?: string;
    address?: string;
    union?: string;
    subDistrict?: string;
    district?: string;
    status?: string;
    date: string;
    __v: number
}