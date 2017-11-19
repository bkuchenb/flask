# -*- coding: utf-8 -*-
"""
Created on Fri Nov 10 12:47:48 2017

@author: bk00chenb
"""

import math
import pprint
import re
import requests
from bs4 import BeautifulSoup
import MySQLdb


def insert_attribute(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("INSERT INTO tcf_attribute(attribute_name) VALUES(%s)")
    cursor.execute(_SQL, (card_data['attribute_name'][index],))


def insert_brand(cursor: 'cursor', card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['brand_id']) != len(card_data['brand_name'])):
        print("The number of ids and names doesn't match.")
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)
        return
    _SQL = ("INSERT INTO tcf_brand(brand_id, brand_name, brand_url) "
            "VALUES(%s, %s, %s)")
    cursor.execute(_SQL, (card_data['brand_id'][index],
                          card_data['brand_name'][index],
                          card_data['brand_url'][index],))


def insert_card(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("INSERT INTO tcf_card"
            "(card_id, set_id, card_number, card_name, "
            "image_src_back, image_src_front, "
            "value_high, value_low, print_run, card_url) "
            "VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    cursor.execute(_SQL, (card_data['card_id'], card_data['set_id'],
                          card_data['card_number'], card_data['card_name'],
                          card_data['image_src_back'],
                          card_data['image_src_front'],
                          card_data['value_high'],
                          card_data['value_low'],
                          card_data['print_run'],
                          card_data['card_url'],))


