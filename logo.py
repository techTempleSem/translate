import numpy as np
import matplotlib.pyplot as plt
import cv2

img = np.zeros(shape=(500,600))

def paint(x,y):
    x*=100
    y*=100
    img[x:x+100, y:y+100]=1

paint(1,0)
paint(2,0)
paint(3,0)
paint(4,0)
paint(1,2)
paint(2,2)
paint(3,2)
paint(4,2)
paint(1,4)
paint(3,5)
paint(4,4)

cv2.imshow("img",img)
cv2.waitKey()