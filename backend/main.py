# # # # # main.py
# # # # from fastapi import FastAPI, File, UploadFile, HTTPException, Form
# # # # from fastapi.middleware.cors import CORSMiddleware
# # # # from motor.motor_asyncio import AsyncIOMotorClient
# # # # from pydantic import BaseModel
# # # # from typing import List, Optional
# # # # import face_recognition
# # # # import numpy as np
# # # # import base64
# # # # from io import BytesIO
# # # # from PIL import Image
# # # # import asyncio
# # # # from datetime import datetime, timedelta
# # # # import os

# # # # app = FastAPI(title="Attendance System API")

# # # # # CORS - Allow your React app
# # # # app.add_middleware(
# # # #     CORSMiddleware,
# # # #     allow_origins=["*"],  # Change to your domain in production
# # # #     allow_credentials=True,
# # # #     allow_methods=["*"],
# # # #     allow_headers=["*"],
# # # # )

# # # # # MongoDB Connection
# # # # MONGODB_URL = "mongodb://localhost:27017"  # Change if needed
# # # # client = AsyncIOMotorClient(MONGODB_URL)
# # # # db = client.attendance_system
# # # # students_col = db.students
# # # # logs_col = db.attendance_logs

# # # # # Pydantic Models
# # # # class Student(BaseModel):
# # # #     usn: str
# # # #     name: str
# # # #     dpt: str
# # # #     avatar: str  # base64 or URL

# # # # class RecognitionResponse(BaseModel):
# # # #     student: Optional[Student] = None
# # # #     type: str  # "IN" or "OUT"
# # # #     confidence: float
# # # #     message: str

# # # # # Helper: Load image from base64
# # # # def load_image_from_base64(b64_string):
# # # #     img_data = base64.b64decode(b64_string.split(',')[1] if ',' in b64_string else b64_string)
# # # #     return Image.open(BytesIO(img_data))

# # # # # GET all students
# # # # @app.get("/api/students")
# # # # async def get_students():
# # # #     students = await students_col.find().to_list(1000)
# # # #     for s in students:
# # # #         s["_id"] = str(s["_id"])
# # # #     return students

# # # # # ADD new student + train face
# # # # @app.post("/api/students")
# # # # async def add_student(
# # # #     name: str = Form(...),
# # # #     usn: str = Form(...),
# # # #     dpt: str = Form(...),
# # # #     photo: UploadFile = File(...)
# # # # ):
# # # #     # Read and encode image
# # # #     contents = await photo.read()
# # # #     img = face_recognition.load_image_file(BytesIO(contents))
# # # #     encodings = face_recognition.face_encodings(img)

# # # #     if len(encodings) == 0:
# # # #         raise HTTPException(400, detail="No face detected in photo")

# # # #     encoding = encodings[0].tolist()

# # # #     # Save avatar as base64
# # # #     b64 = base64.b64encode(contents).decode()

# # # #     student_data = {
# # # #         "usn": usn,
# # # #         "name": name,
# # # #         "dpt": dpt,
# # # #         "avatar": f"data:{photo.content_type};base64,{b64}",
# # # #         "face_encoding": encoding
# # # #     }

# # # #     result = await students_col.insert_one(student_data)
# # # #     return {"success": True, "id": str(result.inserted_id)}

# # # # # FACE RECOGNITION ENDPOINT (Main one!)
# # # # @app.post("/api/recognize")
# # # # async def recognize_face(image: str = Form(...)):  # image is base64 string
# # # #     try:
# # # #         # Load unknown image
# # # #         unknown_img = load_image_from_base64(image)
# # # #         unknown_array = np.array(unknown_img)
# # # #         unknown_encodings = face_recognition.face_encodings(unknown_array)

# # # #         if len(unknown_encodings) == 0:
# # # #             return RecognitionResponse(message="No face detected")

# # # #         unknown_encoding = unknown_encodings[0]

# # # #         # Get all known students
# # # #         students = await students_col.find().to_list(1000)
# # # #         known_encodings = [np.array(s["face_encoding"]) for s in students]
# # # #         known_usns = [s["usn"] for s in students]

# # # #         # Compare
# # # #         matches = face_recognition.compare_faces(known_encodings, unknown_encoding, tolerance=0.5)
# # # #         face_distances = face_recognition.face_distance(known_encodings, unknown_encoding)
# # # #         best_match_idx = np.argmin(face_distances) if len(face_distances) > 0 else -1

