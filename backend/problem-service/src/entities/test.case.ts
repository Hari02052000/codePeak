import { ValidationError } from "../errors/error";
import { testcasetype } from "./types/testcase";

export class TestCase {
  private constructor(private props: testcasetype) {}
  setInput(input: string) {
    this.props.input = input;
  }
  setOutput(output: string) {
    this.props.output = output;
  }
  setExplanation(explanation: string) {
    this.props.explanation = explanation;
  }
  static create(props: Omit<testcasetype, "id">) {
    if (!props.input.trim()) {
      throw new ValidationError("Input is required");
    }

    if (!props.output.trim()) {
      throw new ValidationError("Output is required");
    }

    if (!props.explanation.trim()) {
      throw new ValidationError("Explanation is required");
    }

    if (!props.problemId.trim()) {
      throw new ValidationError("Problem ID is required");
    }

    if (props.input.length > 1000) {
      throw new ValidationError("Input is too long");
    }

    return new TestCase({ id: "", ...props });
  }
  static recreate(props: testcasetype) {
    if (!props.id.trim()) {
      throw new ValidationError("ID is required");
    }
    if (!props.input.trim()) {
      throw new ValidationError("Input is required");
    }

    if (!props.output.trim()) {
      throw new ValidationError("Output is required");
    }

    if (!props.explanation.trim()) {
      throw new ValidationError("Explanation is required");
    }

    if (!props.problemId.trim()) {
      throw new ValidationError("Problem ID is required");
    }

    if (props.input.length > 1000) {
      throw new ValidationError("Input is too long");
    }

    return new TestCase(props);
  }
  get getProps(){
    return this.props;
  }


}
