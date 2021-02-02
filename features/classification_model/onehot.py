import numpy as np
import pandas as pd
from IPython.core.display import display
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
import tensorflow as tf
from tensorflow.keras import layers, models

colors_df = pd.DataFrame(data=[['a'], ['ba'], ['ba+i'], ['ba+o'], ['ba+u'], ['bha'], ['ca'], ['ca+e'], ['cha'], ['da'], ['da+e'], ['da+i'], ['da+u'], ['da1'],
              ['dha1'], ['dha2'], ['e'], ['ga'], ['ga+i'], ['gha'], ['ha'], ['ha+a'], ['i'],
              ['ja'], ['jha'], ['jha+e'], ['jha+i'], ['jha+u'], ['ka'], ['ka+e'], ['ka+i'], ['kha'], ['la'], ['la+e'], ['la+u'], ['la2'], ['ma'],
              ['ma+i'], ['na'], ['na+e'], ['na+u'], ['na2'], ['na2+i'], ['o'], ['pa'],
              ['pa+e'], ['pa+i'], ['pa+u'], ['pha'], ['ra'], ['sa1'], ['sa2'], ['sa3'], ['ta'], ['ta+e'], ['ta+i'], ['ta+u'], ['ta1'], ['tha1'],
              ['tha2'], ['u'], ['u2'], ['va'], ['ya'], ['ya+e']], columns=['color'])

print('Before One Hot Encoding:')
display(colors_df)

one_hot_encoder = OneHotEncoder(sparse=False)
one_hot_encoder.fit(colors_df)

colors_df_encoded = one_hot_encoder.transform(colors_df)
colors_df_encoded = pd.DataFrame(data=colors_df_encoded, columns=one_hot_encoder.categories_)
print('\n\nAfter One Hot Encoding:')
display(colors_df_encoded)