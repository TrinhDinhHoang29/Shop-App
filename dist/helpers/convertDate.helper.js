"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDate = void 0;
const convertDate = (records) => {
    records.forEach(record => {
        const date = new Date(record.createdAt);
        record.date = {
            Day: date.getDate(),
            Month: date.getMonth() + 1,
            Year: date.getFullYear(),
            Hours: date.getHours(),
            Minutes: date.getMinutes()
        };
    });
    return records;
};
exports.convertDate = convertDate;
