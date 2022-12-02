//find biz which has violations issued
db.inspections.find(
    {
    "result": "Violation Issued"
    },{
    'business_name': 1,
    "result": 1,
});

// Find all business which has violations, and are in the city of New York.

db.inspections.find(
    {
    "result": "Violation Issued",
    "address.city": "NEW YORK",
    },{
    'business_name': 1,
    "result": 1,
    'address.city': 1
});

// Count how many businesses there in the city of New York

db.inspections.countDocuments(
    {
    "address.city": "NEW YORK",
    },{
    'business_name': 1,
    'address.city': 1
});

// Count how many businesses there are in the city of Ridgewood and does - not have violations 
db.inspections.countDocuments({
    "address.city": "RIDGEWOOD",
    "result": {
        '$ne':'Violation Issued',
        },
    },{
    'result': 1,
    'business_name': 1,
    'address.city': 1
});

// founded in year 2006

db.companies.find(
    {
    "founded_year": 2006,
    },{
    'name': 1,
    'founded_year': 1,
});

// founded after year 2000

db.companies.find({
  "founded_year": { 
    '$gte': 2000,
    },
},{
    'name': 1,
    'founded_year': 1,
});

// founded between 1900 - 2010
db.companies.find({
  "founded_year": { 
    '$gte': 1900,
    '$lte': 2010,
    },
},{
    'name': 1,
    'founded_year': 1,
});
