"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const router = express_1.default.Router();
router.post('/', candidateController_1.createCandidate);
router.get('/', candidateController_1.getAllCandidates);
router.put('/:id', candidateController_1.updateCandidate);
router.delete('/:id', candidateController_1.deleteCandidate);
exports.default = router;
