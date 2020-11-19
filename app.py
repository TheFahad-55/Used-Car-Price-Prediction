import requests
get = requests.get('http://localhost:3000/getdata')  # GET request
data = get.json()
# process this JSON data and do something with it
result = {
    "price": 30000
}
post = requests.post('http://localhost:3000/postdata',
                     json=result)  # the POST request
# print(post.text)
