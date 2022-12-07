import json
import requests
from helper import kelvinToCelcius
from pyfiglet import Figlet
from tabulate import tabulate

def main():
    # open json file and read api key
    data = json.load(open("../apikey.json"))
    APIKEY = data["key"]
    data = make_request("Tokyo", APIKEY)
    sanitized_data = cleanData(data)

    
    printHeader(sanitized_data["Tempreture"],sanitized_data["Status"], sanitized_data["City"])
    printToTable(sanitized_data, headers=["Data", "Value"])


def make_request(location, apikey):
    URL = "https://api.openweathermap.org/data/2.5/weather"
    response = requests.get(URL, {"q":location, "apikey": apikey})
    return response.json()


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
        "City": rawdata["name"],
        "Wind Speed": rawdata["wind"].get("speed", 0),
        "Clouds": f'{rawdata["clouds"]["all"]} %',
        "Date": rawdata["dt"],  
        "Sunrise": rawdata["sys"]["sunrise"],
        "Sunset": rawdata["sys"]["sunset"],
    }

def printToTable(data, headers, format = "psql"):
    dataList = data.items()
    print(tabulate(dataList, headers=headers, tablefmt=format))
    
def printHeader(temp,weatherStatus, cityName, fontStyle = "big"):
    city = cityName.upper()
    textToDisplay = f"{temp} - {weatherStatus.capitalize()}\n\t {city}"

    fengine = Figlet(font=fontStyle)
    print(fengine.renderText(textToDisplay))

if __name__ == "__main__":
    main()