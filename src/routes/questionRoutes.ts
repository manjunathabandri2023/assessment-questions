import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController';

const router = express.Router();

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
