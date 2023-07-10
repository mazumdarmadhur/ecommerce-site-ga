let cartContainer = document.getElementById('cartContainer')
let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh5 = document.createElement('h3')
    let h5Text = document.createTextNode(ob.brand)
    boxh5.appendChild(h5Text)
    boxDiv.appendChild(boxh5)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs ' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let randomOrderId = Math.floor(1000 + Math.random() * 9000);
let totalh2 = document.createElement('h3')
let h2Text = document.createTextNode('Order Id: ' + randomOrderId + '\n')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h3')
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}
let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/index.html'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Continue')
buttonTag.onclick = function()
{
    console.log("clicked")
    document.cookie = "orderId="+0 +",counter="+0

let httpRequest = new XMLHttpRequest(),
jsonArray,
method = "GET",
jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";

httpRequest.open(method, jsonRequestURL, true);
httpRequest.onreadystatechange = function()
{
    if(httpRequest.readyState == 4 && httpRequest.status == 200)
    {
        jsonArray.push(
            {
                "id": (jsonArray.length)+1, "amount": 200,"product":["userOrder"]
            })

        // send with new request the updated JSON file to the server:
        httpRequest.open("POST", jsonRequestURL, true)
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        httpRequest.send(jsonArray)
    }
}
httpRequest.send(null);
}  

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            console.log('call successful');
            contentTitle = JSON.parse(this.responseText)

            let counter = Number(document.cookie.split(',')[1].split('=')[1].split(';')[0])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            // let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            let item = document.cookie.split(',')[0].split('=').pop().split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0
            for(i=0; i<counter; i++)
            {
                let itemCounter = 1
                for(let j = i+1; j<counter; j++)
                {   
                    if(Number(item[j]) == Number(item[i]))
                    {
                        itemCounter +=1;
                    }
                }
                totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
                dynamicCartSection(contentTitle[item[i]-1],itemCounter)
                i += (itemCounter-1)
            }
            amountUpdate(totalAmount)

            // DataLayer PUSH
            function buildProducts() {
                var i = 0;
                 var theProducts = [];
                 $("div#box").each(function () {
                  var id = document.cookie.split(',')[0].split('=').pop().split(" ")[i++];
                   var prod_name = $(this).find("h3").text().split(' × ')[0];
                   var prod_price = $(this).find("h4").text().split("Rs").pop();
                   var prod_quantity = $(this).find("h3").eq(0).text().split(' × ')[1];
                   var prod_brand = $(this).find("h3").eq(1).text();
                   console.log(prod_name)
               
                   theProducts.push({
                     item_id: id,
                     item_name: prod_name,
                     price: prod_price,
                     quantity: prod_quantity,
                     item_brand: prod_brand,
                   });
                 });
               
                 return theProducts;
               }
                 
               window.dataLayer = window.dataLayer || [];
               dataLayer.push({ ecommerce: null });
               dataLayer.push({
                 event: "purchase",
                 ecommerce: {
                   transaction_id: $("#total h3").text().split(":")[1].split("\n")[0].replace(/\n|\t|\s/g, ""),
                   currency: "USD",
                   value: $("#total h3").text().split("Rs ").pop(),
                   items: buildProducts(),
                 },
               });
        }
        }
        else
        {
            console.log('call failed!');
        }
}



httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()




