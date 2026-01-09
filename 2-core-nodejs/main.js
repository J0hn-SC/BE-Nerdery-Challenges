const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const fs = require('node:fs/promises');

const path = require('path')

const JSON_FILE_PATH = path.join(__dirname, 'wishlist.json');
const CSV_FILE_PATH = path.join(__dirname, 'wishlist.csv');
const INSERT_REGEX_VALIDATION = /^[a-zA-Z0-9\s!-]+$/
const UPDATE_REGEX_VALIDATION = /^[a-zA-Z0-9\s!-]*$/;

const selectOption = async () => {
    console.log(`Wishlist Tracker
        Select an option:
        Enter 1 to add a new item
        Enter 2 to view all items
        Enter 3 to update an item
        Enter 4 to remove an item
        Enter 5 to export the wishlist to a CSV
        Enter 6 to see a wishlist summary
        Enter 7 to finish`)
    let option = Number( await rl.question("Select an option: "))
    if(!isNaN(option) && option >= 1 && option <= 7){
        return option
    }
    console.log("Incorrect option, try it again")
    return null
}

const printItem = (item) => {
    if(item){
        console.log(`Id: ${item.id} - Name: ${item.name} - Price: ${item.price} - Store: ${item.store}`)
    }else{
        console.log("There aren't items")
    }
}

const readItemList = async () => {
    try{
        const data = await fs.readFile(JSON_FILE_PATH, { encoding: 'utf8' });
        return JSON.parse(data)
    }catch{
        return []
    }
}

const viewAllItems = async () => {
    try{
        let items = await readItemList()
        console.log("List of items ...")
        if(items.length === 0){
            console.log("There aren't items")
            return []
        }
        for(const item of items){
            printItem(item)
            // console.log(`Id: ${item.id} - Name: ${item.name} - Price ${item.price} - Store ${item.store}`)
        }
        return items
    }catch{
        console.log("Error accesing the items")
    }
} 

const addItem = async () => {
    try{
        console.log('Adding a new item ...')
        let name = (await rl.question("Enter the item name: ")).trim()
        while(!INSERT_REGEX_VALIDATION.test(name)){
            name = (await rl.question("Enter a correct item name: ")).trim()
        }
        let price = Number( (await rl.question("Enter the item price ($): ")))
        while(price <= 0 || isNaN(price)){
            console.log("It must be a number, and greater than 0")
            price = Number( await rl.question("Enter a correct item price ($): "))
        }
        let store = await rl.question("Enter the item store: ")
        while(!INSERT_REGEX_VALIDATION.test(store)){
            store = (await rl.question("Enter a correct item name: ")).trim()
        }
        let items = await readItemList();
        const lastId = items.length > 0 ?  items[items.length - 1].id + 1 : 1
        const newItem = {
            id: lastId, name, price, store
        }
        console.log("Adding item ...")
        printItem(newItem)
        items.push(newItem);
        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(items));
        console.log('Item added succesfully.');

    }catch(error){
        console.log("There was an error adding the item")
        throw error
    }
}

const updateItem = async () => {
    try{
        const items = await viewAllItems()
        console.log('Updating an item ...')
        if(items.length === 0){
            console.log("There aren't items")
            return
        } 
        let id = Number(await rl.question("Enter the item id: "))
        let previousItemIndex = items.findIndex((item) => item.id === id)

        while(previousItemIndex === -1){
            id = Number(await rl.question("Enter a correct item id: "))
            previousItemIndex = items.findIndex((item) => item.id === id)
        }
        let previousItem = items[previousItemIndex]
        console.log(`Updating item ...`)
        printItem(previousItem)
        let name = (await rl.question("Enter the new item name or press 'Enter' and ignore: ")).trim()
        while(!UPDATE_REGEX_VALIDATION.test(name)){
            name = (await rl.question("Enter a correct item name: ")).trim()
        }

        let stringPrice = (await rl.question("Enter the new item price or press 'Enter' and ignore: ")).trim()
        let price = Number(stringPrice)
        while(stringPrice.length > 0 && (price <= 0 || isNaN(price))){
            stringPrice = (await rl.question("Enter a correct item price or press 'Enter' and ignore: ")).trim()
            price = Number(stringPrice)
        }

        let store = (await rl.question("Enter the new item store or press 'Enter' and ignore: ")).trim()
        while(!UPDATE_REGEX_VALIDATION.test(store)){
            store = (await rl.question("Enter a correct item store: ")).trim()
        }
        const newItem = {
            id: previousItem.id,
            name: !!name ? name : previousItem.name, 
            price: !!price ? price : previousItem.price, 
            store: !!store ? store : previousItem.store, 
        }
        console.log("Updating item ...")
        printItem(newItem)

        items[previousItemIndex] = newItem;
        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(items));
        console.log('Item updated succesfully.');

    }catch(error){
        console.log(console.log("There was an error updating the item"))
        throw error
    }
}

const removeItem = async () => {
    try{
        const items = await viewAllItems();
        if(items.length === 0){
            console.log("There aren't items")
            return
        } 
        console.log("Removing an item ...")
        let id = Number(await rl.question("Enter the item id: "))
        let previousItemIndex = items.findIndex((item) => item.id === id)

        while(previousItemIndex === -1){
            id = Number(await rl.question("Enter a correct item id: "))
            previousItemIndex = items.findIndex((item) => item.id === id)
        }

        let previousItem = items[previousItemIndex]
        console.log("Removing item ...")
        printItem(previousItem)
        items.splice(previousItemIndex, 1)
        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(items));
        console.log('Item removed succesfully.');
    }catch(error){
        console.log("There was an error removing the item")
        throw error
    }
}

const exportListToCSV = async () => {
    try{   
        const items = await readItemList();
        let content = "id, name, price, store\n"
        for(const item of items){
            content += `${item.id},${item.name},${item.price},${item.store}\n`
        }
        console.log("Exporting CSV File  at path: ", CSV_FILE_PATH)
        await fs.writeFile(CSV_FILE_PATH, content, 'utf8');
        console.log("Succesful export")
    }catch(error){
        console.log(error)
        console.log("There was an error exporting list to CSV File")
    }
}

const summaryList = async () => {
    const items = await readItemList();
    const expensiveItem = items.length > 0 ?  items.reduce((accu, val) => {
        if(accu.price > val.price){
            return accu
        }
        return val
    }) : null
    const sumPrices = items.reduce((accu, val) => accu + val.price, 0).toFixed(2)
    const averagePrice = items.length > 0? (sumPrices / items.length).toFixed(2) : 0
    console.log("Expensive Item: ")
    printItem(expensiveItem)
    console.log(`Average Price: ${averagePrice}`)
    console.log(`Total cost: ${sumPrices}`)
    console.log(`Number of items: ${items.length}`)
}

const main = async () => {
    let option = 0
    while(option !== 7){
        option = await selectOption()
        console.log("***********************************************************")
        if(option === null){
            continue
        }
        switch(option) {
            case 1:
                await addItem()
                break
            case 2:
                await viewAllItems()
                break
            case 3:
                await updateItem()
                break
            case 4:
                await removeItem()
                break
            case 5:
                await exportListToCSV()
                break
            case 6:
                await summaryList()
                break
            case 7:
                break
        }
        console.log("***********************************************************")
    }
    rl.close()
}

main()