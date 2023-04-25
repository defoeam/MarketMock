import { Stock } from "./Stocks"

export interface User{
    userId:number,
    money_current:number,
    stock:Stock[]
}