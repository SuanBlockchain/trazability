# import requests
# from requests.structures import CaseInsensitiveDict

# def kobo_api(URL, params= {}):
#     headers = CaseInsensitiveDict()
#     kobo_token = config('KOBO_TOKEN')
#     headers["Authorization"] = "Token " + str(kobo_token)

#     resp = requests.get(URL, headers=headers, params=params)
#     rawResult = resp
#     return rawResult