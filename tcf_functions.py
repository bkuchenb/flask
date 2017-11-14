# -*- coding: utf-8 -*-
"""
Created on Fri Nov 10 12:47:48 2017

@author: bk00chenb
"""

import math
import re
import requests
from bs4 import BeautifulSoup
import MySQLdb

import tcf_sql as _sql


def add_card_data(card_data: dict, cursor: 'cursor') -> None:
    try:
        # start_time = time.time()
        # Check to see if there is more than 1 brand_id.
        for index in range(0, len(card_data['brand_id'])):
            # Check to see if the brand has already been added.
            cursor.execute(_sql.select_brand(card_data, index))
            result = cursor.fetchall()
            # If the brand doesn't exist, insert it into tcf_brand.
            if(len(result) == 0):
                # Add the item if the number of ids and names matches.
                if(len(card_data['brand_id']) == len(card_data['brand_name'])):
                    cursor.execute(_sql.insert_brand(card_data, index))

        # Check to see if there is more than 1 manufacturer_id.
        for index in range(0, len(card_data['manufacturer_id'])):
            # Check to see if the manufacturer has already been added.
            cursor.execute(_sql.select_manufacturer(card_data, index))
            result = cursor.fetchall()
            # If the manufacturer doesn't exist, insert it.
            if len(result) == 0:
                cursor.execute(_sql.insert_manufacturer(card_data, index))

        # Check to see if there is more than 1 category_id.
        for index in range(0, len(card_data['category_id'])):
            # Check to see if the category has already been added.
            cursor.execute(_sql.select_category(card_data, index))
            result = cursor.fetchall()
            # If the category doesn't exist, insert it into tcf_category.
            if len(result) == 0:
                cursor.execute(_sql.insert_category(card_data, index))

            # Check to see if the set has already been added.
            cursor.execute(_sql.select_set(card_data, index))
            result = cursor.fetchall()
            # If the set doesn't exist, insert it into tcf_set.
            if len(result) == 0:
                cursor.execute(_sql.insert_set(card_data))

            # Check to see if the set_category has already been added.
            cursor.execute(_sql.select_set_category(card_data, index))
            result = cursor.fetchall()
            # If the set_category doesn't exist, insert it.
            if(len(result) == 0):
                cursor.execute(_sql.insert_set_category(card_data, index))

        # Check to see if the card has already been added to tcf_card.
        cursor.execute(_sql.select_card(card_data))
        result = cursor.fetchall()
        if len(result) == 0:
            # If the card_id doesn't exist, insert it.
            cursor.execute(_sql.insert_card(card_data))

        # Check to see if the card has already been added to tcf_inventory.
        cursor.execute(_sql.select_inventory(card_data))
        result = cursor.fetchall()
        if len(result) == 0:
            # If the inventory_id doesn't exist, insert it.
            cursor.execute(_sql.insert_inventory(card_data))

        # Check to see if there is more than 1 player_id.
        for index in range(0, len(card_data['player_id'])):
            # Check to see if the player has already been added.
            cursor.execute(_sql.select_player(card_data, index))
            result = cursor.fetchall()
            # If the player doesn't exist, insert it into tcf_player.
            if len(result) == 0:
                cursor.execute(_sql.insert_player(card_data, index))
            # Check to see if the card_player has already been added.
            cursor.execute(_sql.select_card_player(card_data, index))
            result = cursor.fetchall()
            # If the card_player doesn't exist, insert it.
            if len(result) == 0:
                cursor.execute(_sql.insert_card_player(card_data, index))

        # Check to see if there is more than 1 team_id.
        for index in range(0, len(card_data['team_id'])):
            # Check to see if the team has already been added.
            cursor.execute(_sql.select_team(card_data, index))
            result = cursor.fetchall()
            # If the team doesn't exist, insert it into tcf_team.
            if len(result) == 0:
                # Add the team if the number of ids and names matches.
                if len(card_data['team_id']) == len(card_data['team_name']):
                    cursor.execute(_sql.insert_team(card_data, index))

            # Check to see if the card_team has already been added.
            cursor.execute(_sql.select_card_team(card_data, index))
            result = cursor.fetchall()
            # If the card_team doesn't exist, insert it into tcf_card_team.
            if len(result) == 0:
                cursor.execute(_sql.insert_card_team(card_data, index))

        # Check to see if there is more than 1 attribute_name.
        for index in range(0, len(card_data['attribute_name'])):
            # Check to see if the attribute has already been added.
            cursor.execute(_sql.select_attribute(card_data, index))
            result = cursor.fetchall()
            # If the attribute doesn't exist, insert it into tcf_attribute.
            if len(result) == 0:
                cursor.execute(_sql.insert_attribute(card_data, index))
                # Get the attribute_id just created.
                cursor.execute(_sql.select_attribute(card_data, index))
                result = cursor.fetchall()
                card_data['attribute_id'] = result[0][0]
                # Check to see if the card_attribute has already been added.
                cursor.execute(_sql.select_card_attribute(card_data, index))
                result = cursor.fetchall()
                # If the card_attribute doesn't exist, insert it.
                if len(result) == 0:
                    cursor.execute(_sql.insert_card_attribute(card_data, index))
            else:
                card_data['attribute_id'] = result[0][0]
                # Check to see if the card_attribute has already been added.
                cursor.execute(_sql.select_card_attribute(card_data, index))
                result = cursor.fetchall()
                # If the card_attribute doesn't exist, insert it.
                if len(result) == 0:
                    cursor.execute(_sql.insert_card_attribute(card_data, index))