# # # #         if best_match_idx >= 0 and matches[best_match_idx]:
# # # #             confidence = 1 - face_distances[best_match_idx]
# # # #             if confidence < 0.5:
# # # #                 return RecognitionResponse(message="Low confidence")

# # # #             student = students[best_match_idx]
# # # #             usn = student["usn"]

# # # #             # Determine IN or OUT
# # # #             last_log = await logs_col.find_one(
# # # #                 {"student_usn": usn},
# # # #                 sort=[("timestamp", -1)]
# # # #             )

# # # #             log_type = "OUT" if last_log and last_log["type"] == "IN" else "IN"

# # # #             # Save log
# # # #             await logs_col.insert_one({
# # # #                 "student_usn": usn,
# # # #                 "student_name": student["name"],
# # # #                 "type": log_type,
# # # #                 "timestamp": datetime.utcnow(),
# # # #                 "confidence": round(confidence, 3)
# # # #             })

# # # #             return RecognitionResponse(
# # # #                 student=Student(usn=usn, name=student["name"], dpt=student["dpt"], avatar=student["avatar"]),
# # # #                 type=log_type,
# # # #                 confidence=round(confidence, 3),
# # # #                 message=f"{student['name']} checked {log_type}!"
# # # #             )
# # # #         else:
# # # #             return RecognitionResponse(message="Face not recognized")

# # # #     except Exception as e:
# # # #         raise HTTPException(500, detail=str(e))

# # # # # Get today's logs
# # # # @app.get("/api/logs/today")
# # # # async def get_today_logs():
# # # #     today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
# # # #     logs = await logs_col.find({"timestamp": {"$gte": today}}).sort("timestamp", -1).to_list(100)
# # # #     for log in logs:
# # # #         log["_id"] = str(log["_id"])
# # # #         log["timestamp"] = log["timestamp"].isoformat()
# # # #     return logs

# # # # # Weekly stats for chart
# # # # @app.get("/api/stats/weekly")
# # # # async def get_weekly_stats():
# # # #     stats = []
# # # #     for i in range(6, -1, -1):
# # # #         date = (datetime.utcnow() - timedelta(days=i)).date()
# # # #         start = datetime.combine(date, datetime.min.time())
# # # #         end = datetime.combine(date, datetime.max.time())

# # # #         present = await logs_col.count_documents({
# # # #             "type": "IN",
# # # #             "timestamp": {"$gte": start, "$lte": end}
# # # #         })
# # # #         total = await students_col.count_documents({})

# # # #         stats.append({
# # # #             "name": date.strftime("%a"),
# # # #             "Present": present,
# # # #             "Absent": max(0, total - present)
# # # #         })
# # # #     return stats



# # # # main.py
# # # from fastapi import FastAPI, File, UploadFile, Form, HTTPException
# # # from fastapi.middleware.cors import CORSMiddleware
# # # from pymongo import MongoClient
# # # from datetime import datetime
# # # import face_recognition
# # # import numpy as np
# # # import base64
# # # from PIL import Image
# # # from io import BytesIO
# # # import os

# # # app = FastAPI(title="AttendSys - Face Recognition Backend")

# # # # CORS - Allow React frontend
# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=["*"],
# # #     allow_credentials=True,
# # #     allow_methods=["*"],
# # #     allow_headers=["*"],
# # # )

# # # # MongoDB Connection
# # # client = MongoClient("mongodb://localhost:27017")
# # # db = client["Attendance"]

# # # # Collections
# # # encodings_col = db["encodings"]        # Stores name + face_encoding
# # # attendance_col = db["attendance"]      # Logs every recognition
# # # subjects_col = db["subjects"]          # Tracks last attendance hour per subject

# # # # Create indexes for performance
# # # encodings_col.create_index("name", unique=True)
# # # attendance_col.create_index([("name", 1), ("subject", 1), ("hour", 1)], unique=True)
# # # subjects_col.create_index("subject_name", unique=True)

# # # # Helper: Load image from uploaded file
# # # def load_image(file_content):
# # #     image = Image.open(BytesIO(file_content))
# # #     return np.array(image)

# # # # API 1: Upload Student Photo + Encode Face
# # # @app.post("/api/enroll")
# # # async def enroll_student(
# # #     name: str = Form(...),
# # #     subject: str = Form(...),  # Optional, can be used later
# # #     photo: UploadFile = File(...)
# # # ):
# # #     contents = await photo.read()
# # #     image = load_image(contents)
    
