from flask import Flask, request, jsonify, send_from_directory
import json
from flask_cors import CORS
import pymongo
from bson.objectid import ObjectId
from datetime import datetime
import pytz

client = pymongo.MongoClient(
    "mongodb+srv://Server:ODF21Lrh3EFQooDu@smp-iitdh-database.zhcds.gcp.mongodb.net/FAQs?retryWrites=true&w=majority")
FAQSdb = client['FAQs']

Coursesdb = client['Courses']

Teamdb = client['Team']

app = Flask(__name__)
cors = CORS(app)


@app.route('/damp/api/Courses', methods=['GET'])
def Courses():
    course_type = request.args.get('type')
    sem = request.args.get('sem')

    data = []
    raw_data = []
    if course_type == 'coreCSE':
        raw_data = []
        f = open('CSE_Courses.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'coreEE':
        raw_data = []
        f = open('EE_Courses.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'coreME':
        raw_data = []
        f = open('ME_Courses.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'DeptElectCSE':
        raw_data = []
        f = open('CSE_Dept_Electives.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'DeptElectEE':
        raw_data = []
        f = open('EE_Dept_Electives.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'DeptElectME':
        raw_data = []
        f = open('ME_Dept_Electives.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'HSS':
        raw_data = []
        f = open('HSS_Electives.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    elif course_type == 'Institute':
        raw_data = []
        f = open('Institute_Electives.json', 'r', encoding="utf8")
        raw_data = f.read()
        f.close()
    
    raw_data = json.loads(raw_data)
    if course_type == 'coreCSE' or course_type == 'coreEE' or course_type == 'coreME':
        for i in raw_data:
            if int(i['semester']) == int(sem):
                data.append(i)
    elif course_type == 'DeptElectCSE' or course_type == 'DeptElectEE' or course_type == 'DeptElectME':
        for i in raw_data:
            if str(i['semester']) == str(sem):
                data.append(i)
    else:
        data = raw_data
    
    return jsonify(data=data, semester=sem)


@app.route('/damp/api/CourseDetails', methods=['GET'])
def CourseDetails():
    id = request.args.get('id')
    data = []
    raw_data = []
    files = ['CSE_Courses.json', 'EE_Courses.json', 'ME_Courses.json', 'HSS_Electives.json',
             'Institute_Electives.json', 'ME_Dept_Electives.json', 'CSE_Dept_Electives.json','EE_Dept_Electives.json']
    
    for i in files:
        if not len(data):
            f = open(i, 'r', encoding="utf8")
            raw_data = json.loads(f.read())
            f.close()

            for i_no in range(len(raw_data)):
                if str(id) == str(raw_data[i_no]['_id']['$oid']):
                    
                    if not 'reviews' in  raw_data[i_no]:
                        raw_data[i_no]['reviews'] = []
                        f = open(i, 'w', encoding="utf8")
                        f.write(json.dumps(raw_data))
                        f.close()

                    data.append(raw_data[i_no])
                    print(raw_data[i_no])
                    return jsonify(data=data, res_status='FOUND')

    return jsonify(res_status= 'NOT FOUND')


@app.route('/damp/api/SubmitCourseReview', methods=['GET'])
def CourseReview():
    course_id = request.args.get('id')
    new_review = request.args.get('review')
    name = request.args.get('name')
    email = request.args.get('email')
    img_url = request.args.get('imgUrl')

    IST = pytz.timezone('Asia/Kolkata')
    time = datetime.now(IST)
    time = time.strftime('%d-%B-%Y %H:%M ')
    
    files = ['HSS_Electives.json','Institute_Electives.json', 'ME_Dept_Electives.json', 'CSE_Dept_Electives.json', 'EE_Dept_Electives.json']
    stat = False
    for i in files:
        if not stat:
            f = open(i, 'r', encoding="utf8")
            data = json.loads(f.read())
            f.close()
            for item_no in range(len(data)):
                if str(course_id) == str(data[item_no]['_id']['$oid']):

                    new_data = {
                        "name": name,
                        "email": email,
                        "review": new_review,
                        "time": time,
                        "imgUrl":img_url
                    }
                    data[item_no]['reviews'].insert(0, new_data)
                    stat = True
                    f = open(i, 'w', encoding="utf8")
                    f.write(json.dumps(data))
                    f.close()
                    return jsonify( res_status='SUBMITED')

    return jsonify(res_status='NOT SUBMITED')

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
