type X = 'X'

type O = 'O'

export type SquareMark = X | O | null

export type Squares = SquareMark[]

export type History = { squares: Squares }[]
