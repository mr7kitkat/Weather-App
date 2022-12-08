import json
from sys import exit, argv
from helper import make_request, cleanData, printHeader, printToTable, getLocation, validateLocation
from expections import *


def main():
    # open json file and read api key
    data = json.load(open("../apikey.json"))
    APIKEY = data["key"]
    
    # Getting user input handline input from command line OR user input
    arg_count = len(argv)
    if arg_count == 1:
        locationName = getLocation()
    elif arg_count == 2:
        locationName = argv[1]

        if not validateLocation(locationName):
            exit("Invalid Input")
    else:
        exit("Too many argument!")
    
    
    # Make network request
    try:
        data = make_request(locationName, APIKEY)
    except LocationNotFound:
        exit("Invalid location input, please try again with a valid location!")
    except:
        exit("Gets an unknown error while getting data")


    # Data cleaning
    sanitized_data = cleanData(data)

    # Printing Header
    printHeader(sanitized_data["City"])
    # Printing data table
    printToTable(sanitized_data, headers=["Data", "Value"])



if __name__ == "__main__":
    main()