import mysql.connector
import requests
from bs4 import BeautifulSoup
from scraping import get_genres, get_books

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="readme_inc"
)

mycursor = mydb.cursor()

def populate_genres():
    print('Running populate genres')
    genres = get_genres()

    for genre in genres:
        sql = "INSERT INTO genres (genre_name) VALUES (%s)"
        val = (genre,)
        mycursor.execute(sql, val)
        print(genre)
        print(mycursor.rowcount, "record inserted.")

    mydb.commit()
    print('\n')


def populate_authors(books): 
    print('Running populate authors')
    author_data = []
    for book in books:
        author_data.append((book['author'], book['author_img']))

    author_data = list(set(author_data))

    for data in author_data:
        sql = "INSERT INTO authors (author_name, author_image) VALUES (%s, %s)"
        val = (data[0], data[1])
        mycursor.execute(sql, val)
        print(mycursor.rowcount, "record inserted.")

    mydb.commit()
    print('\n')


def populate_books(books):
    print('Running populate books')
    for book in books:
        print('Book title ' + book['book_title'])
        # Get author id
        sql = "SELECT id FROM authors WHERE author_name = %s"
        adr = (book['author'], )
        mycursor.execute(sql, adr)
        author_id = mycursor.fetchone()[0]
        print('Author id ' + str(author_id))

        # Insert to global book ratings
        sql = "INSERT INTO global_book_ratings (total_reviewers, avg_rating) VALUES (%s, %s)"
        val = (book['total_reviewers'], book['avg_rating'])
        mycursor.execute(sql, val)
        global_book_rating_id = mycursor.lastrowid
        print('Global book rating id ' + str(global_book_rating_id))

        # Insert to books
        sql = "INSERT INTO books (book_name, description, book_image, id_author, id_global_rating) VALUES (%s, %s, %s, %s, %s)"
        val = (book['book_title'], book['description'], book['book_img'], author_id, global_book_rating_id)
        mycursor.execute(sql, val)
        book_id = mycursor.lastrowid
        print('Book id ' + str(book_id))

        # Insert to books genres
        for genre in book['book_genres']:
            sql = "SELECT id from genres WHERE genre_name = %s"
            adr = (genre,)
            mycursor.execute(sql, adr)
            genre_id = mycursor.fetchone()
            print(genre_id)
            if genre_id == None:
                continue
            sql = "INSERT INTO bridge_books_genres(id_book, id_genre) VALUES (%s, %s)"
            val = (book_id,genre_id[0])
            mycursor.execute(sql, val)

    mydb.commit()


def populate_book_genres():

    for genre in ['Physics', 'Science', 'History', 'Nonfiction']:
        sql = "SELECT id from genres WHERE genre_name = %s"
        adr = (genre,)
        mycursor.execute(sql, adr)
        genre_id = mycursor.fetchone()
        print(genre_id)
        if genre_id == None:
            continue
        sql = "INSERT INTO bridge_books_genres(id_book, id_genre) VALUES (1, %s)"
        val = (genre_id[0],)
        mycursor.execute(sql, val)

    mydb.commit()