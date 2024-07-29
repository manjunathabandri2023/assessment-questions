"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCandidate = exports.updateCandidate = exports.getAllCandidates = exports.createCandidate = void 0;
const candidate_1 = __importDefault(require("../models/candidate"));
const createCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, status } = req.body;
    try {
        const candidate = yield candidate_1.default.create({ name, email, phone, status });
        res.status(201).json(candidate);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createCandidate = createCandidate;
const getAllCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    try {
        const candidates = yield candidate_1.default.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        res.json(candidates);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getAllCandidates = getAllCandidates;
const updateCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone, status } = req.body;
    try {
        const candidate = yield candidate_1.default.findById(id);
        if (!candidate) {
            res.status(404);
            throw new Error('Candidate not found');
        }
        candidate.name = name || candidate.name;
        candidate.email = email || candidate.email;
        candidate.phone = phone || candidate.phone;
        candidate.status = status || candidate.status;
        const updatedCandidate = yield candidate.save();
        res.json(updatedCandidate);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateCandidate = updateCandidate;
const deleteCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const candidate = yield candidate_1.default.findById(id);
        if (!candidate) {
            res.status(404);
            throw new Error('Candidate not found');
        }
        // await candidate.remove();
        res.json({ message: 'Candidate removed' });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.deleteCandidate = deleteCandidate;
