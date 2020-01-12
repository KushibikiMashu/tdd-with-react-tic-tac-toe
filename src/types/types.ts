type X = 'X';

type O = 'O';

export type SquareMark = X | O | null;

export type Squares = SquareMark[];

export type History = { squares: Squares; number: number }[];

type Row = number | null;
type Col = number | null;

export type Cell = { row: Row; col: Col }[];
