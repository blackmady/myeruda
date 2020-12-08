interface IOption {
    key: string;
    envs: string[];
    setting?: object;
    mode: number;
}
declare function myeruda(opt?: IOption | Function): any;
export default myeruda;
