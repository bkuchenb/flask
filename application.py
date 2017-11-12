from flask import Flask, render_template, request, jsonify, session

from DatabaseContextManager import UseDatabase
import tcf_functions as tcf


application = Flask(__name__)

inceff_host = 'inceff.ctlel9cvjtqf.us-west-2.rds.amazonaws.com'
application.config['db'] = {'host': inceff_host,
                            'user': 'tcf',
                            'password': 'R00thM!ck',
                            'database': 'inceff', }


@application.route('/set_list', methods=['POST'])
def get_set_list() -> 'json':
    data = {'category_name': request.form['category'],
            'set_year': request.form['year'],
            'letter': request.form['letter'], }
    with UseDatabase(application.config['db']) as cursor:
        _SQL = ("SELECT * "
                "FROM tcf_set "
                "INNER JOIN tcf_category "
                "ON tcf_set.category_id = tcf_category.category_id "
                "WHERE tcf_category.category_name = {category_name!r} "
                "AND tcf_set.set_year = {set_year} "
                "AND tcf_set.set_name LIKE {letter!r} ")
        cursor.execute(_SQL.format(**data))
        results = cursor.fetchall()
        results = [['1990', 'Topps', '281', '$12.00'],
                   ['1991', 'Topps', '282', '$13.00']]

    # Turn the results into a list of dicts.
    temp_list = []
    for row in results:
        temp_dict = {'set_year': row[0], 'set_name': row[1],
                     'location': row[2], 'total': row[3]}
        temp_list.append(temp_dict)
    return jsonify(temp_list)


@application.route('/search_dealer_home', methods=['POST'])
def search_dealer_home() -> 'json':
    # Create a url to search for the given year and page.
    url = ('https://marketplace.beckett.com/thecollectorsfriend_700/'
           'search_new/' + '?term=' + request.form['year'] +
           '&page=' + request.form['page'])
    # Request and save the page as BeautifulSoup.
    soup = tcf.get_soup(url)
    temp_dict = {'records': tcf.get_record_count(soup)}
    # Return the number of records found.
    return jsonify(temp_dict)


@application.route('/search_for_page', methods=['POST'])
def search_for_page() -> 'json':
    # Create a url to search for the given year and page.
    url = ('https://marketplace.beckett.com/thecollectorsfriend_700/'
           'search_new/' + '?term=' + request.form['year'] +
           '&page=' + request.form['page'])
    # Request and save the page as BeautifulSoup.
    soup = tcf.get_soup(url)
    # Extract all inventory_ids and associated data.
    records = tcf.get_inventory_ids(soup)
    return jsonify(records)


@application.route('/search_for_record', methods=['POST'])
def search_for_record() -> 'json':
    with UseDatabase(application.config['db']) as cursor:
        # Get the session['records'] index from the POST data.
        entry = request.get_json()
        # Request and save the inventory_url page.
        soup = tcf.get_soup(entry['inventory_url'])
        # Get more information for the card.
        entry = tcf.get_card_data(soup, entry)
        # Check to see if the card has been added to tcf_inventory.
        _SQL = ("SELECT inventory_id "
                "FROM tcf_inventory "
                "WHERE inventory_id = %s")
        cursor.execute(_SQL, (entry['inventory_id'],))
        result = cursor.fetchall()
#            print(len(result), 'cards were found for inventory_id',
#                  entry['inventory_id'])
        # If the inventory_id is found, update the quantity and price.
        if len(result) == 1:
            _SQL = ("UPDATE tcf_inventory "
                    "SET quantity = %s, price = %s "
                    "WHERE inventory_id = %s")
            cursor.execute(_SQL, (entry['quantity'],
                                  entry['price'],
                                  entry['inventory_id'],))
        # If the inventory_id is not found, get the card_id.
        elif len(result) == 0:
            # Get the set_id and card_id.
            entry = tcf.get_card_id(entry)
            # Move to the next card if the card_url wasn't found.
            if 'card_url' not in entry:
                _SQL = ("INSERT INTO tcf_exception(card_data) "
                        "VALUES(%s)")
                cursor.execute(_SQL, (entry['card_name'],))
            # Get more information from the card_url.
            soup = tcf.get_soup(entry['card_url'])
            entry = tcf.get_card_data2(soup, entry)
            # Add the card_data to the appropriate table.
#                print('Scraping data for Card#', i + 1, 'took',
#                      round(time.time() - start_time, 2), 'seconds to run.')
            tcf.add_card_data(entry, cursor)
        elif len(result) > 1:
            print('More than one record was found for inventory_id: ' +
                  entry['inventory_id'] + '.')
        return jsonify(entry)


@application.route('/')
@application.route('/tcf')
def tcf_page() -> 'html':
    return render_template('index.html', title='TCF')


application.secret_key = '6yza3#2@GG5nm!'


if __name__ == '__main__':
    application.run(debug=True)
