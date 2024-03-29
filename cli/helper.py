import requests
from pyfiglet import Figlet
from tabulate import tabulate
from expections import *
from sys import exit, argv
from datetime import datetime, date


# turning kelvin to celcius
def kelvinToCelcius(kelvin):
    return f'{round(kelvin - 273.15)}°C'

# Get date
def getDate(timestamp):
    dt = date.fromtimestamp(timestamp)
    return dt.strftime("%d %b")

# get time
def getTime(timestamp):
    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime("%X")
    
def formatWindSpeed(floatNum):
    return f"{round(floatNum * 3.6)} km/h"

# Making network requests
def make_request(location, apikey):
    URL = "https://api.openweathermap.org/data/2.5/weather"
    response = requests.get(URL, {"q":location, "apikey": apikey})
    response = response.json()
    
    if response["cod"] == "404":
        raise LocationNotFound
    
    return response


# Cleanup messy data
def cleanData(rawdata):
    return {
        "Status": rawdata["weather"][0]["description"],
        "Tempreture": kelvinToCelcius(rawdata["main"]["temp"]),
        "Feels Like": kelvinToCelcius(rawdata["main"]["feels_like"]),
        "Min Temp": kelvinToCelcius(rawdata["main"]["temp_min"]),
        "Max Temp": kelvinToCelcius(rawdata["main"]["temp_max"]),
        "Pressure": rawdata["main"].get("pressure", 0),
        "Humidity": f'{rawdata["main"].get("humidity", 0)} %',
        "Sea Level": rawdata["main"].get("sea_level", 0),
        "Ground Level": rawdata["main"].get("grnd_level", 0),
        "Visibility": f'{round(rawdata["visibility"] / 100)} %',
        "Wind Speed": formatWindSpeed(rawdata["wind"].get("speed", 0)),
        "Clouds": f'{rawdata["clouds"]["all"]} %',
        "Date": getDate(rawdata["dt"]),  
        "Sunrise": getTime(rawdata["sys"]["sunrise"]),
        "Sunset": getTime(rawdata["sys"]["sunset"]),
        "City": rawdata["name"],
        "Country": rawdata["sys"]["country"]
    }
    
    
# output data as table
def printToTable(data, headers, format = "psql"):
    dataList = data.items()
    print(tabulate(dataList, headers=headers, tablefmt=format))
    
# Print Header
def printHeader(cityName, fontStyle = "banner3-D"):
    city = cityName.upper()    
    fengine = Figlet(font=fontStyle)
    print(fengine.renderText(city), end="")

# Get user input   
def getLocation():
    while True:
        location = input("Location Name: ").lower()
        
        if validateLocation(location):
            return location
        else:
            pass

# CHecking validation
def validateLocation(location):
    return location and location.isalpha()