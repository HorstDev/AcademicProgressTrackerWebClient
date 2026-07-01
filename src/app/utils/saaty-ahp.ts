/** Допустимое отношение согласованности OS (CR) по Саати. */
export const MAX_CONSISTENCY_RATIO = 0.1;

/** Индекс случайной согласованности RI для n = 3. */
const RANDOM_INDEX_N3 = 0.58;

export interface AhpResult {
  weights: [number, number, number];
  lambdaMax: number;
  consistencyIndex: number;
  /** Отношение согласованности (OS / CR). */
  consistencyRatio: number;
  isConsistent: boolean;
}

function buildMatrix(ag: number, al: number, gl: number): number[][] {
  return [
    [1, ag, al],
    [1 / ag, 1, gl],
    [1 / al, 1 / gl, 1],
  ];
}

function computeWeights(matrix: number[][]): number[] {
  const n = matrix.length;
  const colSum = new Array<number>(n).fill(0);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSum[j] += matrix[i][j];
    }
  }

  const normalized = matrix.map((row) => row.map((value, j) => value / colSum[j]));
  return normalized.map((row) => row.reduce((sum, value) => sum + value, 0) / n);
}

function computeLambdaMax(matrix: number[][], weights: number[]): number {
  const n = weights.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let aw = 0;
    for (let j = 0; j < n; j++) {
      aw += matrix[i][j] * weights[j];
    }
    sum += aw / weights[i];
  }
  return sum / n;
}

/** Веса и отношение согласованности из трёх парных сравнений (A, G, L). */
export function computeAhpResult(ag: number, al: number, gl: number): AhpResult {
  const matrix = buildMatrix(ag, al, gl);
  const weights = computeWeights(matrix);
  const n = weights.length;
  const lambdaMax = computeLambdaMax(matrix, weights);
  const consistencyIndex = (lambdaMax - n) / (n - 1);
  const consistencyRatio = consistencyIndex / RANDOM_INDEX_N3;

  return {
    weights: [weights[0], weights[1], weights[2]],
    lambdaMax,
    consistencyIndex,
    consistencyRatio,
    isConsistent: consistencyRatio <= MAX_CONSISTENCY_RATIO + 1e-12,
  };
}
