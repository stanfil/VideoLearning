# !/usr/bin/env python
# -*- coding:utf-8 -*-
import requests
# import json
from pymongo import MongoClient

conn = MongoClient('127.0.0.1', 27017)
db = conn.videoLearning
collection = db.course
titles = ["http-with-peter", "flexbox-dancer","webpack-react-tricks","webpack-react-mole","aa-journey","happy-videojs","vscode","redux-tower-v2","o-o-js-v2","jwt","img-upload"]


courses = []

res = requests.get('https://haoqicat.com/routeInfo.json').json()['localProps']["courses"]['published']
print(len(res))
for item in res:
    course = {}
    course['link'] = item['link'][1:]
    course['cover'] = item['cover']
    course['date'] = item['date']
    course['title'] = item['title']
    if course['link'] not in titles:
        continue
    courses.append(course)


for i in range(len(courses)):
    link = courses[i]['link']
    res = requests.get('https://haoqicat.com/'+link+'/routeInfo.json').json()['localProps']['toc']
    courses[i]['intro'] = res['intro']
    courses[i]['price'] = res['price']
    courses[i]['chapters'] = res['content'][0]['section']


    for j in range(len(courses[i]["chapters"])):
        sublink = courses[i]['chapters'][j]['link']
        markdown = requests.get('https://haoqicat.com/'+link+'/'+sublink+'/routeInfo.json').json()['localProps']['markdown']
        courses[i]['chapters'][j]['markdown'] = markdown
        print(i,j)
    collection.insert_one(courses[i])

print("success")
