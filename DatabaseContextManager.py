# -*- coding: utf-8 -*-
"""
Created on Thu Nov  9 04:54:38 2017

@author: bk00chenb
"""


# import MySQLdb
import mysql.connector


class UseDatabase:
    def __init__(self, config: dict) -> None:
        self.configuration = config

    def __enter__(self) -> 'cursor':
        # self.conn = MySQLdb.connect(**self.configuration)
        self.conn = mysql.connector.connect(**self.configuration)
        self.cursor = self.conn.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_value, exc_trace) -> None:
        self.conn.commit()
        self.cursor.close()
        self.conn.close()
