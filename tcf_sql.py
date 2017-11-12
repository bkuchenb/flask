# -*- coding: utf-8 -*-
"""
Created on Fri Nov 10 16:43:12 2017

@author: bk00chenb
"""


def insert_attribute(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_attribute(attribute_name) "
              "VALUES({attribute_name!r})")
    return insert.format(**card_data)


def insert_brand(card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['brand_id']) != len(card_data['brand_name'])):
        print("The number of ids and names doesn't match.")
        return ''
    insert = ("INSERT INTO tcf_brand(brand_id, brand_name, brand_url) "
              "VALUES({brand_id[" + str(index) + "]}, "
              "{brand_name[" + str(index) + "]!r}, "
              "{brand_url[" + str(index) + "]!r})")
    return insert.format(**card_data)


def insert_card(card_data: dict) -> str:
    insert = ("INSERT INTO tcf_card"
              "(card_id, set_id, card_number, card_name, "
              "image_src_back, image_src_front, "
              "value_high, value_low, print_run, card_url) "
              "VALUES({card_id}, {set_id}, {card_number!r}, "
              "{card_name!r}, {image_src_back!r}, {image_src_front!r}, "
              "{value_high}, {value_low}, {print_run}, {card_url!r})")
    return insert.format(**card_data)


def insert_card_attribute(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_card_attribute(card_id, attribute_id) "
              "VALUES({card_id}, {attribute_id})")
    return insert.format(**card_data)


def insert_card_player(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_card_player(player_id, card_id) "
              "VALUES({player_id[" + str(index) + "]}, "
              "{card_id})")
    return insert.format(**card_data)


def insert_card_team(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_card_team(team_id, card_id) "
              "VALUES({team_id[" + str(index) + "]}, "
              "{card_id})")
    return insert.format(**card_data)


def insert_category(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_category"
              "(category_id, category_name, category_url) "
              "VALUES({category_id[" + str(index) + "]}, "
              "{category_name[" + str(index) + "]!r}, "
              "{category_url[" + str(index) + "]!r})")
    return insert.format(**card_data)


def insert_exception(card_data: dict) -> str:
    insert = ("INSERT INTO tcf_exception(card_data) "
              "VALUES({card_name!r})")
    print(insert.format(**card_data))
    return insert.format(**card_data)


def insert_inventory(card_data: dict) -> str:
    insert = ("INSERT INTO tcf_inventory(inventory_id, card_id, grade, "
              "quantity, max, min, price, inventory_url) "
              "VALUES({inventory_id}, {card_id}, {condition!r}, "
              "{quantity}, {max}, {min}, {price}, {inventory_url!r})")
    return insert.format(**card_data)


def insert_manufacturer(card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['manufacturer_id']) !=
       len(card_data['manufacturer_name'])):
        print("The number of ids and names doesn't match.")
        return ''
    insert = ("INSERT INTO tcf_manufacturer"
              "(manufacturer_id, manufacturer_name, manufacturer_url) "
              "VALUES({manufacturer_id[" + str(index) + "]}, "
              "{manufacturer_name[" + str(index) + "]!r}, "
              "{manufacturer_url[" + str(index) + "]!r})")
    return insert.format(**card_data)


def insert_player(card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['player_id']) != len(card_data['player_name'])):
        print("The number of ids and names doesn't match.")
        return ''
    insert = ("INSERT INTO tcf_player(player_id, player_name, player_url) "
              "VALUES({player_id[" + str(index) + "]}, "
              "{player_name[" + str(index) + "]!r}, "
              "{player_url[" + str(index) + "]!r})")
    return insert.format(**card_data)


def insert_set(card_data: dict) -> str:
    # Add the set to tcf_set if there is only one manufacturer and one brand.
    if(len(card_data['manufacturer_id']) > 1 or
       len(card_data['brand_id']) > 1):
        print('There is more than 1 manufacturer or brand id.')
        return ''
    insert = ("INSERT INTO tcf_set"
              "(set_id, set_year, set_name, manufacturer_id, "
              "brand_id, set_url) "
              "VALUES({set_id}, {set_year!r}, {set_name!r}, "
              "{manufacturer_id[0]}, {brand_id[0]}, {set_url!r})")
    # If there is no manufacturer, remove the variables from insert.
    if len(card_data['manufacturer_id']) < 1:
        insert = insert.replace('manufacturer_id, ', '')
        insert = insert.replace('{manufacturer_id[0]}, ', '')
    # If there is no brand, remove the variables from insert.
    if len(card_data['brand_id']) < 1:
        insert = insert.replace('brand_id, ', '')
        insert = insert.replace('{brand_id[0]}, ', '')
    return insert.format(**card_data)


