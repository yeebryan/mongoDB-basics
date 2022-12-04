// the following uses the LISTINGandREVIEWS Collection under Sample_Airbnb
///
///
///

//Find and filter rooms with 2 beds 2 bedrooms
//Address country brazil

db.listingsAndReviews.find(
    {
      beds: 2,
      bedrooms: 2,
      "address.country": "Brazil",
    },
    {
      name: 1,
      beds: 1,
      bedrooms: 1,
      "address.country": 1,
    }
  );
  
  db.listingsAndReviews.find(
    {
      beds: 2,
      bedrooms: {
        $gte: 3,
        $lte: 6,
      },
      "address.country": "Brazil",
    },
    {
      name: 1,
      beds: 1,
      bedrooms: 1,
      "address.country": 1,
    }
  );
  
  //find listings brazil and canada
  //more than 3 bedrooms
  db.listingsAndReviews.find(
    {
      $or: [
        {
          "address.country": "Brazil",
        },
        {
          "address.country": "Canada",
        },
      ],
      bedrooms: {
        $gt: 3,
      },
    },
    {
      name: 1,
      "address.country": 1,
      bedrooms: 1,
    }
  );
  
  //find all listings that all of the following is inside
  //in the amenties array
  db.listingsAndReviews.find(
    {
      amenities: {
        $all: ["Oven", "Microwave", "Stove"],
      },
    },
    {
      name: 1,
      amenities: 1,
    }
  );
  
  //find all the listings and reviews before 2019
  db.listingsAndReviews.find(
    {
      first_review: {
        $gt: ISODate("2018-12-31"),
      },
    },
    {
      "name": 1,
      "first_review": 1
    }
  );
  
  //find all listings with a regex 
  //find as longs as the keyword spacious is used
  db.listingsAndReviews.find({
      "name": {
          "$regex": "spacious", "$options": "i"
      }
  },{
      "name": 1
  })
  
  //listingsAndReviews.reviews[{},{}]
  //find based on the object inside an array
  //review.$ -> show the one that was matched 
  db.listingsAndReviews.find({
    'reviews':{
      '$elemMatch':{
        'reviewer_name': 'Cátia'
      }
    }
  },{
    'name':1,
    'reviews.$': 1
  })
  





// the following uses the INSPECTIONS Collection under Sample_training
///
///
///
//find biz which has violations issued
db.inspections.find(
{
    "result": "Violation Issued"
},
{
    'business_name': 1,
    "result": 1,
}
);

// Find all business which has violations, and are in the city of New York.

db.inspections.find(
{
    "result": "Violation Issued",
    "address.city": "NEW YORK",
},
{
    'business_name': 1,
    "result": 1,
    'address.city': 1
}
);

// Count how many businesses there in the city of New York

db.inspections.countDocuments(
{
    "address.city": "NEW YORK",
},
{
    'business_name': 1,
    'address.city': 1
});

// Count how many businesses there are in the city of Ridgewood and does - not have violations 
db.inspections.countDocuments(
{
    "address.city": "RIDGEWOOD",
    "result": {
        '$ne':'Violation Issued',
        },
},
{
    'result': 1,
    'business_name': 1,
    'address.city': 1
}
);
// the following uses the COMPANIES Collection under Sample_training
///
///
///
// founded in year 2006

db.companies.find(
{
    "founded_year": 2006,
},
{
    'name': 1,
    'founded_year': 1,
}
);

// founded after year 2000

db.companies.find(
{
  "founded_year": { 
    '$gte': 2000,
    },
},
{
    'name': 1,
    'founded_year': 1,
}
);

// founded between 1900 - 2010
db.companies.find(
{
  "founded_year": { 
    '$gte': 1900,
    '$lte': 2010,
    },
},
{
    'name': 1,
    'founded_year': 1,
}
);


// all companies valuation > 100m
db.companies.find({
    "total_money_raised": { 
      '$gte': "£100M",
      },
  },{
      'name': 1,
      'total_money_raised': 1,
    
      'founded_year': 1,
  });



// ipo > 100m
// display company name, valuation amount, valuation currency

db.companies.find({
    'ipo':{$ne: null},
    'ipo.valuation_amount': {$gte: 100000000}
},
{
    name: 1,
    ipo: {valuation_amount: 1, valuation_currency_code: 1}
}
);

// ipo >100m and in USD

db.companies.find({
    'ipo':{$ne: null},
    'ipo.valuation_amount': {$gte: 100000000},
    'ipo.valuation_currency_code': {$eq: 'USD'}
},
{
    name: 1,
    ipo: {valuation_amount: 1, valuation_currency_code: 1}
}
);
  

// the following uses the ACCOUNTS Collection under SAMPLE_analytics
///
///
///

// Find all accounts that have the InvestmentStock product

  db.accounts.find({"products": {"$regex": "InvestmentStock", "$options": "i"}},
  {"account_id": 1})

// Find all accounts that have both the Commodity and InvestmentStock product

db.accounts.find({
    $and:
    [
        {"products": {"$regex": "InvestmentStock", "$options": "i"}},
        {"products": {"$regex": "Commodity", "$options": "i"}},

    ]},
{"account_id": 1});


// Find all accounts that have either Commodity OR CurrencyService product

db.accounts.find({
    $or:
    [
        {"products": {"$regex": "CurrencyService", "$options": "i"}},
        {"products": {"$regex": "Commodity", "$options": "i"}},

    ]},
    {"account_id": 1, "products":1})


// Find all accounts that does not have CurrencyService product

db.accounts.find({"products": { $not: {"$regex": "CurrencyService", "$options": "i"}}},
{"account_id": 1, "products":1})




// Find all products have a limit of more than 1000, and offer both InvestmentStock and InvestmentFund products

db.accounts.find({
    $and:
    [
        {"products": {"$regex": "InvestmentStock", "$options": "i"}},
        {"products": {"$regex": "Commodity", "$options": "i"}}

    ],
    limit:{
        $gt: 1000,
    },
},
{"account_id": 1, "limit": 1, "products": 1});


// the following uses the SALES Collection under SAMPLE_SUPPLIES
///
///
///

// Show the items sold from the stores at Denver and Seattle.

db.sales.find({
    $or:
    [
        {"storeLocation": "Denver"},
        {"storeLocation": "Seattle"},
    ],
},
{"storeLocation": 1, "items.name": 1});



// Show the items sold from the stores at Denver and where the customer's satisfaction is at least 3.

db.sales.find({
    $and:
    [
        {"storeLocation": "Denver"},
        {"customer.satisfaction": {$gte: 4}},
    ],

},
{"storeLocation": 1, "items.name":1, "customer.satisfaction": 1});


// Show all online sales made at Denver and sales made through phone at Seattle

db.sales.find({
    $and:
    [
        {"storeLocation": "Denver"},
        {"purchaseMethod": {$eq: "Online"}},
    ],
    $and:
    [
        {"storeLocation": "Seattle"},
        {"purchaseMethod": {$eq: "Phone"}},
    ]

},
{"storeLocation": 1, "purchaseMethod":1, "saleDate":1});


// Show all sales that does not use a coupon

db.sales.find({
        "couponUsed": false},

{"storeLocation": 1, "couponUsed":1, "saleDate":1});


// Show all envelopes sales where more than 8 envelopes are sold and no coupon are used.

db.sales.find({
        "items.name": {$eq: "envelopes"},
        "items.quantity": {$gt: 8},
        "couponUsed": false
}
,
{"storeLocation": 1, "saleDate":1, "couponUsed":1});