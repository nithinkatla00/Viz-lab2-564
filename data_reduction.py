import csv
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# def remove_columns(input_file, output_file, columns_to_remove):
#     with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
#         reader = csv.DictReader(infile)
#         fieldnames = [field for field in reader.fieldnames if field not in columns_to_remove]
#         writer = csv.DictWriter(outfile, fieldnames=fieldnames)
#         writer.writeheader()
#         for row in reader:
#             row = {key: value for key, value in row.items() if key not in columns_to_remove}
#             writer.writerow(row)

def normalize_data(input_file, output_file):
    data = np.loadtxt(input_file, delimiter=',', skiprows=1)
    scaler = MinMaxScaler(feature_range=(-1, 1))
    normalized_data = scaler.fit_transform(data)
    np.savetxt(output_file, normalized_data, delimiter=',')

# Example usage
input_file = 'spotify-2023.csv'
output_file = 'output.csv'

df = pd.read_csv('./spotify-2023.csv')

columns_to_convert = ['in_deezer_playlists', 'in_shazam_charts']

# Convert each column in the list to float
for col in columns_to_convert:
    df[col] = pd.to_numeric(df[col], errors='coerce')
df_cleaned = df.dropna()
df_cleaned.to_csv('modified_dataset.csv', index=False)
# columns_to_remove = ['artist_count', 'released_year', 'released_month', 'released_day', 'key', 'artist(s)_name', 'mode']  # specify columns to remove
# remove_columns(input_file, output_file, columns_to_remove)

# normalized_file = 'normalized_output.csv'
# normalize_data(output_file, normalized_file)

# print("Normalized data saved to:", normalized_file)
