
import { Router } from "express";
import { getQuestions ,createQuestion,getQuestionById, deleteQuestionById,FilterQuestionByDifficulty} from '../Controllers/QuestionControllers';

const router = Router();


router.get("/", getQuestions);
router.post("/", createQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestionById);
router.get("/:difficulty", FilterQuestionByDifficulty);

export default router;