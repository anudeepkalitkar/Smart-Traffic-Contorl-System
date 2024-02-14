import cv2
import numpy as np

def ReadImage(file):
    npimg = np.fromstring(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    return img

def CannyThreshold(Captured_Image):
    Gray_Scale = cv2.cvtColor(Captured_Image, cv2.COLOR_BGR2GRAY)
    bilateral_Filter = cv2.bilateralFilter(Gray_Scale, 11, 17, 17)
    Image_Median = np.median(Captured_Image)
    Lower_Threshold = max(0, (0.7 * Image_Median))
    Upper_Threshold = min(255, (0.7 * Image_Median))
    CannyEdged = cv2.Canny(bilateral_Filter, Lower_Threshold, Upper_Threshold)
    return CannyEdged

def CalcDensity(Cap_Image,Ref_Image):
    Ref_indices = np.where(Ref_Image != [0])
    Cap_indices = np.where(Cap_Image != [0])
    Ref_count = len(Ref_indices[0])
    Cap_count = len(Cap_indices[0])
    percent = ((Ref_count )/ Cap_count) * 100
    if(percent>=100):
        return 0
    return percent


def CalcTime(lane1Image, lane2Image, lane3Image, lane4Image, refImage):
    cannyRef = CannyThreshold(refImage)
    cannyLane1 = CannyThreshold(lane1Image)
    densityLane1 = CalcDensity(cannyLane1, cannyRef)
    timeAllocationLane1 = 5 * round((densityLane1 / 20))
    print(densityLane1, timeAllocationLane1)
    
    cannyLane2 = CannyThreshold(lane2Image)
    densityLane2 = CalcDensity(cannyLane2, cannyRef)
    timeAllocationLane2 = 5 * round((densityLane2 / 20))
    print(densityLane2, timeAllocationLane2)
    
    cannyLane3 = CannyThreshold(lane3Image)
    densityLane3 = CalcDensity(cannyLane3, cannyRef)
    timeAllocationLane3= 5 * round((densityLane3 / 20))
    print(densityLane3, timeAllocationLane3)
    
    cannyLane4 = CannyThreshold(lane4Image)
    densityLane4 = CalcDensity(cannyLane4, cannyRef)
    timeAllocationLane4 = 5 * round((densityLane4 / 20))
    print(densityLane4, timeAllocationLane4)
    
    return [timeAllocationLane1, timeAllocationLane2, timeAllocationLane3,timeAllocationLane4 ]
    