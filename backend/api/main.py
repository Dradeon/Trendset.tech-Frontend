from flask import Flask, request
from flask_cors import CORS
from Helpers.dbHelperclass import dbHelper as dbh
from Helpers.OpenAiHelper import OpenAiHelper
from bson import json_util
import os
import json


session_key = os.urandom(24).hex()

conn = dbh("mongodb+srv://trendset:FIfRuK42erNOir02@trendset.plb5zxd.mongodb.net","trendset")
helper = OpenAiHelper()

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "trendset.tech"}})

@app.route("/api/getUser/<email>")
def getUser(email):
    connResp = conn.getUser(email)
    if connResp is None:
        return("null")
    else:
        return json_util.dumps(connResp)
    
@app.route("/api/addUser", methods=["POST"])
def addUser():
    response = request.data
    jstring =  response.decode('utf8').replace("'", '"')
    data = json.loads(jstring)
    print(data)
    conn.addUser(data)
    return data

@app.route("/api/getUniqueProd/<id>")
def getUniqueProd(id):
    print(id)
    connResp = conn.getUniqueProduct(int(id))
    print(connResp)
    if connResp is None:
        return("null")
    else:
        return json_util.dumps(connResp)
    
@app.route("/api/addProduct/<email>",methods=['POST'])
def addProduct(email):
    response = request.data
    jstring =  response.decode('utf8').replace("'", '"')
    print(jstring)
    data = json.loads(jstring)
    conn.addProduct(email, data)
    return (data)  
#    return json_util.dumps(new_prod)


@app.route("/api/removeProduct/<id>")
def removeProduct(id):
    print(id)
    connResp = conn.removeProduct(int(id))
    if connResp is None:
        return("null")
    else:
        return json_util.dumps(connResp)

@app.route("/api/updaeProduct/<id>")
def updateProduct(id):
    response = request.data
    jstring =  response.decode('utf8').replace("'", '"')
    print(jstring)
    data = json.loads(jstring)
    conn.updateProduct(id=int(id), product=data)
    return (data)

@app.route("/api/getAllForUser/<email>")
def getAllForUser(email):
    print(email)
    result = conn.getAllForUser(email)
    bytes = json_util.dumps(list(result))
    return bytes

@app.route("/api/createBio/")
def createBio():
    response = request.get_json()
    print(response)
    
    name = response.get("name")
    desc = response.get("desc")
    print(name)
    print(desc)
    return helper.createBio(name, desc)


@app.route("/api/makeLogo")
def makeLogo():
    response = request.data
    jstring =  response.decode('utf8').replace("'", '"')
    #print(jstring)
    data = json.loads(jstring)
    print(data["name"])
    #print(type(data["name"]))
    
    return  helper.makeLogo(data["name"]).encode('utf-8')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"