export interface IQuizResponse {
    response_code: number;
    results:       IQuiz[];
}

export interface IQuiz {
    category:          Category;
    type:              Type;
    difficulty:        Difficulty;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum Category {
    History = "History",
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum Type {
    Multiple = "multiple",
}
