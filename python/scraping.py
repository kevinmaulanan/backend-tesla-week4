import re
import requests
from bs4 import BeautifulSoup


def get_books(genre, num_pages=10):

    results = []
    for i in range(num_pages):
        src = requests.get(f'https://www.goodreads.com/shelf/show/{genre}?page={i}').content
        soup = BeautifulSoup(src, 'html.parser')

        inner = []
        for element in soup.find_all('div', class_='elementList'):
            if element.find('a', class_='bookTitle') == None:
                break
            book_title = element.find('a', class_='bookTitle').text
            img = element.find('img', attrs={'src': re.compile('https://i.gr-assets.com/images/')})['src']
            author = element.find('span', attrs={'itemprop': 'name'}).text
            rating = element.find('span', class_='greyText smallText').text.split('—\n')[0].strip()[-4:]
            url = 'https://www.goodreads.com/' + element.find('a', attrs={'href': re.compile('/book/show/')}).attrs['href']

            inner.append({
                'img': img,
                'book_title': book_title,
                'url': url,
                'author': author,
                'avg_rating': rating
            })
        results += inner

    return results


def get_genres():
    src = requests.get('https://www.goodreads.com/genres').content
    soup = BeautifulSoup(src, 'html.parser')

    genres = []
    for el in soup.find_all('a', attrs={'class': 'gr-hyperlink', 'href': re.compile('/genres/')}):
        genres.append(el.text)

    return list(set(genres))