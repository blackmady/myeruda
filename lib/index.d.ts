interface IOption {
    touches?: number;
    duration?: number;
    onlyDev?: boolean;
    onErrorShow?: boolean;
}
declare function myeruda(opt?: IOption): void;
export default myeruda;