def insert_set_category(card_data: dict, index: int) -> str:
    insert = ("INSERT INTO tcf_set_category(category_id, set_id) "
              "VALUES({category_id[" + str(index) + "]}, "
              "{set_id})")
    return insert.format(**card_data)


def insert_team(card_data: dict, index: int) -> str:
    # Add the item if the number of ids and names matches.
    if(len(card_data['team_id']) != len(card_data['team_name'])):
        print("The number of ids and names doesn't match.")
        return ''
    insert = ("INSERT INTO tcf_team(team_id, team_name, team_url) "
              "VALUES({team_id[" + str(index) + "]}, "
              "{team_name[" + str(index) + "]!r}, "
              "{team_url[" + str(index) + "]!r})")
    return insert.format(**card_data)


def select_attribute(card_data: dict, index: int) -> str:
    select = ("SELECT attribute_id "
              "FROM tcf_attribute "
              "WHERE attribute_name = {attribute_name[" + str(index) + "]!r}")
    return select.format(**card_data)


def select_brand(card_data: dict, index: int) -> str:
    select = ("SELECT brand_id "
              "FROM tcf_brand "
              "WHERE brand_id = {brand_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_card(card_data: dict) -> str:
    select = ("SELECT card_id "
              "FROM tcf_card "
              "WHERE card_id = {card_id}")
    return select.format(**card_data)


def select_card_attribute(card_data: dict, index: int) -> str:
    select = ("SELECT * "
              "FROM tcf_card_attribute "
              "WHERE card_id = {card_id} "
              "AND attribute_id = {attribute_id}")
    return select.format(**card_data)


def select_card_player(card_data: dict, index: int) -> str:
    select = ("SELECT * "
              "FROM tcf_card_player "
              "WHERE card_id = {card_id} "
              "AND player_id = {player_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_card_team(card_data: dict, index: int) -> str:
    select = ("SELECT * "
              "FROM tcf_card_team "
              "WHERE card_id = {card_id} "
              "AND team_id = {team_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_category(card_data: dict, index: int) -> str:
    select = ("SELECT category_id "
              "FROM tcf_category "
              "WHERE category_id = {category_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_inventory(card_data: dict) -> str:
    select = ("SELECT inventory_id "
              "FROM tcf_inventory "
              "WHERE inventory_id = {inventory_id}")
    return select.format(**card_data)


def select_manufacturer(card_data: dict, index: int) -> str:
    select = ("SELECT manufacturer_id "
              "FROM tcf_manufacturer "
              "WHERE manufacturer_id = {manufacturer_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_player(card_data: dict, index: int) -> str:
    select = ("SELECT player_id "
              "FROM tcf_player "
              "WHERE player_id = {player_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_set(card_data: dict, index: int) -> str:
    select = ("SELECT tcf_set.set_id "
              "FROM tcf_set "
              "INNER JOIN tcf_set_category "
              "ON tcf_set.set_id = tcf_set_category.set_id "
              "WHERE tcf_set.set_year = {set_year!r} "
              "AND tcf_set_category.category_id = "
              "{category_id[" + str(index) + "]} "
              "AND tcf_set.set_name = {set_name!r}")
    return select.format(**card_data)


def select_set_category(card_data: dict, index: int) -> str:
    select = ("SELECT * "
              "FROM tcf_set_category "
              "WHERE set_id = {set_id} "
              "AND category_id = {category_id[" + str(index) + "]}")
    return select.format(**card_data)


def select_team(card_data: dict, index: int) -> str:
    select = ("SELECT team_id "
              "FROM tcf_team "
              "WHERE team_id = {team_id[" + str(index) + "]}")
    return select.format(**card_data)


def update_inventory(card_data: dict) -> str:
    update = ("UPDATE tcf_inventory "
              "Set quantity = {quantity}, price = {price} "
              "WHERE inventory_id = {inventory_id}")
    return update.format(**card_data)
