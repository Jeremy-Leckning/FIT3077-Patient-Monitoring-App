# importing the requests library
import time

import pandas as pd
import requests
from datetime import datetime
from datetime import date

# api-endpoint
# URL = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Encounter?_include=Encounter.participant.individual&_include=Encounter.patient&participant.identifier=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Fus-npi%7C500&_format=json"
cholesterolURL = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?code=2093-3"

data = pd.DataFrame(columns=['bmi', 'bloodSugar', 'age', 'gender', 'totalCholesterol'])

next_page = True
next_url = cholesterolURL
count_page = 0
count_patient = 0

while next_page == True and count_page<150:
    response = requests.get(url=next_url).json()

    # As discussed before, The monash FHIR server return results in a series of pages.
    # Each page contains 10 results as default.
    # here we check and record the next page
    next_page = False
    links = response['link']
    for i in range(len(links)):
        link = links[i]
        if link['relation'] == 'next':
            next_page = True
            next_url = link['url']
            count_page += 1

    # Extract data
    entry = response['entry']
    for i in range(len(entry)):
        patient_array = []

        patient_id = entry[i]['resource']['subject']['reference'][len('Patient/'):]


        if patient_id not in data.index:


            cholesterolResponse = requests.get(url="https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?code=2093-3&patient=" + patient_id + "&_sort=-date&_pretty=true").json()


            bmiResponse = requests.get(url="https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?code=39156-5&patient=" + patient_id + "&_sort=-date&_pretty=true").json()

            bloodSugarResponse = requests.get(url="https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?code=2339-0&patient=" + patient_id + "&_sort=-date&_pretty=true").json()

            patient_data = requests.get(url="https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/" + patient_id).json()

            if (bmiResponse['total']!=0 and bloodSugarResponse['total']!=0):
                latestCholesterolResponse = cholesterolResponse["entry"][0]["resource"]["valueQuantity"]["value"]
                effectiveDate = cholesterolResponse["entry"][0]["resource"]["effectiveDateTime"].split("T")[0]
                effectiveTestDate = datetime.strptime(effectiveDate, '%Y-%m-%d').date()

                lastestBmiResponse = bmiResponse["entry"][0]["resource"]["valueQuantity"]["value"]

                latestBloodSugarResponse = bloodSugarResponse["entry"][0]["resource"]["valueQuantity"]["value"]

                birth = patient_data['birthDate']
                birthDate = datetime.strptime(birth, '%Y-%m-%d').date()

                effectiveAge = effectiveTestDate.year - birthDate.year - ((effectiveTestDate.month, birthDate.day) < (effectiveTestDate.month, birthDate.day))

                gender = patient_data['gender']

                print("patient id: " + patient_id)
                print("cholesterol value: "+str(latestCholesterolResponse))
                print("bmi value: " + str(lastestBmiResponse))
                print("blood sugar level: " + str(latestBloodSugarResponse))
                print("Age: " + str(effectiveAge))

                count_patient += 1
                patient_array.append(lastestBmiResponse)
                patient_array.append(latestBloodSugarResponse)
                patient_array.append(effectiveAge)
                patient_array.append(gender)
                patient_array.append(latestCholesterolResponse)

                data.loc[patient_id] = patient_array

    print("one page done, waiting...")
    print("patient number: "+str(count_patient))
    print("page number: "+str(count_page))
    time.sleep(30)

    myList = data.values.tolist()

        with open('data.txt', 'w') as f:
        for item in myList:
            f.write("%s\n" % item)

    data.to_csv('rawdata.txt', sep='\t')

