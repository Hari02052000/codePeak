export interface ProblemUtilsInterface {
    getquestionnumber:()=>Promise<number>;
    incrementquestionnumber:()=>Promise<boolean>;
}