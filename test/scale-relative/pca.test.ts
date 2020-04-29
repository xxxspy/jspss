import { PCA } from 'ml-pca'
const dataset = require('ml-dataset-iris').getNumbers();
// dataset is a two-dimensional array where rows represent the samples and columns the features
const pca = new PCA(dataset);
console.log(pca.getExplainedVariance());
/*
[ 0.9246187232017269,
  0.05306648311706785,
  0.017102609807929704,
  0.005212183873275558 ]
*/

console.log(pca.getCumulativeVariance())
console.log(pca.getEigenvalues())