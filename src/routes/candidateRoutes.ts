import express from 'express';
import {
  createCandidate,
  getAllCandidates,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController';

const router = express.Router();

router.post('/', createCandidate);
router.get('/', getAllCandidates);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