#        print('Sql insert statements took',
#              round(time.time() - start_time, 2), 'seconds to run.')
    except IndexError as err:
        print('Something went wrong: {}'.format(err))
    except MySQLdb.Error as err:
        # If the insert fails, print a message and the query.
        print('Something went wrong: {}'.format(err))


def get_card_data(soup: 'BeautifulSoup', card_data: dict) -> dict:
    # Get the image links.
    temp_img = soup.find_all(id='item_image_front')
    card_data['image_src_front'] = temp_img[0]['src']
    temp_img = soup.find_all(id='item_image_back')
    card_data['image_src_back'] = temp_img[0]['src']
    # Get the span that contains the price data.
    try:
        div_list = soup.find_all('div', 'price-div')
        for row in div_list:
            # Strip and save the innerHtml.
            temp_str = row.text.strip()
            if 'Price:' in temp_str:
                # Remove the title and discount rate.
                temp_str = temp_str.replace('Price:', '').strip()
                temp_str = temp_str.replace('xx% off Beckett Value', '')
                temp_str = temp_str.strip()
                # Check to see if a Canadian price is present.
                if 'CAD' in temp_str:
                    temp_list = temp_str.split('CAD')
                    card_data['price'] = float(temp_list[0].replace('$', ''))
                else:
                    card_data['price'] = float(temp_str.replace('$', ''))
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
        # Get the sport, team, brand, and manufaturer.
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
                for entry in a_list:
                    card_data['category_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    temp_str = temp_list[len(temp_list) - 1]
                    card_data['category_id'].append(temp_str)
            # Get the team_name and team_id.
            if 'Team:' in temp_str:
                temp_str = temp_str.replace('Team:', '').strip()
                # Check to see if more than one team is listed.
                temp_list = temp_str.split(',')
                card_data['team_name'] = temp_list
                a_list = row.find_all('a')
                for entry in a_list:
                    card_data['team_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    temp_str = temp_list[len(temp_list) - 1]
                    card_data['team_id'].append(temp_str)
            # Get the brand info.
            if 'Brand:' in temp_str:
                temp_str = temp_str.replace('Brand:', '').strip()
                # Check to see if more than one brand is listed.
                temp_list = temp_str.split(',')
                card_data['brand_name'] = temp_list
                a_list = row.find_all('a')
                for entry in a_list:
                    card_data['brand_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    temp_str = temp_list[len(temp_list) - 1]
                    card_data['brand_id'].append(temp_str)
            # Get the manufacturer info.
            if 'Manufacturer:' in temp_str:
                temp_str = temp_str.replace('Manufacturer:', '').strip()
                # Check to see if more than one brand is listed.
                temp_list = temp_str.split(',')
                card_data['manufacturer_name'] = temp_list
                a_list = row.find_all('a')
                for entry in a_list:
                    card_data['manufacturer_url'].append(entry['href'])
                    temp_list = entry['href'].split('=')
                    temp_str = temp_list[len(temp_list) - 1]
                    card_data['manufacturer_id'].append(temp_str)
                break
    except IndexError as err:
        print('Something went wrong: {}'.format(err))
    return card_data


def get_card_data2(card_soup: 'BeautifulSoup', card_data: dict) -> dict:
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
        if 'Other Attributes:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Other Attributes:', '').strip()
            temp_str = temp_str.replace('(', '').strip()
            temp_str = temp_str.replace(')', '').strip()
            temp_list = temp_str.split(',')
            for row in temp_list:
                card_data['attribute_name'].append(row.strip())
        if 'Attributes:' in temp_str:
            # Find the links with the attribute_name.
            a_list = row.find_all('a')
            for entry in a_list:
                temp_str = entry.text.strip()
                temp_str = temp_str.replace('(', '').strip()
                temp_str = temp_str.replace(')', '').strip()
                card_data['attribute_name'].append(entry.text)
        if 'Print Run:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Print Run:', '').strip()
            card_data['print_run'] = temp_str
        if 'Player:' in temp_str:
            # Remove the title.
            temp_str = temp_str.replace('Player:', '').strip()
            # Check to see if more than one player is listed.
            a_list = row.find_all('a')
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
#        print('url:', a_list[0]['href'])
        # Save the set_url and set_id.
        card_data['set_url'] = a_list[0]['href']
        temp_list = card_data['set_url'].split('set_id=')
        temp_list = temp_list[1].split('&')
        card_data['set_id'] = temp_list[0]
        # Save the total number of cards in the set.
        total_cards = int(a_list[0].text.strip())
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
        while len(temp_list) == 0 and page_num < page_end:
            # Find the link with the card_id.
            temp_list = soup.find_all(href=re.compile(temp_str))
#            print(temp_str)
#           print(len(temp_list), 'matches were found for the card')
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
        print('Something went wrong: {}'.format(err))
    # Return the card_data even if no match was found.
    return card_data


def get_inventory_ids(soup: 'BeautifulSoup') -> list:
    # Create a list to store data for each record.
    records = []
    try:
        li_list = soup.find_all('li', 'title')
        # For each card, get the card_name, inventory_url, and inventory_id.
        for i in range(0, len(li_list)):
            # Create a dictionary to store return values.
            card_data = {'brand_id': list(), 'brand_name': list(),
                         'brand_url': list(),
                         'category_id': list(), 'category_name': list(),
                         'category_url': list(),
                         'manufacturer_id': list(),
                         'manufacturer_name': list(),
                         'manufacturer_url': list(),
                         'player_id': list(), 'player_name': list(),
                         'player_url': list(),
                         'team_id': list(), 'team_name': list(),
                         'team_url': list(),
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
            temp_str = temp_str.replace('\'', '')
            temp_str = temp_str.replace('.', '')
            temp_str = temp_str.replace(':', '')
            temp_str = temp_str.replace('\'', '')
            card_data['temp_set_name'] = temp_str.replace('/', '')
            temp_list3 = temp_list[1].split(' ')
            card_data['temp_card_number'] = temp_list3[0]
            records.append(card_data)
    except IndexError as err:
        print('Something went wrong: {}'.format(err))
        print(len(li_list), 'li elements with className="title" were found.')
        print(len(a_list), 'a elements were found in li element #:', i, '.')
    return records


def get_player_name(soup: 'BeautifulSoup', card_data: dict) -> dict:
    class_name = 'pull-left paddingLeft10'
    # Get the official player_name.
    try:
        div_list = soup.find_all('div', class_name)
        temp_str = div_list[0].text.strip()
        card_data['player_name'].append(temp_str)
    except IndexError as err:
        print('Something went wrong: {}'.format(err))
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
        print('Something went wrong: {}'.format(err))
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
        print('Something went wrong: {}'.format(err))
