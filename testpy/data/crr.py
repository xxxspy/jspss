import numpy as np

data = np.array([	
            [90,60,90],
            [90,90,30],
            [60,60,60],
            [60,60,90],
            [30,30,30]])

print(np.corrcoef(data.T))