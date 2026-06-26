export interface ProblemUtilsInterface {
    getquestionnumber:()=>Promise<number>;
    incrementquestionnumber:(id: string)=>Promise<boolean>;
}