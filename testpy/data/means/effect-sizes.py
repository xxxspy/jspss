from statistics import mean, stdev
from math import sqrt
import pandas as pd

# test conditions
df = pd.DataFrame([[1,2, 3], [1,4,4], [2,6,5], [2,7,4]])
df.columns = ['a', 'b', 'c']

for n in 'bc':
    print('!!!!!!!!', n)
    c0 = df[df['a']==1][n]
    c1 = df[df['a']==2][n]
    # print(c0)
    # print(c1)
    # print(mean(c0)-mean(c1))
    n0 = len(c0)
    n1 = len(c1)
    s0 = stdev(c0)
    s1 = stdev(c1)
    print(c1)
    print('std1 and std2:', s0, s1)
    m0 = mean(c0)
    m1 = mean(c1)
    fenzi = s0 ** 2 * (n0-1) + s1 ** 2 * (n1-1)
    print('fenzi:', fenzi)
    cohens_d = (m0 - m1) / sqrt(fenzi / (n0 + n1 - 2))
    print(n, cohens_d)

