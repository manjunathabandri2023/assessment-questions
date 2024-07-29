import { Request, Response } from 'express';
import Candidate from '../models/candidate';

const createCandidate = async (req: Request, res: Response) => {
  const { name, email, phone, status } = req.body;

  try {
    const candidate = await Candidate.create({ name, email, phone, status });
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getAllCandidates = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const candidates = await Candidate.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.json(candidates);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateCandidate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, status } = req.body;

  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }

    candidate.name = name || candidate.name;
    candidate.email = email || candidate.email;
    candidate.phone = phone || candidate.phone;
    candidate.status = status || candidate.status;

    const updatedCandidate = await candidate.save();
    res.json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteCandidate = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }

    // await candidate.remove();
    res.json({ message: 'Candidate removed' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { createCandidate, getAllCandidates, updateCandidate, deleteCandidate };
