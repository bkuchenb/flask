from flask import Flask, render_template, request, jsonify, session
from flask_s3 import FlaskS3

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
    with UseDatabase(application.config['db']) as cursor:
        if request.form['letter'] != '%':
            letter = request.form['letter'] + '%'
        _SQL = ("SELECT tcf_sets.set_year, tcf_sets.set_name, "
                "tcf_overstock.location "
                "FROM tcf_sets "
                "LEFT JOIN tcf_overstock "
                "ON tcf_sets.set_id = tcf_overstock.set_id "
                "WHERE tcf_sets.category = %s "
                "AND tcf_sets.set_year = %s "
                "AND tcf_sets.set_name LIKE %s "
                "ORDER BY tcf_sets.set_name ASC")
        cursor.execute(_SQL, (request.form['category'], request.form['year'],
                              letter,))
        results = cursor.fetchall()

        # Turn the results into a list of dicts.
        temp_list = [{'set_year': row[0], 'set_name': row[1],
                      'location': row[2]} for row in results]
        return jsonify(temp_list)


@application.route('/get_sales', methods=['POST'])
def get_sales() -> 'json':
    with UseDatabase(application.config['db']) as cursor:
        # Get the set to search for from the json data.
        entry = request.get_json()
        _SQL = ("SELECT SUM(total) as total "
                "FROM tcf_orderdetails "
                "WHERE tcf_orderdetails.sport = %s "
                "AND tcf_orderdetails.year = %s "
                "AND tcf_orderdetails.setName = %s ")
        cursor.execute(_SQL, (entry['category'], entry['set_year'],
                              entry['set_name'],))
        results = cursor.fetchall()

        # Turn the results into a list of dicts.
        if results[0][0]:
            temp_list = [{'total': '$' + str(row[0])} for row in results]
        else:
            temp_list = [{'total': '$0.00'} for row in results]
        return jsonify(temp_list)


@application.route('/get_set_totals', methods=['POST'])
def get_set_totals() -> 'json':
    with UseDatabase(application.config['db']) as cursor:
        # Get the set to search for from the json data.
        entry = request.get_json()
        search_term1 = entry['year'] + '%'
        search_term2 = '%' + entry['year'] + '%'
        _SQL = ("SELECT COUNT(*) "
                "FROM tcf_inventory "
                "JOIN tcf_card "
                "ON tcf_inventory.card_id = tcf_card.card_id "
                "JOIN tcf_set "
                "ON tcf_card.set_id = tcf_set.set_id "
                "JOIN tcf_set_category "
                "ON tcf_set.set_id = tcf_set_category.set_id "
                "JOIN tcf_category "
                "ON tcf_category.category_id = tcf_set_category.category_id "
                "WHERE tcf_set.set_year LIKE %s "
                "OR tcf_set.set_name LIKE %s "
                "OR tcf_card.card_name LIKE %s "
                "OR tcf_card.card_number LIKE %s")
        cursor.execute(_SQL, (search_term1, search_term2,
                       search_term2, search_term2,))
        results = cursor.fetchall()
        temp_dict = {'total': results[0][0]}
        return jsonify(temp_dict)


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
        # Get the list of items to search from the json data.
        entry = request.get_json()
        # Request and save the inventory_url page.
        soup = tcf.get_soup(entry['inventory_url'])
        # Get more information for the card.
        try:
            entry = tcf.get_card_data(soup, entry)
        except ValueError as err:
            print('Something went wrong: {}'.format(err))
            return jsonify({'error': 'Currency is not set to USD.'})
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

        # Optional skip if inventory_id was found.
        # elif len(result) == 0:
        # Get the set_id and card_id.
        entry = tcf.get_card_id(entry)
        # Move to the next card if the card_url wasn't found.
        if 'card_url' not in entry:
            _SQL = ("INSERT INTO tcf_exception(card_data) "
                    "VALUES(%s)")
            cursor.execute(_SQL, (entry['card_name'],))
            return jsonify({'error': 'Could not find card.'})
        # Get more information from the card_url.
        soup = tcf.get_soup(entry['card_url'])
        entry = tcf.get_card_data2(soup, entry)
        # Add the card_data to the appropriate table.
#                print('Scraping data for Card#', i + 1, 'took',
#                      round(time.time() - start_time, 2), 'seconds to run.')
        tcf.add_card_data(entry, cursor)
        return jsonify(entry)


@application.route('/')
@application.route('/tcf')
def tcf_page() -> 'html':
    return render_template('index.html', title='TCF')


application.secret_key = '6yza3#2@GG5nm!'


if __name__ == '__main__':
    application.run(debug=True)
