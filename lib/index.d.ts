declare global {
    interface Window {
        eruda: any;
    }
}
interface IOption {
    preload?: boolean;
    touches?: number;
    duration?: number;
    onlyDev?: boolean;
    prodConsole?: boolean;
    onErrorShow?: boolean;
    menu?: {
        [p: string]: null | {
            label: string;
            fn: (...args: any) => void;
        };
    };
}
declare function myeruda(opt?: IOption): void;
export default myeruda;
