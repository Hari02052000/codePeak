import { testcasetype } from "./types/testcase";
export class TestCase {
  private constructor(private props: testcasetype) {}
  setId(id: string) {
    this.props.id = id;
  }

  setInput(input: string) {
    this.props.input = input;
  }
  setOutput(output: string) {
    this.props.output = output;
  }
  setExplanation(explanation: string) {
    this.props.explanation = explanation;
  }
  setProblemId(problemId: string) {
    this.props.problemId = problemId;
  }
  static create(props: Omit<testcasetype, "id">) {
    if (!props.input.trim()) {
      throw new Error("Input is required");
    }

    if (!props.output.trim()) {
      throw new Error("Output is required");
    }

    if (!props.explanation.trim()) {
      throw new Error("Explanation is required");
    }

    if (!props.problemId.trim()) {
      throw new Error("Problem ID is required");
    }

    if (props.input.length > 1000) {
      throw new Error("Input is too long");
    }

    return new TestCase({ id: "", ...props });
  }
  static recreate(props: testcasetype) {
    if (!props.id.trim()) {
      throw new Error("ID is required");
    }
    if (!props.input.trim()) {
      throw new Error("Input is required");
    }

    if (!props.output.trim()) {
      throw new Error("Output is required");
    }

    if (!props.explanation.trim()) {
      throw new Error("Explanation is required");
    }

    if (!props.problemId.trim()) {
      throw new Error("Problem ID is required");
    }

    if (props.input.length > 1000) {
      throw new Error("Input is too long");
    }

    return new TestCase(props);
  }
}