def insert_card_attr(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("INSERT INTO tcf_card_attribute(card_id, attribute_id) "
            "VALUES(%s, %s)")
    cursor.execute(_SQL, (card_data['card_id'],
                          card_data['attribute_id'],))


def insert_card_player(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("INSERT INTO tcf_card_player(player_id, card_id) "
            "VALUES(%s, %s)")
    cursor.execute(_SQL, (card_data['player_id'][index],
                          card_data['card_id'],))


def insert_card_team(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("INSERT INTO tcf_card_team(team_id, card_id) "
            "VALUES(%s, %s)")
    cursor.execute(_SQL, (card_data['team_id'][index],
                          card_data['card_id'],))


def insert_category(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("INSERT INTO tcf_category"
            "(category_id, category_name, category_url) "
            "VALUES(%s, %s, %s)")
    cursor.execute(_SQL, (card_data['category_id'][index],
                          card_data['category_name'][index],
                          card_data['category_url'][index],))


def insert_exception(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("INSERT INTO tcf_exception(card_data) VALUES(%s)")
    print(_SQL, (card_data['card_name'],))
    cursor.execute(_SQL, (card_data['card_name'],))


def insert_inventory(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("INSERT INTO tcf_inventory"
            "(inventory_id, card_id, grade, quantity, max, min, "
            "price, inventory_url) "
            "VALUES(%s, %s, %s, %s, %s, %s, %s, %s)")
    cursor.execute(_SQL, (card_data['inventory_id'], card_data['card_id'],
                          card_data['condition'], card_data['quantity'],
                          card_data['max'], card_data['min'],
                          card_data['price'], card_data['inventory_url'],))


def insert_manufacturer(cursor: 'cursor', card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['manufacturer_id']) !=
       len(card_data['manufacturer_name'])):
        print("The number of ids and names doesn't match.")
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)
        return
    _SQL = ("INSERT INTO tcf_manufacturer"
            "(manufacturer_id, manufacturer_name, manufacturer_url) "
            "VALUES(%s, %s, %s)")
    cursor.execute(_SQL, (card_data['manufacturer_id'][index],
                          card_data['manufacturer_name'][index],
                          card_data['manufacturer_url'][index],))


def insert_player(cursor: 'cursor', card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['player_id']) != len(card_data['player_name'])):
        print("The number of ids and names doesn't match.")
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)
        return
    _SQL = ("INSERT INTO tcf_player(player_id, player_name, player_url) "
            "VALUES(%s, %s, %s)")
    cursor.execute(_SQL, (card_data['player_id'][index],
                          card_data['player_name'][index],
                          card_data['player_url'][index],))


def insert_set(cursor: 'cursor', card_data: dict) -> str:
    # Add the set to tcf_set if there is only one manufacturer and one brand.
    if 'manufacturer_id' in card_data and 'brand_id' in card_data:
        if(len(card_data['manufacturer_id']) > 1 or
           len(card_data['brand_id']) > 1):
            print('There is more than 1 manufacturer or brand id.')
            pp = pprint.PrettyPrinter(indent=4)
            pp.pprint(card_data)
            return
        _SQL = ("INSERT INTO tcf_set"
                "(set_id, set_year, set_name, manufacturer_id, "
                "brand_id, set_url) "
                "VALUES(%s, %s, %s, %s, %s, %s)")
        cursor.execute(_SQL, (card_data['set_id'], card_data['set_year'],
                              card_data['set_name'],
                              card_data['manufacturer_id'][0],
                              card_data['brand_id'][0], card_data['set_url'],))
    # If there is no manufacturer, remove the variable.
    elif 'manufacturer_id' not in card_data and 'brand_id' in card_data:
        _SQL = ("INSERT INTO tcf_set"
                "(set_id, set_year, set_name, brand_id, set_url) "
                "VALUES(%s, %s, %s, %s, %s)")
        cursor.execute(_SQL, (card_data['set_id'], card_data['set_year'],
                              card_data['set_name'], card_data['brand_id'][0],
                              card_data['set_url'],))
    # If there is no brand, remove the variable.
    elif 'brand_id' not in card_data and 'manufacturer_id' in card_data:
        _SQL = ("INSERT INTO tcf_set"
                "(set_id, set_year, set_name, manufacturer_id, set_url) "
                "VALUES(%s, %s, %s, %s, %s)")
        cursor.execute(_SQL, (card_data['set_id'], card_data['set_year'],
                              card_data['set_name'],
                              card_data['manufacturer_id'][0],
                              card_data['set_url'],))
    # If there is no brand and no manufacturer, remove the variables.
    else:
        _SQL = ("INSERT INTO tcf_set"
                "(set_id, set_year, set_name, set_url) "
                "VALUES(%s, %s, %s, %s)")
        cursor.execute(_SQL, (card_data['set_id'], card_data['set_year'],
                              card_data['set_name'], card_data['set_url'],))


def insert_set_category(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("INSERT INTO tcf_set_category(category_id, set_id) "
            "VALUES(%s, %s)")
    cursor.execute(_SQL, (card_data['category_id'][index],
                          card_data['set_id'],))


def insert_team(cursor: 'cursor', card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['team_id']) != len(card_data['team_name'])):
        print("The number of ids and names doesn't match.")
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)
        return
    _SQL = ("INSERT INTO tcf_team(team_id, team_name, team_url) "
            "VALUES(%s, %s, %s)")
    cursor.execute(_SQL, (card_data['team_id'][index],
                          card_data['team_name'][index],
                          card_data['team_url'][index],))


def select_attribute(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT attribute_id "
            "FROM tcf_attribute "
            "WHERE attribute_name = %s")
    cursor.execute(_SQL, (card_data['attribute_name'][index],))
    return cursor.fetchall()


def select_brand(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT brand_id "
            "FROM tcf_brand "
            "WHERE brand_id = %s")
    cursor.execute(_SQL, (card_data['brand_id'][index],))
    return cursor.fetchall()


def select_card(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("SELECT card_id "
            "FROM tcf_card "
            "WHERE card_id = %s")
    cursor.execute(_SQL, (card_data['card_id'],))
    return cursor.fetchall()


def select_card_attr(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT * "
            "FROM tcf_card_attribute "
            "WHERE card_id = %s "
            "AND attribute_id = %s")
    cursor.execute(_SQL, (card_data['card_id'], card_data['attribute_id'],))
    return cursor.fetchall()


def select_card_player(cursor: 'cursor', card_data: dict, index: int) -> str:
    if card_data['player_id'][index].isnumeric():
        _SQL = ("SELECT * "
                "FROM tcf_card_player "
                "WHERE card_id = %s "
                "AND player_id = %s")
        cursor.execute(_SQL, (card_data['card_id'],
                              card_data['player_id'][index],))
        return cursor.fetchall()
    else:
        return ()


def select_card_team(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT * "
            "FROM tcf_card_team "
            "WHERE card_id = %s "
            "AND team_id = %s")
    cursor.execute(_SQL, (card_data['card_id'], card_data['team_id'][index],))
    return cursor.fetchall()


def select_category(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT category_id "
            "FROM tcf_category "
            "WHERE category_id = %s")
    cursor.execute(_SQL, (card_data['category_id'][index],))
    return cursor.fetchall()


def select_inventory(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("SELECT inventory_id "
            "FROM tcf_inventory "
            "WHERE inventory_id = %s")
    cursor.execute(_SQL, (card_data['inventory_id'],))
    return cursor.fetchall()


def select_manufacturer(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT manufacturer_id "
            "FROM tcf_manufacturer "
            "WHERE manufacturer_id = %s")
    cursor.execute(_SQL, (card_data['manufacturer_id'][index],))
    return cursor.fetchall()


def select_player(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT player_id "
            "FROM tcf_player "
            "WHERE player_id = %s")
    cursor.execute(_SQL, (card_data['player_id'][index],))
    return cursor.fetchall()


def select_set(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT tcf_set.set_id "
            "FROM tcf_set "
            "WHERE tcf_set.set_id = %s")
    cursor.execute(_SQL, (card_data['set_id'],))
    return cursor.fetchall()


def select_set_category(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT * "
            "FROM tcf_set_category "
            "WHERE set_id = %s "
            "AND category_id = %s")
    cursor.execute(_SQL, (card_data['set_id'],
                          card_data['category_id'][index],))
    return cursor.fetchall()


def select_team(cursor: 'cursor', card_data: dict, index: int) -> str:
    _SQL = ("SELECT team_id "
            "FROM tcf_team "
            "WHERE team_id = %s")
    cursor.execute(_SQL, (card_data['team_id'][index],))
    return cursor.fetchall()


def update_inventory(cursor: 'cursor', card_data: dict) -> str:
    _SQL = ("UPDATE tcf_inventory "
            "SET quantity = %s, price = %s "
            "WHERE inventory_id = %s")
    cursor.execute(_SQL, (card_data['quantity'], card_data['price'],
                          card_data['inventory_id'],))
    return cursor.fetchall()


def add_card_data(card_data: dict, cursor: 'cursor') -> None:
    try:
        debugging = False
#        debugging = True
        if debugging:
            pp = pprint.PrettyPrinter(indent=4)
            pp.pprint(card_data)
        # start_time = time.time()
        # Check to see if there is more than 1 brand_id.
        if 'brand_id' in card_data:
            for index in range(0, len(card_data['brand_id'])):
                # Check to see if the brand has already been added.
                result = select_brand(cursor, card_data, index)
                # If the brand doesn't exist, insert it into tcf_brand.
                if(len(result) == 0):
                    # Add the item if the number of ids and names matches.
                    if(len(card_data['brand_id']) ==
                       len(card_data['brand_name'])):
                        insert_brand(cursor, card_data, index)
            if debugging:
                print('brand')

        # Check to see if there is more than 1 manufacturer_id.
        if 'manufacturer_id' in card_data:
            for index in range(0, len(card_data['manufacturer_id'])):
                # Check to see if the manufacturer has already been added.
                result = select_manufacturer(cursor, card_data, index)
                # If the manufacturer doesn't exist, insert it.
                if len(result) == 0:
                    insert_manufacturer(cursor, card_data, index)
            if debugging:
                print('manufacturer')

        # Check to see if there is more than 1 category_id.
        if 'category_id' in card_data:
            for index in range(0, len(card_data['category_id'])):
                # Check to see if the category has already been added.
                result = select_category(cursor, card_data, index)
                # If the category doesn't exist, insert it into tcf_category.
                if len(result) == 0:
                    insert_category(cursor, card_data, index)

                # Check to see if the set has already been added.
                result = select_set(cursor, card_data, index)
                # If the set doesn't exist, insert it into tcf_set.
                if len(result) == 0:
                    insert_set(cursor, card_data)
                # Check to see if the set_category has already been added.
                result = select_set_category(cursor, card_data, index)
                # If the set_category doesn't exist, insert it.
                if len(result) == 0:
                    insert_set_category(cursor, card_data, index)
        if debugging:
            print('category')

        # Check to see if the card has already been added to tcf_card.
        result = select_card(cursor, card_data)
        if len(result) == 0:
            # If the card_id doesn't exist, insert it.
            insert_card(cursor, card_data)
        if debugging:
            print('card')

        # Check to see if the card has already been added to tcf_inventory.
        result = select_inventory(cursor, card_data)
        if len(result) == 0:
            # If the inventory_id doesn't exist, insert it.
            insert_inventory(cursor, card_data)
        if debugging:
            print('inventory')

        # Check to see if there is more than 1 player_id.
        for index in range(0, len(card_data['player_id'])):
            # Check to see if the player has already been added.
            result = select_player(cursor, card_data, index)
            # If the player doesn't exist, insert it into tcf_player.
            if len(result) == 0:
                insert_player(cursor, card_data, index)
            # Check to see if the card_player has already been added.
            result = select_card_player(cursor, card_data, index)
            # If the card_player doesn't exist, insert it.
            if len(result) == 0:
                insert_card_player(cursor, card_data, index)
        if debugging:
            print('player')

        # Check to see if there is more than 1 team_id.
        if 'team_id' in card_data:
            for index in range(0, len(card_data['team_id'])):
                # Check to see if the team has already been added.
                result = select_team(cursor, card_data, index)
                # If the team doesn't exist, insert it into tcf_team.
                if len(result) == 0:
                    # Add the team if the number of ids and names matches.
                    if len(card_data['team_id']) == len(card_data['team_name']):
                        insert_team(cursor, card_data, index)

                # Check to see if the card_team has already been added.
                result = select_card_team(cursor, card_data, index)
                # If the card_team doesn't exist, insert it into tcf_card_team.
                if len(result) == 0:
                    insert_card_team(cursor, card_data, index)
        if debugging:
            print('team')

        # Check to see if there is more than 1 attribute_name.
        for index in range(0, len(card_data['attribute_name'])):
            # Check to see if the attribute has already been added.
            result = select_attribute(cursor, card_data, index)
            # If the attribute doesn't exist, insert it into tcf_attribute.
            if len(result) == 0:
                insert_attribute(cursor, card_data, index)
                # Get the attribute_id just created.
                result = select_attribute(cursor, card_data, index)
                card_data['attribute_id'] = result[0][0]
                # Check to see if the card_attribute has already been added.
                result = select_card_attr(cursor, card_data, index)
                # If the card_attribute doesn't exist, insert it.
                if len(result) == 0:
                    insert_card_attr(cursor, card_data)
            else:
                card_data['attribute_id'] = result[0][0]
                # Check to see if the card_attribute has already been added.
                result = select_card_attr(cursor, card_data, index)
                # If the card_attribute doesn't exist, insert it.
                if len(result) == 0:
                    insert_card_attr(cursor, card_data)
            if debugging:
                print('attribute')

#        print('Sql insert statements took',
#              round(time.time() - start_time, 2), 'seconds to run.')
    except IndexError as err:
        print('Something went wrong in add_card_data: {}'.format(err))
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)
    except MySQLdb.Error as err:
        # If the insert fails, print a message and the query.
        print('Something went wrong in add_card_data: {}'.format(err))
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(card_data)


def get_card_data(soup: 'BeautifulSoup', card_data: dict) -> dict:
    """ This function scrapes information from the page that loads
        when navigating to a specific card located on a dealer's
        marketplace homepage (inventory_url)."""

    # Get the image links.
    temp_img = soup.find_all(id='item_image_front')
    card_data['image_src_front'] = temp_img[0]['src']
    temp_img = soup.find_all(id='item_image_back')
    card_data['image_src_back'] = temp_img[0]['src']
    try:
        # Get the span that contains the price data.
        div_list = soup.find_all('div', 'price-div')
        for row in div_list:
            # Strip and save the innerHtml.
            temp_str = row.text.strip()
            if 'Price:' in temp_str:
                # Remove the title and discount rate.
                temp_str = temp_str.replace('Price:', '').strip()
                temp_str = temp_str.replace('xx% off Beckett Value', '')
                temp_str = temp_str.strip().replace('$', '')
                # Find the location of the period.
                index = temp_str.index('.')
                card_data['price'] = float(temp_str[:index + 3])
                break
        div_list = soup.find_all('div', 'condition')
        for row in div_list:
            # Strip and save the innerHtml.
            temp_str = row.text.strip()
            if 'Condition:' in temp_str:
                # Remove the title.
                temp_str = temp_str.replace('Condition:', '').strip()
                card_data['condition'] = temp_str
                break
        # Get the h4 that contains quantity data.
        h4_list = soup.find_all('h4', 'lineheight-34')
        for row in h4_list:
            # Strip and save the innerHtml.
            temp_str = row.text.strip()
            if 'Qty Available: ' in temp_str:
                temp_str = temp_str.replace('Qty Available:', '').strip()
                card_data['quantity'] = temp_str
                card_data['max'] = temp_str
                break

        # Get the team, brand, and manufaturer.
        li_list = soup.find_all('li')
        for row in li_list:
            # Strip and save the innerHtml.
            temp_str = row.text.strip()
            # Get the category_name and category_id.
            if 'Sport:' in temp_str:
                temp_str = temp_str.replace('Sport:', '').strip()
                # Check to see if more than one category is listed.
                temp_list = temp_str.split(',')
                card_data['category_name'] = temp_list
                a_list = row.find_all('a')
                if len(a_list) > 0:
                    card_data['category_url'] = list()
                    card_data['category_id'] = list()
                    for entry in a_list:
                        card_data['category_url'].append(entry['href'])
                        temp_list = entry['href'].split('=')
                        card_data['category_id'].append(temp_list[-1])

            # Get the team_name and team_id.
            if 'Team:' in temp_str:
                temp_str = temp_str.replace('Team:', '').strip()
                # Check to see if more than one team is listed.
                temp_list = temp_str.split(',')
                card_data['team_name'] = temp_list
                a_list = row.find_all('a')
                card_data['team_url'] = list()
                card_data['team_id'] = list()
                for entry in a_list:
                    card_data['team_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    card_data['team_id'].append(temp_list[-1])

            # Get the brand info.
            if 'Brand:' in temp_str:
                temp_str = temp_str.replace('Brand:', '').strip()
                # Check to see if more than one brand is listed.
                temp_list = temp_str.split(',')
                card_data['brand_name'] = temp_list
                a_list = row.find_all('a')
                card_data['brand_url'] = list()
                card_data['brand_id'] = list()
                for entry in a_list:
                    card_data['brand_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    card_data['brand_id'].append(temp_list[-1])

            # Get the manufacturer info.
            if 'Manufacturer:' in temp_str:
                temp_str = temp_str.replace('Manufacturer:', '').strip()
                # Check to see if more than one brand is listed.
                temp_list = temp_str.split(',')
                card_data['manufacturer_name'] = temp_list
                a_list = row.find_all('a')
                card_data['manufacturer_url'] = list()
                card_data['manufacturer_id'] = list()
                for entry in a_list:
                    card_data['manufacturer_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    card_data['manufacturer_id'].append(temp_list[-1])
                break
    except IndexError as err:
        print('Something went wrong: {}'.format(err))
        print(card_data['inventory_url'])
    return card_data


def get_card_data2(card_soup: 'BeautifulSoup', card_data: dict) -> dict:
    """ This function scrapes information from a page that loads when
        navigating to a specific card located on the list of cards
        available from a set search."""

    # Find the list that contains more card_data.
    class_name = 'similar-item similar-item-new'
    ul_list = card_soup.find_all('ul', class_name)
    li_list = ul_list[0].find_all('li')
    # Cycle through the li_list and save the data.
    for row in li_list:
        # Strip and save the innerHtml.
        temp_str = row.text.strip()
        if 'Set:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Set:', '').strip()
            # Find and save the set link.
            a_list = row.find_all('a')
            set_name_link = a_list[0]['href']
            # Get the year from the link.
            temp_list = set_name_link.split('/')
            card_data['set_year'] = temp_list[-3]
            # Remove the year from the temp_str and save as set_name.
            temp_str = temp_str.replace(card_data['set_year'], '', 1)
            card_data['set_name'] = temp_str.strip()
        if 'Card Number:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Card Number:', '').strip()
            card_data['card_number'] = temp_str
#        if 'Other Attributes:' in temp_str:
#            # Remove the title.
#            temp_str = temp_str.replace('Other Attributes:', '').strip()
#            temp_list = temp_str.split(',')
#            for row in temp_list:
#                temp_str = row.replace('(', '')
#                temp_str = temp_str.replace(')', '')
#                print(temp_str)
#                card_data['attribute_name'].append(temp_str.strip())

        if 'Print Run:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Print Run:', '').strip()
            card_data['print_run'] = temp_str

    # Get the 'Other attributes.
    temp_strong = card_soup.find_all('strong', string='Other Attributes:')
    if len(temp_strong) > 0:
        temp_parent = temp_strong[0].parent
        temp_str = temp_parent.text.replace('Other Attributes:', '').strip()
        temp_list = temp_str.split(',')
        for entry in temp_list:
            temp_str = entry.replace('(', '')
            temp_str = temp_str.replace(')', '')
            card_data['attribute_name'].append(temp_str.strip())

    # Get the attributes.
    a_list = card_soup.find_all('a', 'atb-ser')
    for entry in a_list:
        temp_list = entry.text.split(',')
        for row in temp_list:
            temp_str = row.replace('(', '')
            temp_str = temp_str.replace(')', '')
            card_data['attribute_name'].append(temp_str.strip())

    # Get the category_id if it wasn't obtained from get_card_data.
    if 'category_id' not in card_data:
        # Find the strong elements with innerHtml="Sport:".
        temp_strong = card_soup.find_all('strong', string='Sport:')
        # If needed, check for multiple entries innerHtml="Sports:".
        if len(temp_strong) == 0:
            # Find the strong elements with innerHtml="Sports:".
            temp_strong = card_soup.find_all('strong', string='Sports:')
        # Find the temp_strong sibling a elements.
        a_list = temp_strong[0].find_next_siblings('a')
        card_data['category_url'] = list()
        card_data['category_id'] = list()
        card_data['category_name'] = list()
        for entry in a_list:
            # Save the category_url and category_id.
            card_data['category_url'].append(entry['href'])
            temp_list = entry['href'].split('=')
            card_data['category_id'].append(temp_list[-1])
            card_data['category_name'].append(entry.text.strip())

    # Get the player_name.
    a_list = card_soup.find_all(href=re.compile('www.beckett.com/player/'))
#    print(len(a_list), 'player links were found.')
    for entry in a_list:
        card_data['player_url'].append(entry['href'])
        # Get the official player_name.
        soup = get_soup(entry['href'])
        card_data = get_player_name(soup, card_data)
        temp_list = entry['href'].split('-')
        temp_str = temp_list[-1]
        card_data['player_id'].append(temp_str)

    # Update the card_name field.
    temp_str = card_data['card_name']
    temp_str = temp_str.replace(card_data['set_year'], '', 1).strip()
    temp_str = temp_str.replace(card_data['set_name'], '', 1).strip()
    temp_str = temp_str.replace(card_data['card_number'], '', 1).strip()
    card_data['card_name'] = temp_str
#    print(card_data)
    return card_data


def get_card_id(card_data: dict) -> dict:
    try:
        # Create a page number to ensure that the card_id is found.
        page_num = 1
        # Create a url for the set page.
        url = ('https://www.beckett.com/' +
               card_data['category_name'][0].lower() + '/' +
               card_data['temp_year_name'] + '/' +
               card_data['temp_set_name'].replace(' ', '-').lower() +
               '/')
#        print('debugging-->', url, '\ndebugging\n')
        # Make the soup.
        soup = get_soup(url)
        # Find the link with the set_id.
        a_list = soup.find_all(href=re.compile('\?set_id='))
#        print('len(a_list)', len(a_list))
#        print('url:', a_list[0]['href'])
        # Save the set_url and set_id.
        card_data['set_url'] = a_list[0]['href']
        temp_list = card_data['set_url'].split('set_id=')
        temp_list = temp_list[1].split('&')
        card_data['set_id'] = temp_list[0]
        # Save the total number of cards in the set.
        total_cards = int(a_list[0].text.strip().replace(',', ''))
        # Calculate the max number of pages to search.
        page_end = math.ceil(total_cards/25)
#        print('This set has', total_cards, 'cards.')
#        print(card_data['set_id'])
        # Request the set page.
        soup = get_soup(a_list[0]['href'])
        # Create a string to match the href attribute.
        temp_str = (card_data['temp_year_name'] + '/' +
                    card_data['temp_set_name'].replace(' ', '-').lower() +
                    '/' + card_data['temp_card_number'].lower() + '-')
        temp_list = []
        while len(temp_list) == 0 and page_num < page_end + 1:
            # Find the link with the card_id.
            temp_list = soup.find_all(href=re.compile(temp_str))
#            print('len(temp_list)', len(temp_list))
#            print('Checking page', page_num, 'for', temp_str)
#            print(len(temp_list), 'matches were found for the card')
            # If found, save the card_url and card_id.
            if len(temp_list) == 1:
                # Save the link.
                card_data['card_url'] = temp_list[0]['href']
                # Get the card_id
                temp_list = temp_list[0]['href'].split('-')
                card_data['card_id'] = temp_list[-1]
                return card_data
            # If not found, check the next page if available.
            elif len(temp_list) == 0 and 'card_url' not in card_data:
                page_num += 1
                # Create the url for the next page.
                temp_url = (a_list[0]['href'] + '&rowNum=25&page=' +
                            str(page_num))
            # If more than one is found there is a problem.
            elif len(temp_list) > 1:
                temp_str = str(len(temp_list))
                temp_str += (' cards have the same number!')
                print(temp_str)
                return card_data
            # Request the next page.
            soup = get_soup(temp_url)
    except IndexError as err:
        print('Something went wrong with get_card_id: {}'.format(err))
        print(card_data['inventory_url'])
    # Return the card_data even if no match was found.
    return card_data


def get_inventory_ids(soup: 'BeautifulSoup') -> list:
    """ This function scrapes information from a page that loads when
        navigating a dealer's marketplace homepage."""

    # Create a list to store data for each record.
    records = []
    try:
        li_list = soup.find_all('li', 'title')
        # For each card, get the card_name, inventory_url, and inventory_id.
        for i in range(0, len(li_list)):
            # Create a dictionary to store return values.
            card_data = {'player_id': list(), 'player_name': list(),
                         'player_url': list(),
                         'set_id': '', 'set_year': '', 'set_name': '',
                         'card_id': '', 'card_number': '', 'card_name': '',
                         'value_low': 0, 'value_high': 0,
                         'inventory_id': '', 'condition': '', 'quantity': '',
                         'min': 1, 'max': '', 'price': 0,
                         'attribute_name': list(), 'print_run': 0,
                         'inventory_url': ''
                         }
            # Find the a element that contains the inventory_url.
            a_list = li_list[i].find_all('a')
            # Save the link.
            card_data['inventory_url'] = a_list[0]['href']
            # Get the inventory_id from the link.
            temp_list = card_data['inventory_url'] .split('_')
            card_data['inventory_id'] = temp_list[-1]
            # Save the unformatted card_name.
            card_data['card_name'] = a_list[0].text.strip()
            # Save the set_name, set_year, and card_number.
            temp_list = card_data['card_name'].split('#')
            temp_list2 = temp_list[0].split(' ')
            card_data['temp_year_name'] = temp_list2[0]
            temp_str = ' '.join(temp_list2[1:]).strip()
            # Remove any special characters from the temp_set_name.
            temp_str = ''.join(c for c in temp_str if c.isalnum() or
                               c == '-' or c == ' ')
            card_data['temp_set_name'] = temp_str
            temp_list3 = temp_list[1].split(' ')
            card_data['temp_card_number'] = temp_list3[0]
            records.append(card_data)
    except IndexError as err:
        print('Something went in get_inventory_ids: {}'.format(err))
        print(len(li_list), 'li elements with className="title" were found.')
        print(len(a_list), 'a elements were found in li element #:', i, '.')
    return records


def get_player_name(soup: 'BeautifulSoup', card_data: dict) -> dict:
    class_name = 'pull-left paddingLeft10'
    # Get the official player_name.
    try:
        div_list = soup.find_all('div', class_name)
        if len(div_list) > 0:
            temp_str = div_list[0].text.strip()
            card_data['player_name'].append(temp_str)
    except IndexError as err:
        print('Something went wrong in get_player_name: {}'.format(err))
        print(card_data['inventory_url'])
    return card_data


def get_record_count(soup: 'BeautifulSoup') -> int:
    try:
        # Find the total number of records.
        temp_str = soup.find(string=re.compile('Showing records '))
        if temp_str:
            temp_list = temp_str.split('of')
            records = int(temp_list[-1].strip())
        else:
            records = 0
    except IndexError as err:
        print('Something went wrong in get_record_count: {}'.format(err))
    return records


def get_soup(url: str) -> 'BeautifulSoup':
    try:
        # Get the page requested.
        r = requests.get(url)
        # Save the content.
        c = r.content
        # Parse the content.
        return BeautifulSoup(c, 'html.parser')
    except requests.Timeout as err:
        print('Something went wrong in get_soup: {}'.format(err))
