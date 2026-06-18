import { ProblemType } from "./types/problem";

export class Problem {
  private constructor(private props: ProblemType) {}

  setId(id: string) {
    this.props.id = id;
  }

  setQuestionNumber(questionNumber: number) {
    this.props.questionNumber = questionNumber;
  }

  setTitle(title: string) {
    this.props.title = title;
  }

  setDifficulty(difficulty: string) {
    this.props.difficulty = difficulty;
  }

  setDescription(description: string) {
    this.props.description = description;
  }

  setEditorial(editorial: string) {
    this.props.editorial = editorial;
  }

  setQuestionType(questiontype: string) {
    this.props.questiontype = questiontype;
  }

  static create(props: Omit<ProblemType, "id">) {
    if (props.questionNumber <= 0) {
      throw new Error("Question number must be greater than 0");
    }

    if (!props.title.trim()) {
      throw new Error("Title is required");
    }

    if (!props.difficulty.trim()) {
      throw new Error("Difficulty is required");
    }

    if (!["easy", "medium", "hard"].includes(props.difficulty.toLowerCase())) {
      throw new Error("Difficulty must be easy, medium or hard");
    }

    if (!props.description.trim()) {
      throw new Error("Description is required");
    }

    if (!props.editorial.trim()) {
      throw new Error("Editorial is required");
    }

    if (!props.questiontype.trim()) {
      throw new Error("Question type is required");
    }

    return new Problem({
      id: "",
      ...props,
    });
  }

  static recreate(props: ProblemType) {
    if (!props.id.trim()) {
      throw new Error("ID is required");
    }

    if (props.questionNumber <= 0) {
      throw new Error("Question number must be greater than 0");
    }

    if (!props.title.trim()) {
      throw new Error("Title is required");
    }

    if (!props.difficulty.trim()) {
      throw new Error("Difficulty is required");
    }

    if (!["easy", "medium", "hard"].includes(props.difficulty.toLowerCase())) {
      throw new Error("Difficulty must be easy, medium or hard");
    }

    if (!props.description.trim()) {
      throw new Error("Description is required");
    }

    if (!props.editorial.trim()) {
      throw new Error("Editorial is required");
    }

    if (!props.questiontype.trim()) {
      throw new Error("Question type is required");
    }

    return new Problem(props);
  }

  getProps() {
    return this.props;
  }
}