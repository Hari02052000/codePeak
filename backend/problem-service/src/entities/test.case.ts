
import { testcasetype } from "./types/testcase";
export class TestCase {


   private constructor(private props: testcasetype) {
   

  }
   setId(id: string) {
    this.props.id = id;
  }
  
   setInput(input: string) {
    
    this.props.input = input;
  }
    setOutput(output: string) {
    this.props  .output = output;
  }
    setExplanation(explanation: string) {
    this.props.explanation = explanation;
  }
   setProblemId(problemId: string) {
    this.props.problemId = problemId;
  }
  static create(props:  Omit< testcasetype, "id">) {
    
    if ( !props.input || !props.output || !props.problemId) {
      throw new Error("Missing required fields");

    }

    return new TestCase({id:"",...props});

  }
  static recreate (props: testcasetype) {
    return new TestCase(props);
  }


}