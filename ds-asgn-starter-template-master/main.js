// DS ASGN STARTER TEMPLATE



// DOM Elements
let outputEl = document.getElementById('output');

// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

let groceryList = [];

let products = [];
let prices = [];
let country = [];

let increment = 3

let loop = 0;

let total = 0;


//Split the data
fetch("grocery-data.txt")
    .then((rawData) => rawData.text())
    .then((data) => groceryList = data.split(";"))


//Splitting the data into individual arrays
function specificGrocery() {

    loop++
    //Splitting products
    for (n = 0; n < groceryList.length; n += increment) {
        products.push(groceryList[n].trim());

        total++;

    }
    //Splitting prices
    for (n = 1; n < groceryList.length; n += increment) {
        prices.push(groceryList[n].trim());
    }
    //Splitting countries
    for (n = 2; n < groceryList.length; n += increment) {
        country.push(groceryList[n].trim());
    }
}



function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;

    if (loop < 1) {
        specificGrocery();
    }

    //Erase anything existing
    outputEl.innerHTML = " ";

    // Take action based on menu selection
    if (selection == 'Display All') {

        outputEl.innerHTML = "There are a total of " + total + " items <br>"

        //Looping the display of groceries
        for (n = 0; n < groceryList.length / increment; n++) {
            outputEl.innerHTML += "<br>" + products[n] + " $" + prices[n] + " " + country[n] + "<br>";
        }


    } else if (selection == 'Price Range') {

        let minMax = 0;

        //Prompt User for min and max values
        let minimumPrice = prompt("Type the lowest price you want below")
        let maximumPrice = prompt("Type the highest price you want below")

        //Count the items between the min and max then display it
        for (n = 0; n < total; n++) {
            if (prices[n] < Number(maximumPrice) && prices[n] > Number(minimumPrice)) {
                minMax++
            }

        }
        outputEl.innerHTML = "There are a total of " + minMax + " items <br>";

        //Display the rest of the items
        for (n = 0; n < total; n++) {
            if (prices[n] < Number(maximumPrice) && prices[n] > Number(minimumPrice)) {
                outputEl.innerHTML += "<br>" + products[n] + " $" + prices[n] + " " + country[n] + "<br>";
            }

        }


    } else if (selection == 'Country of Origin') {

        let cOrigin = 0;

        //Prompt user for country
        let countryOrigin = prompt("Type the country you want below")
        countryOrigin = countryOrigin.toLowerCase();

        //Count the number of countries needed and display it
        for (n = 0; n < total; n++) {
            if (countryOrigin == country[n].toLowerCase()) {
                cOrigin++
            }
        }
        outputEl.innerHTML = "There are a total of " + cOrigin + " items <br>"

        //Display the items
        for (n = 0; n < total; n++) {
            if (countryOrigin == country[n].toLowerCase()) {
                outputEl.innerHTML += "<br>" + products[n] + " $" + prices[n] + " " + country[n] + "<br>"
            }
        }

    } else if (selection == "Display Random") {

        //Randomizing value
        let random = Math.randomInt(0, total)
        if (random == total - 1) {
            console.log(products[random])
            console.log(random)
        }
        if (random == total) {
            console.log(random)
        }

        //Display random product
        outputEl.innerHTML = products[random] + " $" + prices[random] + " " + country[random]

    } else if (selection == "Inflation") {

        //Inflation
        for (n = 0; n < total; n++) {

            //Changing price due to inflation
            prices[n] *= 1.07;

            //Rounding price
            prices[n] *= 100;
            prices[n] = Math.round(prices[n])
            prices[n] /= 100;
        }

        //Display all items
        outputEl.innerHTML = "All prices have been raised by 7% due to inflation."

    } else if (selection == "Price Stats") {

        //Finding min and max values
        let minPrice = Math.min(...prices);
        let maxPrice = Math.max(...prices);

        //Average variable
        let average = 0;

        //Finding the index of the lowest and highest
        let minProduct = 0;
        let maxProduct = 0;

        //Finding Average
        for (n = 0; n < total; n++) {
            average += Number(prices[n])
        }
        average /= total

        //Rounding Average
        average *= 100;
        average = Math.round(average)
        average /= 100;

        //Finding the product of the minimum price
        for (n = 0; n < total; n++) {
            if (prices[n] == minPrice) {
                minProduct += n
            }

            if (maxPrice == prices[n]) {
                maxProduct += n
            }
        }

        //Displaying min price, average price, and max price
        outputEl.innerHTML = "The product with the lowest price is: <br>" + products[minProduct] + " $" + prices[minProduct] + " " + country[minProduct];
        outputEl.innerHTML += "<br><br> The product with the highest price is: <br>" + products[maxProduct] + " $" + prices[maxProduct] + " " + country[maxProduct];
        outputEl.innerHTML += "<br><br> The average of all the prices is: <br> $" + average

    } else if (selection == "Add Product") {
        //Prompt user for inputs
        let addProd = prompt("Type the name of the product you want to add below")
        let addPrice = prompt("Type the price of the product you want to add below")
        let addCountry = prompt("Type the country of the product you want to add below")

        //Check for dupe boolean
        let dupe = false


        //Remove "$" sign if there is
        addPrice = addPrice.trim()
        addPrice = addPrice.split("")

        for (n = 0; n < addPrice.length; n++) {
            if (addPrice[n] == "$") {
                addPrice.splice(n, 1)
            }
        }
        addPrice = addPrice.join("")



        //Finds if the number is NaN
        let notANum = isNaN(addPrice)

        //Checks for dupes
        for (n = 0; n < total; n++) {
            if (products[n].toLowerCase() == addProd.toLowerCase() && prices[n] == addPrice && country[n].toLowerCase() == addCountry.toLowerCase()) {
                dupe = true
            }
        }

        //Ouput
        if (notANum == true) {
            outputEl.innerHTML = "Could not add product because the price isn't a number"
        } else if (addPrice == 0) {
            outputEl.innerHTML = "Could not add product because the price is $0"
        } else if (dupe == true) {
            outputEl.innerHTML = "Could not add product because the same product already exists"
        } else {


            //Captilize the first letter of each word
            addProd = addProd.trim()
            addProd = addProd.split(" ");
            for (n = 0; n < addProd.length; n++) {
                addProd[n] = capitalize(addProd[n])
            }
            addProd = addProd.join(" ")

            addCountry = addCountry.trim()
            addCountry = addCountry.split(" ");
            for (n = 0; n < addCountry.length; n++) {
                addCountry[n] = capitalize(addCountry[n])
            }
            addCountry = addCountry.join(" ")


            //Rounding price
            addPrice = Math.round(addPrice * 100) / 100

            //Increasing grocerylist length
            groceryList.push(addProd);
            groceryList.push(addPrice);
            groceryList.push(addCountry);

            //Adding product to it's appropriate category
            products.push(addProd);
            prices.push(addPrice);
            country.push(addCountry);

            //Increasing total
            total++;



            //Displaying added product
            outputEl.innerHTML += "You have added a product with the following name, price, and country <br><br>" + addProd + " $" + addPrice + " " + addCountry + "<br>"
        }

    } else if (selection == "Remove Products less than $15") {

        //Minimum price
        let priceMin = 15;

        //How many removed
        let removed = 0;

        //Removing products less than 15
        for (n = 0; n < prices.length; n++) {
            if (prices[n] < priceMin) {
                products.splice(n, 1)
                prices.splice(n, 1)
                country.splice(n, 1)
                groceryList.splice((n * 3), 3)
                n--;
                total--;
                removed++
            }
        }

        //Displaying total amount of product removed
        outputEl.innerHTML = removed + " products were removed from the list."

    } else if (selection == "Remove Specific Product") {

        let productRemoved = ""

        //Prompt user for product name
        let removeProduct = prompt("Type the name of the product you want to remove below")
        //Removing product, price, and its country
        for (n = 0; n < total; n++) {
            productRemoved = products[n]
            console.log(removeProduct)
            console.log(productRemoved)

            if (productRemoved.toLowerCase() == removeProduct.toLowerCase()) {
                console.log(productRemoved)
                console.log(removeProduct)
                console.log("Found")
                products.splice(n, 1)
                prices.splice(n, 1)
                country.splice(n, 1)
                groceryList.splice((n * 3), 3)
                total--;
                outputEl.innerHTML = "The product " + removeProduct + " has been removed"
                return;
            }
            outputEl.innerHTML = "The product " + removeProduct + " has not been found"
        }
    }
}

//Captialize first letter of every word
function capitalize(word) {
    if (typeof word !== 'string') return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}