# # #     encodings = face_recognition.face_encodings(image)
# # #     if len(encodings) == 0:
# # #         raise HTTPException(400, detail="No face found in photo")

# # #     encoding = encodings[0].tolist()

# # #     # Save to MongoDB (only if not exists)
# # #     existing = encodings_col.find_one({"name": name.upper()})
# # #     if not existing:
# # #         encodings_col.insert_one({
# # #             "name": name.upper(),
# # #             "face_encoding": encoding,
# # #             "registered_at": datetime.now()
# # #         })
# # #         print(f"New student enrolled: {name}")
# # #     else:
# # #         print(f"Student {name} already enrolled")

# # #     # Return base64 + encoding for browser cache
# # #     b64 = base64.b64encode(contents).decode()
# # #     return {
# # #         "name": name.upper(),
# # #         "avatar": f"data:{photo.content_type};base64,{b64}",
# # #         "face_encoding": encoding,
# # #         "cached": existing is not None
# # #     }

# # # # API 2: Recognize Face from Webcam (Base64 Image)
# # # @app.post("/api/recognize")
# # # async def recognize(image_b64: str = Form(...)):
# # #     try:
# # #         # Decode base64
# # #         img_data = base64.b64decode(image_b64.split(',')[1] if ',' in image_b64 else image_b64)
# # #         image = Image.open(BytesIO(img_data))
# # #         rgb_image = np.array(image.convert('RGB'))

# # #         face_locations = face_recognition.face_locations(rgb_image)
# # #         face_encodings = face_recognition.face_encodings(rgb_image, face_locations)

# # #         if len(face_encodings) == 0:
# # #             return {"name": "Unknown", "message": "No face detected"}

# # #         unknown_encoding = face_encodings[0]

# # #         # Load all known encodings from MongoDB
# # #         known_students = list(encodings_col.find())
# # #         known_encodings = [np.array(s["face_encoding"]) for s in known_students]
# # #         known_names = [s["name"] for s in known_students]

# # #         matches = face_recognition.compare_faces(known_encodings, unknown_encoding, tolerance=0.5)
# # #         distances = face_recognition.face_distance(known_encodings, unknown_encoding)
# # #         best_match_idx = np.argmin(distances)

# # #         current_time = datetime.now()
# # #         current_hour = current_time.strftime('%Y-%m-%d %H')
# # #         subject_upper = subject_name.upper() if 'subject_name' in globals() else "GENERAL"

# # #         if matches[best_match_idx]:
# # #             name = known_names[best_match_idx]
# # #             confidence = 1 - distances[best_match_idx]

# # #             # Check if already logged this hour for this subject
# # #             already_logged = attendance_col.find_one({
# # #                 "name": name,
# # #                 "subject": subject_upper,
# # #                 "hour": current_hour
# # #             })

# # #             if not already_logged:
# # #                 # Log attendance
# # #                 attendance_col.insert_one({
# # #                     "name": name,
# # #                     "subject": subject_upper,
# # #                     "date": current_time.strftime('%Y-%m-%d'),
# # #                     "hour": current_hour,
# # #                     "time": current_time,
# # #                     "confidence": round(confidence, 3)
# # #                 })

# # #                 # Update subject's last attendance hour
# # #                 subjects_col.update_one(
# # #                     {"subject_name": subject_upper},
# # #                     {"$set": {"last_attendance_hour": current_hour}},
# # #                     upsert=True
# # #                 )

# # #                 return {
# # #                     "name": name,
# # #                     "message": f"{name} marked present!",
# # #                     "logged": True,
# # #                     "confidence": round(confidence, 3)
# # #                 }
# # #             else:
# # #                 return {
# # #                     "name": name,
# # #                     "message": f"{name} already marked today",
# # #                     "logged": False
# # #                 }
# # #         else:
# # #             return {"name": "Unknown", "message": "Face not recognized"}

# # #     except Exception as e:
# # #         raise HTTPException(500, detail=str(e))

# # # # API 3: Get All Students (for dashboard)
# # # @app.get("/api/students")
# # # async def get_students():
# # #     students = []
# # #     for s in encodings_col.find():
# # #         students.append({
# # #             "name": s["name"],
# # #             "avatar": "https://via.placeholder.com/100?text=" + s["name"][0]  # Replace with real avatar later
# # #         })
# # #     return students

