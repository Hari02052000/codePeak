import { ProblemType } from "./types/problem.type";
import { ValidationError } from "../errors/error";

export class Problem {
  private constructor(private props: ProblemType) {}

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
      throw new ValidationError("Question number must be greater than 0");
    }

    if (!props.title.trim()) {
      throw new ValidationError("Title is required");
    }

    if (!props.difficulty.trim()) {
      throw new ValidationError("Difficulty is required");
    }

    if (!["easy", "medium", "hard"].includes(props.difficulty.toLowerCase())) {
      throw new ValidationError("Difficulty must be easy, medium or hard");
    }

    if (!props.description.trim()) {
      throw new ValidationError("Description is required");
    }

    if (!props.editorial.trim()) {
      throw new ValidationError("Editorial is required");
    }

    if (!props.questiontype.trim()) {
      throw new ValidationError("Question type is required");
    }

    return new Problem({
      id: "",
      ...props,
    });
  }

  static recreate(props: ProblemType) {
    if (!props.id.trim()) {
      throw new ValidationError("ID is required");
    }

    if (props.questionNumber <= 0) {
      throw new ValidationError("Question number must be greater than 0");
    }

    if (!props.title.trim()) {
      throw new ValidationError("Title is required");
    }

    if (!props.difficulty.trim()) {
      throw new ValidationError("Difficulty is required");
    }

    if (!["easy", "medium", "hard"].includes(props.difficulty.toLowerCase())) {
      throw new ValidationError("Difficulty must be easy, medium or hard");
    }

    if (!props.description.trim()) {
      throw new ValidationError("Description is required");
    }

    if (!props.editorial.trim()) {
      throw new ValidationError("Editorial is required");
    }

    if (!props.questiontype.trim()) {
      throw new ValidationError("Question type is required");
    }

    return new Problem(props);
  }

 get getProps() {
    return this.props;
  }
}