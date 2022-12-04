//creating a database 
//simply by using the `use` command
//if the db doesn't exist, mongodb will create one
//if db exist, it will swap to the the one specified
// in this case - use fake_school;

//creating a collection 
//simple way is adding a record based on the collection name
//db.collection....
/*db.students.insertOne({
    "name": "Milo",
    "age": 4,
    "breed": "Mini Poodle",
    "type": "dog"
}) */

//insert many documents
db.students.insertMany([
    {
        "name": "Jane Doe",
        "age": 13,
        "subjects": "Defense Against the Dark Arts, Charms, History of Magic",
        "date enrolled": "13th May 2016"
    },
    {
        "name": "James Verses",
        "age": 14,
        "subjects": "Transfiguration, Alchemy",
        "date enrolled": "15th June 2015"
    },
    {
        "name": "Jonathan Goh",
        "age": 12,
        "subjects": "Divination, Study of Ancient Runes",
        "date enrolled": "16th April 2017"
    },
])

// Increase the age of all the students by 1
// {} means all
// $inc - increments
db.students.updateMany({}, {$inc:{age:1}})


// Change the date enrolled of Jonathan Goh to 2018 13th May
db.students.updateOne({
    "_id": ObjectId('638c39a5685fad63183ab7c0')
},{
    "$set": {
        "date enrolled": "13th May 2018"
    }
})


// Change the age of James Verses to 13

db.students.updateOne({
    "_id": ObjectId('638c39a5685fad63183ab7bf')
},{
    "$set": {
        "age": "13"
    }
})


// Change the student with the name of "Jane Doe" to "Jane Doe Jr" and her age to 11.

db.students.updateOne({
    "_id": ObjectId('638c39a5685fad63183ab7be')
},{
    "$set": {
        "name": "Jane Doe Jr",
        "age": 11
    }
})


//update an existing document in db
//1. specify the object to find
//2. specify the fields i wan to change
//first parameter will be criteria to match 
//all documents that match the criteria will be updated
//SQL
//UPDATE animals WHERE id = "6386b3b54c7afa4f908b4646" SET name = "lighting"
db.students.updateOne({
    "_id": ObjectId('6386b3b54c7afa4f908b4646')
},{
    "$set": {
        "name": "Lighting"
    }
})

db.animals.deleteOne({
    "_id": ObjectId('6386b3b54c7afa4f908b4647')
})

//push an item to an array in a document
//use $push to add to an array in the document 
//add a new object `checkups` and unique objectid 
db.animals.updateOne({
    "_id": ObjectId("6386b4204c7afa4f908b4648")
},{
    "$push": {
        "checkups":{
            "_id": ObjectId(),
            "name": "Dr Vito",
            "diagnosis": "Skin Lumps",
            "treatment": "Oilment Lotion"
        }
    }
})

//push to array 
db.animals.updateOne({
    "_id": ObjectId("6386b4204c7afa4f908b4648")
},{
    "$push": {
        "checkups":{
            "_id": ObjectId(),
            "name": "Dr Wei Jie",
            "diagnosis": "Eye Sore",
            "treatment": "Oilment Lotion"
        }
    }
})