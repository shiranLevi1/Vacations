
export interface IVacation{
    id: number;
    description: string;
    image: string;
    location: string;
    dateFrom: string;
    dateTo: string;
    price: number;
    isFollowed?: boolean;
    amountOfFollowers?: number;
}