from  dbHelperclass import dbHelper as dbh

conn = dbh("mongodb+srv://trendset:FIfRuK42erNOir02@trendset.plb5zxd.mongodb.net/","trendset")
# conn.getUniqueProduct()
print(conn.getUniqueProduct(28))
# out = conn.getUser(1234)
# print(out)
# print(conn.addUser({"f_name":"Corey","l_name":"liv","email":"co@c.com"}))

'''# removed = conn.removeProduct(1)
upDateProduct = {
    "logo":"https://google.com",
    "bio":"this is not a test",
    "links":[{
        "text":"linkdin",
        "url":"https://google.com",
        
}],
"design":{
            "card_color":"blue",
            "window_color":"green",
            "text-font":"sans",
            "text_color":"red"
        }
    } 
added = conn.addProduct("co@@c.com",upDateProduct)

for x in conn.getAllForUser("co@@c.com"):
    print(x)
# print(conn.updateProduct(3,upDateProduct))
'''
