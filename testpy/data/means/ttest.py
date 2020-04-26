import pandas as pd
import statsmodels.api as sm


x = pd.Series((373,398,245,272,238,241,134,410,158,125,198,252,577,272,208,260))
y = pd.Series((411,471,320,364,311,390,163,424,228,144,246,371,680,384,279,303))


print('m1={}, m2={}'.format(x.mean(), y.mean()))
print('var1={}, var2={}'.format(x.var(), y.var()))

t, p, df = sm.stats.ttest_ind(x, y)
print('t={}; p={}; df={}'.format(t, p, df))