# # # # API 4: Get Today's Attendance
# # # @app.get("/api/attendance/today")
# # # async def get_today_attendance():
# # #     today = datetime.now().strftime('%Y-%m-%d')
# # #     logs = list(attendance_col.find({"date": today}).sort("time", -1))
# # #     for log in logs:
# # #         log["_id"] = str(log["_id"])
# # #         log["time"] = log["time"].strftime("%H:%M:%S")
# # #     return logs

# # # main.py (FIXED & IMPROVED)
# # from fastapi import FastAPI, File, UploadFile, Form, HTTPException
# # from fastapi.middleware.cors import CORSMiddleware
# # from pymongo import MongoClient
# # from datetime import datetime
# # import face_recognition
# # import numpy as np
# # import base64
# # from PIL import Image
# # from io import BytesIO

# # app = FastAPI(title="AttendSys API")

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Change to your frontend URL in production
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # MongoDB
# # client = MongoClient("mongodb://localhost:27017")
# # db = client["Attendance"]
# # encodings_col = db["encodings"]
# # attendance_col = db["attendance"]
# # subjects_col = db["subjects"]

# # # Helper
# # def load_image(file_content):
# #     image = Image.open(BytesIO(file_content))
# #     return np.array(image.convert('RGB'))

# # @app.post("/api/enroll")
# # async def enroll_student(
# #     name: str = Form(...),
# #     photo: UploadFile = File(...)
# # ):
# #     contents = await photo.read()
# #     image = load_image(contents)
    
# #     encodings = face_recognition.face_encodings(image)
# #     if len(encodings) == 0:
# #         raise HTTPException(400, detail="No face found")

# #     encoding = encodings[0].tolist()
# #     name_upper = name.strip().upper()

# #     # Upsert student
# #     result = encodings_col.update_one(
# #         {"name": name_upper},
# #         {"$set": {"face_encoding": encoding, "registered_at": datetime.now()}},
# #         upsert=True
# #     )

# #     b64 = base64.b64encode(contents).decode()
# #     avatar = f"data:{photo.content_type};base64,{b64}"

# #     return {
# #         "name": name_upper,
# #         "avatar": avatar,
# #         "cached": result.matched_count > 0
# #     }

# # @app.post("/api/recognize")
# # async def recognize(
# #     image_b64: str = Form(...),
# #     subject: str = Form("GENERAL")
# # ):
# #     try:
# #         header, encoded = image_b64.split(",", 1)
# #         img_data = base64.b64decode(encoded)
# #         image = Image.open(BytesIO(img_data))
# #         rgb_image = np.array(image.convert('RGB'))

# #         face_locations = face_recognition.face_locations(rgb_image)
# #         face_encodings = face_recognition.face_encodings(rgb_image, face_locations)

# #         if len(face_encodings) == 0:
# #             return {"name": "Unknown", "message": "No face detected"}

# #         unknown_encoding = face_encodings[0]
# #         known_students = list(encodings_col.find())
        
# #         if not known_students:
# #             return {"name": "Unknown", "message": "No students enrolled yet"}

# #         known_encodings = [np.array(s["face_encoding"]) for s in known_students]
# #         known_names = [s["name"] for s in known_students]

# #         matches = face_recognition.compare_faces(known_encodings, unknown_encoding, tolerance=0.55)
# #         distances = face_recognition.face_distance(known_encodings, unknown_encoding)
# #         best_idx = np.argmin(distances)

# #         current_time = datetime.now()
# #         current_hour = current_time.strftime('%Y-%m-%d %H')
# #         subject_upper = subject.upper()

# #         if matches[best_idx] and distances[best_idx] < 0.6:
# #             name = known_names[best_idx]
# #             confidence = round(1 - distances[best_idx], 3)

# #             # Prevent duplicate in same hour
# #             already = attendance_col.find_one({
# #                 "name": name,
# #                 "subject": subject_upper,
# #                 "hour": current_hour
# #             })

# #             if not already:
# #                 attendance_col.insert_one({
# #                     "name": name,
# #                     "subject": subject_upper,
# #                     "date": current_time.strftime('%Y-%m-%d'),
# #                     "hour": current_hour,
# #                     "time": current_time,
# #                     "confidence": confidence
# #                 })

