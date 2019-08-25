

import cv2
#import numpy as np
#import winsound as ws





    
#Classifiers

weapon_c=cv2.CascadeClassifier('object.xml')


cap=cv2.VideoCapture(0)

while True:
    ret,img=cap.read()

    gray=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    weapon=weapon_c.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=7)
    for (cx,cy,cw,ch) in weapon:
        cv2.rectangle(img,(cx,cy),(cx+cw,cy+ch),(0,255,0),4)
        print("threat")
        
        
    cv2.imshow('img',img)

    k=cv2.waitKey(1) & 0xff
    if k==27:
        break

cap.release()
cv2.destroyAllWindows()
