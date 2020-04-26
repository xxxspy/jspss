import pandas as pd



data = pd.Series([0, 1, 1, 1, 1, 0, 1, 2, 1, 2])
print(data.mean())
print(data.var())
print(data.std())