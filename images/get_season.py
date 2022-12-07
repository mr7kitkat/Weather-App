import json
import os

imageList = os.listdir()

season = {
  "winter": {
    "day":[],"night":[]
  },
  "summer": {
    "day":[],"night":[]
  },
  "spring": {
    "day":[],"night":[]
  },
  "rain": {
    "day":[],"night":[]
  },
  "thunderstorm": [],
  "snow": {
    "day":[],"night":[]
  },
  "volcano": [],
  "tornado": [],
  "mist": {
    "day":[],"night":[]
  },
  "cloudy": {
    "day":[],"night":[]
  }
}



for image in imageList:
  
  if "winter" in  image:
    if "day" in image:
      season["winter"]["day"].append(image)
    elif "night" in image:
      season["winter"]["night"].append(image)
      
  elif "summer" in  image:
    if "day" in image:
      season["summer"]["day"].append(image)
    elif "night" in image:
      season["summer"]["night"].append(image)
      
  elif "spring" in  image:
    if "day" in image:
      season["spring"]["day"].append(image)
    elif "night" in image:
      season["spring"]["night"].append(image)
      
  elif "rain" in  image:
    if "day" in image:
      season["rain"]["day"].append(image)
    elif "night" in image:
      season["rain"]["night"].append(image)
      
  elif "snow" in  image:
    if "day" in image:
      season["snow"]["day"].append(image)
    elif "night" in image:
      season["snow"]["night"].append(image)
      
  elif "mist" in  image:
    if "day" in image:
      season["mist"]["day"].append(image)
    elif "night" in image:
      season["mist"]["night"].append(image)
      
  elif "cloudy" in  image:
    if "day" in image:
      season["cloudy"]["day"].append(image)
    elif "night" in image:
      season["cloudy"]["night"].append(image)
      
  elif "thunderstorm" in  image:
      season["thunderstorm"].append(image)
  elif "volcano" in  image:
      season["volcano"].append(image)
  elif "tornado" in  image:
      season["tornado"].append(image)

# serailing object
json_object = json.dumps(season, indent=4)

# writing json object
with open("images.json", "w") as output:
    output.write(json_object)