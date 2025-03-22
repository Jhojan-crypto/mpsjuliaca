"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
let DatabaseConfig = class DatabaseConfig {
    static getMongoURI() {
        return process.env.MONGO_URI || 'mongodb+srv://jhquispelo:S8IJzszBHpUWe33m@cluster0.885yg.mongodb.net/mi_app?retryWrites=true&w=majority&appName=Cluster0';
    }
    static getMongoOptions() {
        return {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
};
DatabaseConfig = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfig);
exports.DatabaseConfig = DatabaseConfig;
