"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/accounts', accountRoutes_1.default);
app.use('/api/candidates', candidateRoutes_1.default);
app.use('/api/questions', questionRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// MongoDB connection
mongoose_1.default.connect(process.env.MONGO_URI || '')
    .then(() => {
    console.log('MongoDB connected');
})
    .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
});
exports.default = app;
