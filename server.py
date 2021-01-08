from flask import Flask, request, jsonify, send_from_directory
import json
from flask_cors import CORS
from datetime import datetime
import pytz


app = Flask(__name__)
cors = CORS(app)

@app.route('/damp/api/login', methods=['GET'])
def login():
    email = request.args.get('email')
    f = open("admin.json", "r", encoding="utf8")
    emails = json.loads(f.read())['emails']
    f.close()
    print(emails)
    if email in emails:
        return jsonify(role="admin")
    else:
        return jsonify(role="notAdmin")

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
    role = ""
    try:
        email = request.args.get('email')

        f = open("admin.json", "r", encoding="utf8")
        emails = json.loads(f.read())['emails']
        f.close()

        if email in emails:
            role = "admin"
        else:
            role = "notAdmin"
    except:
        pass

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
                    return jsonify(data=data, res_status='FOUND', role=role)

    return jsonify(res_status= 'NOT FOUND', role=role)


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
                        "imgUrl": img_url,
                        "show":False
                    }
                    data[item_no]['reviews'].insert(0, new_data)
                    stat = True
                    f = open(i, 'w', encoding="utf8")
                    f.write(json.dumps(data))
                    f.close()
                    return jsonify( res_status='SUBMITED')

    return jsonify(res_status='NOT SUBMITED')

@app.route('/damp/api/togglecommentshow', methods=['GET'])
def toggleComment():
    course_id = request.args.get('id')
    review = request.args.get('review')
    email = request.args.get('email')
    time = request.args.get('time')

    files = ['HSS_Electives.json', 'Institute_Electives.json',
             'ME_Dept_Electives.json', 'CSE_Dept_Electives.json', 'EE_Dept_Electives.json']
    stat = False

    for i in files:
        if not stat:
            f = open(i, 'r', encoding="utf8")
            data = json.loads(f.read())
            f.close()
            
            for item_no in range(len(data)):
                
                if str(course_id) == str(data[item_no]['_id']['$oid']):
                    print(data[item_no]['_id']['$oid'])
                    for eachReviewNo in range(len(data[item_no]['reviews'])):
                        if review == data[item_no]['reviews'][eachReviewNo]['review'] and email == data[item_no]['reviews'][eachReviewNo]['email'] and str(time) == data[item_no]['reviews'][eachReviewNo]['time'][:-1]:
                            print("hi")
                            data[item_no]['reviews'][eachReviewNo]['show'] = not data[item_no]['reviews'][eachReviewNo]['show']
                            stat = True
                            f = open(i, 'w', encoding="utf8")
                            f.write(json.dumps(data))
                            f.close()
                            return jsonify(res_status='UPDATED')
    return jsonify(res_status='NOT UPDATED')


@app.route('/damp/api/deletecomment', methods=['GET'])
def deleteComment():
    course_id = request.args.get('id')
    review = request.args.get('review')
    email = request.args.get('email')
    time = request.args.get('time')


    files = ['HSS_Electives.json', 'Institute_Electives.json',
             'ME_Dept_Electives.json', 'CSE_Dept_Electives.json', 'EE_Dept_Electives.json']
    stat = False

    for i in files:
        if not stat:
            f = open(i, 'r', encoding="utf8")
            data = json.loads(f.read())
            f.close()

            for item_no in range(len(data)):

                if str(course_id) == str(data[item_no]['_id']['$oid']):
                    print(data[item_no]['_id']['$oid'])
                    for eachReviewNo in range(len(data[item_no]['reviews'])):
                        if review == data[item_no]['reviews'][eachReviewNo]['review'] and email == data[item_no]['reviews'][eachReviewNo]['email'] and str(time) == data[item_no]['reviews'][eachReviewNo]['time'][:-1]:
                            data[item_no]['reviews'].pop(eachReviewNo)
                            stat = True
                            f = open(i, 'w', encoding="utf8")
                            f.write(json.dumps(data))
                            f.close()
                            return jsonify(res_status='UPDATED')
    return jsonify(res_status='NOT UPDATED')

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="3000", debug=True)
