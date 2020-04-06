import re
import requests
from bs4 import BeautifulSoup


def get_books(genre, num_pages=10, per_page=5):

    results = []
    for i in range(num_pages):
        try:
            print('page ' + str(i))
            src = requests.get(f'https://www.goodreads.com/shelf/show/{genre}?page={i}').content
            soup = BeautifulSoup(src, 'html.parser')

            inner = []
            for element in soup.find_all('div', class_='elementList')[:per_page]:
                try:
                    if element.find('a', class_='bookTitle') == None:
                        break
                    book_title = element.find('a', class_='bookTitle').text
                    print(book_title)
                    # book_img = element.find('img', attrs={'src': re.compile('https://i.gr-assets.com/images/')})['src']
                    author = element.find('span', attrs={'itemprop': 'name'}).text
                    rating = element.find('span', class_='greyText smallText').text.split('—\n')[0].strip()[-4:]
                    book_url = 'https://www.goodreads.com' + element.find('a', attrs={'href': re.compile('/book/show/')}).attrs['href']
                    total_reviewers = int(element.find('span', class_='greyText smallText').text.split('—\n')[1].replace('ratings', '').replace(',', '').strip())

                    src_book = requests.get(book_url).content
                    soup_book = BeautifulSoup(src_book, 'html.parser')
                    description = soup_book.find('span', attrs={'id': re.compile('freeTextContainer')}).text
                    book_img = soup_book.find('img', attrs={'id': 'coverImage'}).attrs['src']
                    amazon_url = 'https://www.goodreads.com' + soup_book.find('a', attrs={'id': 'buyButton'}).attrs['href']
                    author_url = soup_book.find('a', class_='authorName').attrs['href']
                    book_genres = []
                    for el in soup_book.find_all('a', attrs={'class': 'actionLinkLite bookPageGenreLink'}):
                        book_genres.append(el.text)
                    book_genres = list(set(book_genres))

                    src_author = requests.get(author_url).content
                    soup_author = BeautifulSoup(src_author, 'html.parser')
                    author_img = soup_author.find('img', attrs={'src': re.compile('https://images.gr-assets.com/authors/')}).attrs['src']


                    inner.append({
                        'book_img': book_img,
                        'book_title': book_title,
                        'book_url': book_url,
                        'author': author,
                        'avg_rating': rating,
                        'amazon_url': amazon_url,
                        'total_reviewers': total_reviewers,
                        'description': description,
                        'author_url': author_url,
                        'author_img': author_img,
                        'book_genres': book_genres
                    })
                except:
                    continue
            results += inner
        except:
            continue

    return results


def get_genres():
    src = requests.get('https://www.goodreads.com/genres').content
    soup = BeautifulSoup(src, 'html.parser')

    genres = []
    for el in soup.find_all('a', attrs={'class': 'gr-hyperlink', 'href': re.compile('/genres/')}):
        genres.append(el.text)

    return list(set(genres))