# #                 return {
# #                     "name": name,
# #                     "message": f"{name} marked present!",
# #                     "logged": True,
# #                     "confidence": confidence
# #                 }
# #             else:
# #                 return {
# #                     "name": name,
# #                     "message": f"{name} already marked",
# #                     "logged": False
# #                 }
# #         else:
# #             return {"name": "Unknown", "message": "Not recognized"}

# #     except Exception as e:
# #         print("Recognition error:", e)
# #         raise HTTPException(500, detail=str(e))

# # @app.get("/api/students")
# # async def get_students():
# #     students = []
# #     for s in encodings_col.find():
# #         students.append({
# #             "usn": s["name"],  # using name as USN for now
# #             "name": s["name"],
# #             "dpt": "CSE",  # hardcoded for now
# #             "avatar": "https://via.placeholder.com/150?text=" + s["name"][:2]
# #         })
# #     return students
# # @app.get("/api/attendance/last7days")
# # async def get_last7days():
# #     result = []
# #     for i in range(6, -1, -1):
# #         date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
# #         count = attendance_col.count_documents({"date": date})
# #         result.append({"date": date.split("-")[2] + "/" + date.split("-")[1], "present": count})
# #     return result

# # @app.get("/api/attendance/today")
# # async def get_today_attendance():
# #     today = datetime.now().strftime('%Y-%m-%d')
# #     logs = list(attendance_col.find({"date": today}).sort("time", -1).limit(50))
    
# #     result = []
# #     for log in logs:
# #         result.append({
# #             "id": str(log["_id"]),
# #             "student": {
# #                 "name": log["name"],
# #                 "usn": log["name"],
# #                 "avatar": "https://via.placeholder.com/150?text=" + log["name"][:2]
# #             },
# #             "type": "IN",
# #             "timestamp": log["time"]
# #         })
# #     return result

# # backend/main.py
# from fastapi import FastAPI, File, UploadFile, Form, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from datetime import datetime, timedelta   # ← THIS WAS MISSING
# import face_recognition
# import numpy as np
# import base64
# from PIL import Image
# from io import BytesIO

# app = FastAPI(title="AttendSys API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB - NEW CLEAN COLLECTIONS
# client = MongoClient("mongodb://localhost:27017")
# db = client["Attendance"]
# students_col = db["students"]        # ← New proper collection
# attendance_col = db["attendance"]

# # Cache face encodings in memory (super fast)
# KNOWN_ENCODINGS = []
# KNOWN_STUDENTS = []

# def load_known_faces():
#     global KNOWN_ENCODINGS, KNOWN_STUDENTS
#     KNOWN_ENCODINGS = []
#     KNOWN_STUDENTS = []
#     for s in students_col.find({"face_encoding": {"$exists": True}}):
#         KNOWN_ENCODINGS.append(np.array(s["face_encoding"]))
#         KNOWN_STUDENTS.append({
#             "id": str(s["_id"]),
#             "usn": s["usn"],
#             "name": s["name"],
#             "avatar": s.get("avatar", f"https://via.placeholder.com/150?text={s['name'][:2]}")
#         })

# # Load on startup
# load_known_faces()

# def load_image(file_content):
#     image = Image.open(BytesIO(file_content))
#     return np.array(image.convert('RGB'))

# # ENROLL STUDENT (with real USN + photo)
# @app.post("/api/enroll")
# async def enroll_student(
#     name: str = Form(...),
#     usn: str = Form(...),
#     department: str = Form("CSE"),
#     photo: UploadFile = File(...)
# ):
#     contents = await photo.read()
#     image = load_image(contents)
#     encodings = face_recognition.face_encodings(image)
#     if len(encodings) == 0:
#         raise HTTPException(400, detail="No face detected")

#     encoding = encodings[0].tolist()
#     name_upper = name.strip().upper()
#     usn_upper = usn.strip().upper()

#     if students_col.find_one({"usn": usn_upper}):
#         raise HTTPException(400, detail="USN already exists")

#     b64 = base64.b64encode(contents).decode()
#     avatar = f"data:{photo.content_type};base64,{b64}"

#     students_col.insert_one({
#         "usn": usn_upper,
#         "name": name_upper,
#         "department": department.upper(),
#         "face_encoding": encoding,
#         "avatar": avatar,
#         "registered_at": datetime.now()
#     })

#     load_known_faces()  # Refresh cache
#     return {"usn": usn_upper, "name": name_upper, "avatar": avatar}

