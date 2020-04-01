import mysql.connector
import requests
from bs4 import BeautifulSoup
from scraping import get_genres, get_books

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="week5"
)

mycursor = mydb.cursor()

def populate_genres():
    genres = get_genres()

    for genre in genres:
        sql = "INSERT INTO genre (name_genre) VALUES (%s)"
        val = (genre,)
        mycursor.execute(sql, val)
        print(genre)
        print(mycursor.rowcount, "record inserted.")

    mydb.commit()




def populate_books(): 

    genres = get_genres()
    

    for el in list(set(authors)):
        try:
            print(el)
            sql = "INSERT INTO athor (name_author, image_author) VALUES (%s, %s)"
            val = (el, 'something')
            mycursor.execute(sql, val)
            print(mycursor.rowcount, "record inserted.")
        except:
            break

    mydb.commit()



if __name__ == '__main__':
    populate_books()


