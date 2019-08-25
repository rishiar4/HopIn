import cv2
import os
import requests
import threading

def sen(lb):
        threading.Timer(5.0,sen).start()
        print("NUMBER",lb)
        contents = requests.get("http://localhost:2000/drive/update/5d60e0792e4e6330e02f1791/.lb")

        
body_c = cv2.CascadeClassifier('haarcascade_fullbody.xml')
face_c= cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

cap=cv2.VideoCapture(0)

while True:

    ret, img=cap.read()
    gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    body = body_c.detectMultiScale(gray, scaleFactor =1.1, minNeighbors = 5)

    for (x,y,w,h) in body:
        
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),4)
        roi_gray = gray[y:y+h, x:x+w]   
        roi_color = img[y:y+h, x:x+w]         
        face = face_c.detectMultiScale(roi_gray)
        for (fx,fy,fw,fh) in face: 
                    cv2.rectangle(roi_color,(fx,fy),(fx+fw,fy+fh),(0,175,255),2)
                
                    

 cv2.imshow('img',img)
            
    lb=len(body)
    lf=len(face)
    if(lb>0 and lf>0):
        print("Predicted People wishing to get down ",lb)
    sen(lb)
        #sen(lff)
        
   k=cv2.waitKey(1) & 0xff
            
    if k == 32:
            #esc key pressed
        break

            

cap.release()
#out.release()
cv2.destroyAllWindows()  




    

    

    
 
        

    