# # RECOGNIZE FACE
# @app.post("/api/recognize")
# async def recognize(image_b64: str = Form(...), subject: str = Form("GENERAL")):
#     try:
#         _, encoded = image_b64.split(",", 1)
#         img_data = base64.b64decode(encoded)
#         image = load_image(img_data)
#         face_encodings = face_recognition.face_encodings(image)
#         if not face_encodings:
#             return {"name": "Unknown", "message": "No face detected"}

#         unknown = face_encodings[0]
#         if not KNOWN_ENCODINGS:
#             return {"name": "Unknown", "message": "No students enrolled"}

#         distances = face_recognition.face_distance(KNOWN_ENCODINGS, unknown)
#         best_idx = np.argmin(distances)

#         if distances[best_idx] < 0.6:
#             student = KNOWN_STUDENTS[best_idx]
#             today = datetime.now().strftime('%Y-%m-%d')
#             hour = datetime.now().strftime('%Y-%m-%d %H')

#             if not attendance_col.find_one({"usn": student["usn"], "date": today}):
#                 attendance_col.insert_one({
#                     "usn": student["usn"],
#                     "name": student["name"],
#                     "subject": subject.upper(),
#                     "date": today,
#                     "hour": hour,
#                     "time": datetime.now()
#                 })

#             return {
#                 "name": student["name"],
#                 "usn": student["usn"],
#                 "message": f"{student['name']} marked present!",
#                 "logged": True
#             }
#         else:
#             return {"name": "Unknown", "message": "Not recognized"}
#     except Exception as e:
#         raise HTTPException(500, detail=str(e))

# # GET ALL STUDENTS
# @app.get("/api/students")
# async def get_students():
#     students = []
#     for s in students_col.find():
#         students.append({
#             "usn": s["usn"],
#             "name": s["name"],
#             "dpt": s.get("department", "CSE"),
#             "avatar": s.get("avatar", f"https://via.placeholder.com/150?text={s['name'][:2]}")
#         })
#     return students

# # TODAY'S ATTENDANCE
# @app.get("/api/attendance/today")
# async def get_today_attendance():
#     today = datetime.now().strftime('%Y-%m-%d')
#     logs = list(attendance_col.find({"date": today}).sort("time", -1).limit(50))
#     result = []
#     for log in logs:
#         result.append({
#             "id": str(log["_id"]),
#             "student": {
#                 "name": log["name"],
#                 "usn": log["usn"],
#                 "avatar": f"https://via.placeholder.com/150?text={log['name'][:2]}"
#             },
#             "type": "IN",
#             "timestamp": log["time"].isoformat()
#         })
#     return result

# # LAST 7 DAYS CHART DATA (FIXED!)
# @app.get("/api/attendance/last7days")
# async def get_last7days():
#     result = []
#     for i in range(6, -1, -1):
#         date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
#         count = attendance_col.count_documents({"date": date})
#         day = date.split("-")[2]
#         month = date.split("-")[1]
#         result.append({"date": f"{day}/{month}", "present": count})
#     return result

# backend/main.py
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime, timedelta
import face_recognition
import numpy as np
import base64
from PIL import Image
from io import BytesIO

