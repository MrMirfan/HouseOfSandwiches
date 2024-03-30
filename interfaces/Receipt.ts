import { MenuCard } from "./MenuCard";

export interface Receipt extends Object
{
    Orders: { item: MenuCard; quantity: number }[];
    Total: number
}