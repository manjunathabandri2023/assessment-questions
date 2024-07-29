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
exports.deleteQuestion = exports.updateQuestion = exports.getAllQuestions = exports.createQuestion = void 0;
const question_1 = __importDefault(require("../models/question"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, options, correctOption, marks, negativeMarks, tags } = req.body;
    try {
        const question = yield question_1.default.create({
            text,
            options,
            correctOption,
            marks,
            negativeMarks,
            tags,
        });
        res.status(201).json(question);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createQuestion = createQuestion;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    try {
        const questions = yield question_1.default.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        res.json(questions);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getAllQuestions = getAllQuestions;
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text, options, correctOption, marks, negativeMarks, tags } = req.body;
    try {
        const question = yield question_1.default.findById(id);
        if (!question) {
            res.status(404);
            throw new Error('Question not found');
        }
        question.text = text || question.text;
        question.options = options || question.options;
        question.correctOption = correctOption || question.correctOption;
        question.marks = marks || question.marks;
        question.negativeMarks = negativeMarks || question.negativeMarks;
        question.tags = tags || question.tags;
        const updatedQuestion = yield question.save();
        res.json(updatedQuestion);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const question = yield question_1.default.findById(id);
        if (!question) {
            res.status(404);
            throw new Error('Question not found');
        }
        // await question.remove();
        res.json({ message: 'Question removed' });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.deleteQuestion = deleteQuestion;