app = FastAPI(title="AttendSys API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["Attendance"]
students_col = db["students"]        # New proper collection
attendance_col = db["attendance"]
encodings_col = db["encodings"]      # Keep old one for backward compatibility

# In-memory cache
KNOWN_ENCODINGS = []
KNOWN_STUDENTS = []

def load_known_faces():
    global KNOWN_ENCODINGS, KNOWN_STUDENTS
    KNOWN_ENCODINGS = []
    KNOWN_STUDENTS = []
    
    # Load from new students collection
    for s in students_col.find({"face_encoding": {"$exists": True}}):
        KNOWN_ENCODINGS.append(np.array(s["face_encoding"]))
        KNOWN_STUDENTS.append({
            "id": str(s["_id"]),
            "usn": s.get("usn", "UNKNOWN"),
            "name": s.get("name", "Unknown Student"),
            "avatar": s.get("avatar", f"https://via.placeholder.com/150?text=NA")
        })
    
    # Also load old encodings collection (for backward compatibility)
    for s in encodings_col.find({"face_encoding": {"$exists": True}}):
        name = s.get("name", "Unknown")
        KNOWN_ENCODINGS.append(np.array(s["face_encoding"]))
        KNOWN_STUDENTS.append({
            "id": str(s["_id"]),
            "usn": name,  # old data uses name as USN
            "name": name,
            "avatar": f"https://via.placeholder.com/150?text={name[:2]}"
        })

load_known_faces()

def load_image(file_content):
    image = Image.open(BytesIO(file_content))
    return np.array(image.convert('RGB'))

# ENROLL (supports both old and new frontend)
@app.post("/api/enroll")
async def enroll_student(
    name: str = Form(...),
    usn: str = Form(None),
    department: str = Form("CSE"),
    photo: UploadFile = File(...)
):
    contents = await photo.read()
    image = load_image(contents)
    encodings = face_recognition.face_encodings(image)
    if len(encodings) == 0:
        raise HTTPException(400, detail="No face detected")

    encoding = encodings[0].tolist()
    name_upper = name.strip().upper()
    usn_upper = (usn.strip().upper() if usn else name_upper)

    # Save to new students collection
    b64 = base64.b64encode(contents).decode()
    avatar = f"data:{photo.content_type};base64,{b64}"

    students_col.update_one(
        {"usn": usn_upper},
        {"$set": {
            "usn": usn_upper,
            "name": name_upper,
            "department": department.upper(),
            "face_encoding": encoding,
            "avatar": avatar,
            "registered_at": datetime.now()
        }},
        upsert=True
    )

    load_known_faces()
    return {"usn": usn_upper, "name": name_upper, "avatar": avatar}

# RECOGNIZE
@app.post("/api/recognize")
async def recognize(image_b64: str = Form(...), subject: str = Form("GENERAL")):
    try:
        _, encoded = image_b64.split(",", 1)
        img_data = base64.b64decode(encoded)
        image = load_image(img_data)
        face_encodings = face_recognition.face_encodings(image)
        if not face_encodings:
            return {"name": "Unknown", "message": "No face detected"}

        unknown = face_encodings[0]
        distances = face_recognition.face_distance(KNOWN_ENCODINGS, unknown)
        best_idx = np.argmin(distances)

        if distances[best_idx] < 0.6:
            student = KNOWN_STUDENTS[best_idx]
            today = datetime.now().strftime('%Y-%m-%d')

            # Prevent duplicate per day
            if not attendance_col.find_one({"usn": student["usn"], "date": today}):
                attendance_col.insert_one({
                    "usn": student["usn"],
                    "name": student["name"],
                    "subject": subject.upper(),
                    "date": today,
                    "time": datetime.now()
                })

            return {
                "name": student["name"],
                "usn": student["usn"],
                "message": f"{student['name']} marked present!",
                "logged": True
            }
        else:
            return {"name": "Unknown", "message": "Not recognized"}
    except Exception as e:
        print("Error:", e)
        raise HTTPException(500, detail=str(e))

# GET STUDENTS (safe fallback)
@app.get("/api/students")
async def get_students():
    students = []
    for s in students_col.find():
        students.append({
            "usn": s.get("usn", "N/A"),
            "name": s.get("name", "Unknown"),
            "dpt": s.get("department", "CSE"),
            "avatar": s.get("avatar", f"https://via.placeholder.com/150?text=NA")
        })
    # Add old students if any
    for s in encodings_col.find():
        name = s.get("name", "Unknown")
        students.append({
            "usn": name,
            "name": name,
            "dpt": "CSE",
            "avatar": f"https://via.placeholder.com/150?text={name[:2]}"
        })
    return students

# TODAY'S ATTENDANCE (FIXED - no more KeyError)
@app.get("/api/attendance/today")
async def get_today_attendance():
    today = datetime.now().strftime('%Y-%m-%d')
    logs = list(attendance_col.find({"date": today}).sort("time", -1).limit(50))
    
    result = []
    for log in logs:
        name = log.get("name", "Unknown")
        usn = log.get("usn", name)  # fallback to name if usn missing
        result.append({
            "id": str(log["_id"]),
            "student": {
                "name": name,
                "usn": usn,
                "avatar": f"https://via.placeholder.com/150?text={name[:2]}"
            },
            "type": "IN",
            "timestamp": log["time"].isoformat() if isinstance(log["time"], datetime) else log["time"]
        })
    return result

# LAST 7 DAYS CHART
@app.get("/api/attendance/last7days")
async def get_last7days():
    result = []
    for i in range(6, -1, -1):
        date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
        count = attendance_col.count_documents({"date": date})
        day = date.split("-")[2]
        month = date.split("-")[1]
        result.append({"date": f"{day}/{month}", "present": count})
    return result