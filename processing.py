from openpyxl import load_workbook
import json

movie_xlsx = load_workbook("movies.xlsx")
movie_values = movie_xlsx.active

# G - David
# H - Daniela

data = []

with open("movies.json", "a") as outfile:

    for row in range(2, 343):

        movie = {
            "title": movie_values["A" + str(row)].value,
            "director": movie_values["B" + str(row)].value,
            "year": movie_values["C" + str(row)].value,
            "watchDavid": (movie_values["G" + str(row)].value == 1),
            "watchDaniela": (movie_values["H" + str(row)].value == 1)
        }

        data.append(movie.copy())

        movie = {}

    print(data)

    json.dump(data, outfile)
        
    