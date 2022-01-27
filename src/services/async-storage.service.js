import {utilService} from '../services/util.service.js'

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType,filterBy, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || _createEntities(entityType)

    if (entityType === 'stayDB') {
        if (!filterBy) filterBy = { minPrice:-Infinity, maxPrice:Infinity,location:'','Wifi':'','TV':'','Kitchen':'','AC':'','Smoking allowed':'','Pets allowed':''}
        
        // if (filterBy['check-in']){
        // const tsCheckIn = utilService.getTimeStampFromDate(filterBy['check-in'])
        // const tsCheckOut = utilService.getTimeStampFromDate(filterBy['check-out'])

        if (filterBy.location) {
            const location = filterBy.location.toUpperCase()
            entities = entities.filter(stay => {
                return stay.loc.country.toUpperCase().includes(location) || stay.loc.city.toUpperCase().includes(location)
            })
        }
        entities = entities.filter(stay => {
            return (stay.price>=filterBy.minPrice && stay.price <=filterBy.maxPrice)
        } )

        if(filterBy['Wifi']){
            console.log('hi111',filterBy['Wifi'])
            entities = entities.filter(stay => {
                return (stay.amenities.includes('Wifi'))
            })
        }

        if(filterBy['TV']){
            entities = entities.filter(stay => {
                return (stay.amenities.includes('TV'))
            })
        }
        if(filterBy['Kitchen']){
            entities = entities.filter(stay => {
                return (stay.amenities.includes('Kitchen'))
            })
        }
        if(filterBy['AC']){
            entities = entities.filter(stay => {
                return (stay.amenities.includes('AC'))
            })
        }

        if(filterBy['Smoking allowed']){
            entities = entities.filter(stay => {
                return (stay.amenities.includes('Smoking allowed'))
            })
        }

        if(filterBy['Pets allowed']){
            entities = entities.filter(stay => {
                return (stay.amenities.includes('Pets allowed'))
            })
        }
    }
        
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })

}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}




function _createEntities(entityType) {
    let entities
    switch (entityType) {
        case 'stayDB':
            entities = [
                {
                    "_id": "10006547",
                    "name": "Sunny Beach Apartment",
                    "type": "Apartment",
                    "rooms": "3 bedrooms",
                    "beds": "4 beds",
                    "baths": "2 baths",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642600159/airbnb/1.Sunny%20Beach%20Apartment/st1ndcdgqaxxijkkhb2q.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642600159/airbnb/1.Sunny%20Beach%20Apartment/wmygr93wrcqh5fsc3dz4.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642600159/airbnb/1.Sunny%20Beach%20Apartment/mnkeemhzpc642yfq1xeg.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642600159/airbnb/1.Sunny%20Beach%20Apartment/af3ztibpl68iy1xrsgom.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642600159/airbnb/1.Sunny%20Beach%20Apartment/csbx1d1wzgkvdbqncibe.jpg"
                    ],
                    "price": 124.00,
                    "summary": "Wake up only 100m from the sand at Bondi Beach :) This is an actual Bondi locals home, not an AirBnB investment property. The entire flat is north east facing; great light, morning and afternoon. High ceilings with ornate features in an original art deco block. Right in the heart of Bondi with all the cafes, shops, bars and restaurants on your doorstep!",
                    "capacity": 6,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Hair dryer",
                        "Washer",
                        "Pets allowed",
                        "Beach access",
                        "Sound system with aux"
                    ],
                    "host": {
                        "_id": "51399392",
                        "fullname": "Damien Li",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/z9fvzn5thptwielcxjcs.jpg",
                    },
                    "loc": {
                        "country": "Australia",
                        "countryCode": "AUS",
                        "city":"Sydney",
                        "address": "Bondi Beach, New South Wales, Australia",
                        "lat": -151.275204,
                        "lng": 33.888219
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1577829600,
                            "txt": "Beautiful apartment, steps to the beach. Cute furnishings and great price",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399401",
                                "fullname": "Lindsay Cohen",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/rqxrhjsfe3pdfigrngck.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1544429611,
                            "txt": "A great place - incredibly close to the beach! Right off the main road in Bondi Beach, so if you want to be in the middle of the action you can’t beat this spot. The apartment got a bit too warm for us with no AC (we visited in the summer months) but fans in the bedrooms were helpful. JC was a great host and super responsive!",
                            "rate": {
                                "Cleanliness":5,
                                "Communication":4,
                                "Check-in":5,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399402",
                                "fullname": "Ben Alush",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/hexzpxqrbckr79fpme6k.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1612562400,
                            "txt": "Just as beautiful as pictured and in the perfect location, literally a minute walk from the beach on the block! James was very communicative and helpful when needed. Such a dreamy spot!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399403",
                                "fullname": "Kristina Ami",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/oani6ltbutvjrwtk3y87.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006548",
                    "name": "Potts Point Apartment",
                    "type": "Studio Apartment",
                    "rooms": "1 bedroom",
                    "beds": "1 bed",
                    "baths": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603035/airbnb/2.Potts%20Point%20Apartment/luaf5chccjidm4omsnul.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603035/airbnb/2.Potts%20Point%20Apartment/jnk8qkvdagatou0wk1tt.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603035/airbnb/2.Potts%20Point%20Apartment/xkridiixumipmska3rwo.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603034/airbnb/2.Potts%20Point%20Apartment/sa0ozlgrvnlj9favhs6z.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603034/airbnb/2.Potts%20Point%20Apartment/wtyapwhtneddeb61a3cj.jpg"
                    ],
                    "price": 155.00,
                    "summary": "COMMITTED TO HIGHEST COVID-19 CLEANING STANDARDS. Large floor-to-ceiling windows welcome the Sydney sunshine in this stylish apartment furnished with chic, modern amenities. On the roof, take in gorgeous views of Sydney Harbour and the Opera House as you float in the pool or dine on the deck.",
                    "capacity": 2,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Hair dryer",
                        "Washer",
                        "Pool",
                        "Coffee maker",
                        "Iron"
                    ],
                    "host": {
                        "_id": "51399393",
                        "fullname": "Shaine Muller",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/qgs5dku8ibjb27lemyd8.jpg",
                    },
                    "loc": {
                        "country": "Australia",
                        "countryCode": "AUS",
                        "city":"Sydney",
                        "address": "Potts Point, New South Wales, Australia",
                        "lat": -151.223921,
                        "lng": 33.867867
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1601931600,
                            "txt": "Potts Point is a lovely district within downtown Sydney within walking distance of several tourist attractions. I appreciated all of Damien’s suggestions on what to see in Sydney and restaurants to eat at. I loved our stay!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399404",
                                "fullname": "Anna Daisy",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/iv4wumidq298t4dkymr7.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1570136400,
                            "txt": "This apartment in Potts Point is in a great location with spectacular views! I was quite impressed with how functional the space was. The apartment is small, but has everything you will need.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":3,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399405",
                                "fullname": "Caroline Zinc",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/x69menxowdfk9t0w6vkq.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1639778400,
                            "txt": "Terrific location with wonderful walking and running options and spectacular rooftop harbor view. The pool and roof top is an added bonus. Lots of restaurants within easy walking distance. The apartment has a very pleasant outlook and handy location and excellent communication with your host.",
                            "rate": {
                                "Cleanliness":5,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399406",
                                "fullname": "Sandra Sho",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/yso7svkq9csrtyn1tt1f.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006549",
                    "name": "NTH VIEW -  Beachfront Retreat!",
                    "type": "House",
                    "rooms": "2 bedrooms",
                    "beds": "2 beds",
                    "baths": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603234/airbnb/3.NTH%20VIEW%20-%20%20Beachfront%20Retreat%21/erdg7jqz3ddrljjrx0gy.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603234/airbnb/3.NTH%20VIEW%20-%20%20Beachfront%20Retreat%21/tilbgf2e4g7q6wey9ubr.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603234/airbnb/3.NTH%20VIEW%20-%20%20Beachfront%20Retreat%21/cle9arb9gfvcvzxahxsz.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603233/airbnb/3.NTH%20VIEW%20-%20%20Beachfront%20Retreat%21/oc3lih08dcmbxkjnxcpq.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603233/airbnb/3.NTH%20VIEW%20-%20%20Beachfront%20Retreat%21/a5352qg0a4s4bvvjgsva.jpg"
                    ],
                    "price": 225.00,
                    "summary": "Boasting spectacular ocean views from all rooms, this two bedroom, top floor apartment has been freshly renovated & luxuriously styled throughout. Feel on top of the world in your very own private beachfront retreat!. Offering direct access to Narrabeen beach and walking distance to popular restaurants, bars, cafes & shops. No car is needed in this incredible and convenient location.....You won't want to leave! ",
                    "capacity": 4,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Washer",
                        "Dryer",
                        "Beach access - Beachfront"
                    ],
                    "host": {
                        "_id": "51399394",
                        "fullname": "Laura Geva",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/ysfdpeukfczrsojbsybv.jpg",
                    },
                    "loc": {
                        "country": "Australia",
                        "countryCode": "AUS",
                        "city":"Sydney",
                        "address": "Narrabeen, New South Wales, Australia",
                        "lat": -151.223921,
                        "lng": 33.867867
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1616364000,
                            "txt": "absolutely beautiful place! such a lovely host!!! the place was perfect for my group of friends and was clean and comfortable to stay in 💌",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399407",
                                "fullname": "Lily High",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/xvvnlvnxfswn2wuljf1u.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1579816800,
                            "txt": "Can't recommend Laura's apartment enough. It runs the width of the apartment building so there are ocean views from literally every window. Second bedroom, bathroom and kitchen all look to the south with really beach views to Collaroy. Main bedroom (which is huge and beautiful) and living area look to the north and both get all day sun. Apartment is super light and bright, and literally footsteps from the sand. kitchen is super functional and well equipped with everything you need. Location is excellent - literally footsteps from the beach, and 500mtrs to the north or south for a great selection of cafes and restaurants. Communication with Laura was fast. Highly recommend!, thanks so much Laura :)",
                            "rate": {
                                "Cleanliness":5,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399408",
                                "fullname": "Linda Bino",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/gzloilmrozsgnar7kcpy.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1626296400,
                            "txt": "We had a wonderful stay and completely fell in love with Narrabeen. Great location and super easy for kids. We will be back!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":5,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399409",
                                "fullname": "Bianca Papo",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/sok0f011ccq2og8aczma.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006550",
                    "name": "Nice South Slope 2 BR w/ Patio, Washer / Dryer",
                    "type": "House",
                    "rooms": "2 bedrooms",
                    "beds": "3 beds",
                    "bath": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603541/airbnb/1.Nice%20South%20Slope%202%20BR%20w%20Patio%2C%20Washer%20%20Dryer/sorvf2bw377ollbx8ks3.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603541/airbnb/1.Nice%20South%20Slope%202%20BR%20w%20Patio%2C%20Washer%20%20Dryer/nasros7aa5xxs9eiwron.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603541/airbnb/1.Nice%20South%20Slope%202%20BR%20w%20Patio%2C%20Washer%20%20Dryer/b9czkoyopauaxcxkqxdj.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603541/airbnb/1.Nice%20South%20Slope%202%20BR%20w%20Patio%2C%20Washer%20%20Dryer/bsd2pigj4vbrhapcn8lf.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603540/airbnb/1.Nice%20South%20Slope%202%20BR%20w%20Patio%2C%20Washer%20%20Dryer/pswbzrvjj9stkoiw3jie.jpg"
                    ],
                    "price": 230.00,
                    "summary": "New two-bedroom ground-level apartment set back from the street, located on a quiet block in South Slope Brooklyn near restaurants, bars, grocery stores, coffee shops, subway & bus lines. Great area!You'll feel at home here. It's spacious with comfortable furniture, Nectar Mattresses for quality sleep, a fully stocked kitchen so you can cook and eat in if you like. And two big NYC pluses - there's a WASHER and DRYER in the unit and there's a small outdoor space off the Master Bedroom in back.",
                    "capacity": 6,
                    "amenities": [
                        "Courtyard view",
                        "Garden view",
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Pets allowed",
                        "Smoking allowed",
                        "Pets allowed",
                        "Cooking basics",
                        "Air conditioning",
                        "50\" HDTV with Amazon Prime Video, Netflix, Roku",
                        "Washer"
                    ],
                    "host": {
                        "_id": "51399395",
                        "fullname": "Todd James",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/rpwmbdbljxbreiyr1dp5.jpg",
                    },
                    "loc": {
                        "country": "United States",
                        "countryCode": "USA",
                        "city":"New York",
                        "address": "Brooklyn, New York,United States",
                        "lat": 40.66801,
                        "lng": -73.98784
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": "1639164653",
                            "txt": "Our stay at Todd's place was great! Super easy to get to manhattan using the subway and lots to do right around Brooklyn. Todd was very quick to respond and assist with check in. This was an amazing stay!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399410",
                                "fullname": "Kristen Boss",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/ymls8guacyduphw9gbek.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": "1642534652",
                            "txt": "Delightful unit better than the photos, which are great. Very safe and well-located part of Brooklyn. Easy access to the subway and to many Park Slope amenities. Owner was very easy to communicate with and responded to questions quite promptly.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":5,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399411",
                                "fullname": "Richard Gone",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/nnmrnj0cioxhrdj9nohv.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": "1636659452",
                            "txt": "Good location. Close to Shopping, restaurants and the Barclays Center.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":5,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399412",
                                "fullname": "Shane Seer",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/labhymljovfwwwakwr9h.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006551",
                    "name": "138 Bowery-Modern Queen Studio",
                    "type": "House",
                    "rooms": "Studio",
                    "beds": "1 bed",
                    "bath": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603776/airbnb/2.138%20Bowery-Modern%20Queen%20Studio/qj6foafn2alcmsb2otah.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603775/airbnb/2.138%20Bowery-Modern%20Queen%20Studio/xpczizwjq13lpbkpqcz9.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603775/airbnb/2.138%20Bowery-Modern%20Queen%20Studio/be8t51kuem6cb7axlo6f.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603775/airbnb/2.138%20Bowery-Modern%20Queen%20Studio/r8hw0ffscselixvxggsm.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603775/airbnb/2.138%20Bowery-Modern%20Queen%20Studio/uw2hx9tix537k9mdlcmu.jpg"
                    ],
                    "price": 100.00,
                    "summary": "Located in Bowery - historically the most unique streetscape of New York with over 400 years of history and culture - this place is right around the corner of Grand St subway. Super convenient as you can be anywhere in Manhattan in just a few minutes. Steps away from SoHo, NoHo and major subway lines (6,J,Z,N,Q,B,D). Its unbeatable location puts the best of downtown.",
                    "capacity": 2,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Smoking allowed",
                        "Pets allowed",
                        "Cooking basics",
                        "Paid dryer - In building",
                        "Bathtub",
                        "Refrigerator",
                        "Microwave"
                    ],
                    "host": {
                        "_id": "51399396",
                        "fullname": "Jeniffer Huoston",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/zlkfwvkumwlrzzrtnrms.jpg",
                    },
                    "loc": {
                        "country": "United States",
                        "countryCode": "USA",
                        "city":"New York",
                        "address": "New York, United States",
                        "lat": 40.71649,
                        "lng": -73.94865
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": "1630870652",
                            "txt": "Have stayed here severaltimes now. Always clean, safe and perfect location. Wifi, elevator, a/c, quiet. It's a fabulous stay & I highly recommend.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":5,
                                "Accuracy":5,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399413",
                                "fullname": "Stephanie Grass",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/clz9vbbaephnsmkcdgq2.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": "1588707452",
                            "txt": "Clean apartment, great location. Jeniffer was a very accommodating host in setting me up and kept good communication throughout my stay.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399414",
                                "fullname": "Patricia Slack",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/hvkh9qe0a07mi873zdyz.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": "1554493052",
                            "txt": "Great value and location.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":5,
                                "Accuracy":5,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399415",
                                "fullname": "Johannes Shane",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/csrbgx9vv8bbs2fmbpdu.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006552",
                    "name": "Luxury private apartment/Suite/with balcony",
                    "type": "House",
                    "rooms": "1 bedroom",
                    "beds": "4 beds",
                    "bath": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603874/airbnb/3.Luxury%20private%20apartmentSuitewith%20balcony/it5vi5ayl8epkjbuvro5.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603873/airbnb/3.Luxury%20private%20apartmentSuitewith%20balcony/kntpqe217cuawwuqoq0w.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603873/airbnb/3.Luxury%20private%20apartmentSuitewith%20balcony/a238yoc4lhkdrfebijh2.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603873/airbnb/3.Luxury%20private%20apartmentSuitewith%20balcony/xjf5gxlbcanmkksmkbxw.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603873/airbnb/3.Luxury%20private%20apartmentSuitewith%20balcony/pdy9nqr4tqxr8j48ongf.jpg"
                    ],
                    "price": 105.00,
                    "summary": "Luxury private apartment/suite with cozy balcony/terrace has a brand new modern furniture with queen size bedroom set in the bedroom and double level daybed in the living room(see pictures). Very comfortable mattress in every bed.Apartment Building is situated just 15 minutes away from all major airports. Walking distance to all large shopping malls, supermarkets,restaurants and boutiques. Just one block away to \"R\" and \"M\" trains (15-20 minutes to Manhattan) and other major transportation...",
                    "capacity": 4,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "Smoking allowed",
                        "Pets allowed",
                        "Cooking basics",
                        "Free street parking",
                        "TV with standard cable",
                        "Paid washer - In building",
                        "Elevator",
                    ],
                    "host": {
                        "_id": "51399397",
                        "fullname": "Lana Jane",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/w5h7m6yedu6iqzi8pje8.jpg",
                    },
                    "loc": {
                        "country": "United States",
                        "countryCode": "USA",
                        "city":"New York",
                        "address": "Queens, New York, United States",
                        "lat": 40.71567,
                        "lng": -73.87842
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": "1641065852",
                            "txt": "Great place, probably one of the best places for the price. very clean and organize. loved it.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":5,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399416",
                                "fullname": "Geovanni Rosso",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694272/airbnb/users/ovpsurmx5olcbaoqujdv.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": "1594150652",
                            "txt": "Very spacious and clean. Location is very convenient and is in a nice neighborhood. I would recommend this place.",
                            "rate": {
                                "Cleanliness":5,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":5,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399417",
                                "fullname": "Yuji Lev",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/ezpzm0eiipod0yrxu2pm.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": "1617478652",
                            "txt": "Had a good stay at Lana's place.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399418",
                                "fullname": "Cynthia Wayne",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/rlzfdsumttpvqyc9aenv.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006553",
                    "name": "Tafari Gran Via",
                    "type": "House",
                    "rooms": "1 bedroom",
                    "beds": "1 bed",
                    "baths": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603980/airbnb/1.Tafari%20Gran%20Via/oapgf7bnlo3bxladxcsi.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603980/airbnb/1.Tafari%20Gran%20Via/mkjwdxg7ozvdw3sjj92v.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603980/airbnb/1.Tafari%20Gran%20Via/qa4iqzk48aymylesh6fs.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603980/airbnb/1.Tafari%20Gran%20Via/shwqsfzg0xtgzphk0xdm.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642603979/airbnb/1.Tafari%20Gran%20Via/vygbh3zftuetyplv09ef.jpg"
                    ],
                    "price": 78.54,
                    "summary": "Elegant and comfortable one-roomed flat for rent per day situated in the center of Madrid, just behind the mythical building of the Hotel Atlantico of Gran Vía.The nearest metro stations are: Callao / Gran Vía.Ideal for married couples, singles or families who want to stay a few days in the town.The flat is located in a new built building (year 2008), it is on the fifth floor with lift and has a capacity of 3 persons. It has a double bed and a sofa of 85 cm.The kitchen is totally equiped.",
                    "capacity": 2,
                    "amenities": [
                        "TV with standard cable",
                        "Wifi",
                        "Kitchen",
                        "AC",
                        "Hair dryer",
                        "Elevator",
                        "Dryer",
                        "Luggage drop off allowed",
                        "Security cameras on property",
                        "Washer"
                    ],
                    "host": {
                        "_id": "51399398",
                        "fullname": "Nuria",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/r8jukej0xmbajqluliqe.jpg",
                    },
                    "loc": {
                        "country": "Spain",
                        "countryCode": "SP",
                        "city":"Madrid",
                        "address": "Madrid, Spain",
                        "lat": 40.42116,
                        "lng": -3.70384
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1465767064,
                            "txt": "We loved staying at Nurias place. The location is so centralized and we were able to enjoy walking to different attractions in the city.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399419",
                                "fullname": "Linda Zaia",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/iqkf1w1u1l6zoqzxgrli.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1534109464,
                            "txt": "Nuria's apartment is in the perfect location to everything in the historic center. The place is close to everything that we were able to stop by and drop of stuff as needed or take a nap when we were touring the city. All the amenities are as described and Nuria is a great host able to help us with any questions we had during the check in.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":5,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399420",
                                "fullname": "Edgar Moz",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/jvcxtcuixivln9pqpcz7.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1612992664,
                            "txt": "Nuria hands down was absolutely fantastic and accommodating. She's very flexible as far as check-in/check out times and she even provided complimentary champagne as a welcoming gift. The location of her apartment was amazing! Most of the typical tourist spots are close by and walkable. If you don't want to walk, the apartment is right across the street from the Callao metro stop. Would stay here again if I visit Madrid.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399421",
                                "fullname": "Stephanie Leinani",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/oani6ltbutvjrwtk3y87.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006554",
                    "name": "Attic in the Heart of Madrid-WIFI",
                    "type": "House",
                    "rooms": "1 bedroom",
                    "beds": "1 bed",
                    "baths": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604482/airbnb/2.Attic%20in%20the%20Heart%20of%20Madrid-WIFI/kfjvtiens7lzcujrmk33.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604482/airbnb/2.Attic%20in%20the%20Heart%20of%20Madrid-WIFI/x7l34bczffiw7xfehkj9.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604482/airbnb/2.Attic%20in%20the%20Heart%20of%20Madrid-WIFI/fxnsp3vyr1lza8yh0oce.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604482/airbnb/2.Attic%20in%20the%20Heart%20of%20Madrid-WIFI/qrtwnhhs0lo2kpncgyxv.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604481/airbnb/2.Attic%20in%20the%20Heart%20of%20Madrid-WIFI/eo5dju90xjvxgnujqo8t.jpg"
                    ],
                    "price": 33.84,
                    "summary": "The space Attic room in the center of Madrid very bright and quiet, overlooking the entire south of Madrid and five minutes from the Puerta del Sol and Madrid's most emblematic places. Calm and quiet, but in the area where most people go out. Bars, cinemas (spanish and english), bars, restaurants, museums, main train station... everything is close to the attic. It has a large bathroom, comfortable lounge with TV, HiFi and kitchen. Wi-Fi by optical fiber. Heating. Plenty of light! The Wi-Fi has the maximum speed available (100MB) to surf the net or use video Skype with total guarantee. An excellent place from which to discover Madrid, with the metro at the door and 10 minutes from Atocha Station. Metro at the door. No smokers.",
                    "capacity": 1,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "AC",
                        "Hair dryer",
                        "Long term stays allowed",
                        "Dryer",
                        "Washer"
                    ],
                    "host": {
                        "_id": "51399399",
                        "fullname": "José",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/i2v3i6lbcrb1eubmezkj.jpg",
                    },
                    "loc": {
                        "country": "Spain",
                        "countryCode": "SP",
                        "city":"Madrid",
                        "address": "Madrid, Spain",
                        "lat": 40.41126,
                        "lng": -3.70347
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1541280664,
                            "txt": "Very cute space in a great location! Close to a lot of stores bars and metro! Although Jose was on vacation during my visit and we didn’t get to meet, he was very easy to get a hold of and very quick to respond! My stay was cut short due to things out of his and my control but he was very helpful anytime I needed! The room is a comfortable stay, it does get very hot so be sure to buy a fan for the room! The room is up a lot of stairs so be prepared. But overall great space while visit Madrid & he was a great host!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399422",
                                "fullname": "Mallory Gauoda",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/xzbls0ekzakmg9tnsyot.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1513373464,
                            "txt": "I lived with José for 4 months while studying abroad in Madrid and he could not have been a better host. Every positive review is absolutely accurate, he really is fantastic. The neighborhood is centrally located and a short walk from major metro stops and a 10 minute walk to most major tourist destinations. Close enough for convenience and far enough to have a quiet place to stay that was a great representation of the diversity of Madrid. The apartment is fantastic and José is happy to give you recommendations, binge watch Game of Thrones with you or give you privacy when you need it. At one point I got very sick and he even went to the pharmacy for me. If you're a solo female traveler, this neighborhood like most of Madrid, is VERY safe! I took many late night walks alone. The apartment is on the top floor with no elevator so if you have mobility issues, you should consider that. Otherwise, stay here! Thank you so much, José!",
                            "rate": {
                                "Cleanliness":5,
                                "Communication":5,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":5,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399423",
                                "fullname": "Crystal Palas",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/dlkzgh1lknrddahvf1dh.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1466026264,
                            "txt": "The apartment is exactly as the listing describes it, and the neighborhood is lively , Full of interesting cafés and things to do. You can walk to the best museums, and yet not be in an area dominated by tourism.José was extremely kind and eager to be helpful in every moment, but one can also have quiet, and once complete privacy.",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":3,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399424",
                                "fullname": "Jerrilynn aloni",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/iabu99jfklda8w86wboe.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                },
                {
                    "_id": "10006555",
                    "name": "Loft Eloisa",
                    "type": "House",
                    "rooms": "1 bedroom",
                    "beds": "1 bed",
                    "baths": "1 bath",
                    "imgUrls": [
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604677/airbnb/3.Loft%20Eloisa/ukf2rleeojb7vqb6udf0.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604677/airbnb/3.Loft%20Eloisa/kj0fznnca50omsk5vom9.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604677/airbnb/3.Loft%20Eloisa/riht5pn6bywgeempf41c.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604677/airbnb/3.Loft%20Eloisa/zfkagl89jrtbn7uwsve9.jpg",
                        "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642604677/airbnb/3.Loft%20Eloisa/kcpt4zxj9y4vml74jp7n.jpg"
                    ],
                    "price": 107.60,
                    "summary": "The space Attic room in the center of Madrid very bright and quiet, overlooking the entire south of Madrid and five minutes from the Puerta del Sol and Madrid's most emblematic places. Calm and quiet, but in the area where most people go out. Bars, cinemas (spanish and english), bars, restaurants, museums, main train station... everything is close to the attic. It has a large bathroom, comfortable lounge with TV, HiFi and kitchen. Wi-Fi by optical fiber. Heating. Plenty of light! The Wi-Fi has the maximum speed available (100MB) to surf the net or use video Skype with total guarantee. An excellent place from which to discover Madrid, with the metro at the door and 10 minutes from Atocha Station. Metro at the door. No smokers.",
                    "capacity": 2,
                    "amenities": [
                        "TV",
                        "Wifi",
                        "Kitchen",
                        "AC",
                        "Long term stays allowed",
                        "Dryer",
                        "Washer",
                        "Hair dryer",
                        "Pets allowed",
                        "Patio or balcony"
                    ],
                    "host": {
                        "_id": "51399400",
                        "fullname": "David Eloisa",
                        "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/lvnkfgpktpbrlxymdolz.jpg",
                    },
                    "loc": {
                        "country": "Spain",
                        "countryCode": "SP",
                        "city":"Madrid",
                        "address": "Madrid, Spain",
                        "lat": 40.40639,
                        "lng": -3.70048
                    },
                    "reviews": [
                        {
                            "id": "r101",
                            "createdAt": 1563226264,
                            "txt": "nice place for couples...",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":5,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":5,
                                "Value":5
                            },
                            "by": {
                                "_id": "51399425",
                                "fullname": "Gorge Mai",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/ixjgcxyr0ldtr0nusevt.jpg"
                            }
                        },
                        {
                            "id": "r102",
                            "createdAt": 1537047064,
                            "txt": "Very clean and nice place, in a very good neighborhood. Eloisa always very kind and in constant communication. We had a great stay, thank you once again!",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":4,
                                "Location":4,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399426",
                                "fullname": "Jose Antonio",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/iklgetxe2b2ydlupuzib.jpg"
                            }
                        },
                        {
                            "id": "r103",
                            "createdAt": 1539639064,
                            "txt": "Nice place, 5 min from atocha and 15 min by walk to the city center . Worth enough !",
                            "rate": {
                                "Cleanliness":4,
                                "Communication":4,
                                "Check-in":4,
                                "Accuracy":5,
                                "Location":5,
                                "Value":4
                            },
                            "by": {
                                "_id": "51399427",
                                "fullname": "Emanuel Noir",
                                "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/rmpydqpcbz8c1ims6hzb.jpg"
                            }
                        }
                    ],
                    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
                }
            ]
            break;
        case 'userDB':
            entities = [
                {
                    "_id": "00000001",
                    "fullname": "Guest",
                    "imgUrl": "/broken-image.jpg",
                    "isHost": false,
                    "isGuest": true,
                    "username": "Guest",
                    "password": "123"
                },
                {
                    "_id": "51399392",
                    "fullname": "Damien Li",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/z9fvzn5thptwielcxjcs.jpg",
                    "isHost": true,
                    "username": "Damien",
                    "password": "1234"
                },
                {
                    "_id": "51399393",
                    "fullname": "Shaine Muller",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/qgs5dku8ibjb27lemyd8.jpg",
                    "isHost": true,
                    "username": "shaine",
                    "password": "1234"
                },
                {
                    "_id": "51399394",
                    "fullname": "Laura Geva",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/ysfdpeukfczrsojbsybv.jpg",
                    "isHost": true,
                    "username": "Laura",
                    "password": "1234"
                },
                {
                    "_id": "51399395",
                    "fullname": "Todd James",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/rpwmbdbljxbreiyr1dp5.jpg",
                    "isHost": true,
                    "username": "Todd",
                    "password": "1234"
                },
                {
                    "_id": "51399396",
                    "fullname": "Jeniffer Huoston",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/zlkfwvkumwlrzzrtnrms.jpg",
                    "isHost": true,
                    "username": "Jeniffer",
                    "password": "1234"
                },
                {
                    "_id": "51399397",
                    "fullname": "Lana Jane",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/w5h7m6yedu6iqzi8pje8.jpg",
                    "isHost": true,
                    "username": "Lana",
                    "password": "1234"
                },
                {
                    "_id": "51399398",
                    "fullname": "Nuria Guy",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/r8jukej0xmbajqluliqe.jpg",
                    "isHost": true,
                    "username": "Nuria",
                    "password": "1234"
                },
                {
                    "_id": "51399399",
                    "fullname": "José Alur",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/i2v3i6lbcrb1eubmezkj.jpg",
                    "isHost": true,
                    "username": "José",
                    "password": "1234"
                },
                {
                    "_id": "51399400",
                    "fullname": "David Eloisa",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/lvnkfgpktpbrlxymdolz.jpg",
                    "isHost": true,
                    "username": "David",
                    "password": "1234"
                },
                {
                    "_id": "51399401",
                    "fullname": "Lindsay Cohen",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/rqxrhjsfe3pdfigrngck.jpg",
                    "isHost": false,
                    "username": "Lindsay",
                    "password": "123"
                },
                {
                    "_id": "51399402",
                    "fullname": "Ben Alush",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/hexzpxqrbckr79fpme6k.jpg",
                    "isHost": false,
                    "username": "Ben",
                    "password": "123"
                },
                {
                    "_id": "51399403",
                    "fullname": "Kristina Ami",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/oani6ltbutvjrwtk3y87.jpg",
                    "isHost": false,
                    "username": "Kristina",
                    "password": "123"
                },
                {
                    "_id": "51399404",
                    "fullname": "Anna Daisy",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/iv4wumidq298t4dkymr7.jpg",
                    "isHost": false,
                    "username": "Anna",
                    "password": "123"
                },
                {
                    "_id": "51399405",
                    "fullname": "Caroline Zinc",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/x69menxowdfk9t0w6vkq.jpg",
                    "isHost": false,
                    "username": "Caroline",
                    "password": "123"
                },
                {
                    "_id": "51399406",
                    "fullname": "Sandra Sho",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/yso7svkq9csrtyn1tt1f.jpg",
                    "isHost": false,
                    "username": "Sandra",
                    "password": "123"
                },
                {
                    "_id": "51399407",
                    "fullname": "Lily High",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/xvvnlvnxfswn2wuljf1u.jpg",
                    "isHost": false,
                    "username": "Lily",
                    "password": "123"
                },
                {
                    "_id": "51399408",
                    "fullname": "Linda Bino",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/gzloilmrozsgnar7kcpy.jpg",
                    "isHost": false,
                    "username": "Linda",
                    "password": "123"
                },
                {
                    "_id": "51399409",
                    "fullname": "Bianca Papo",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/sok0f011ccq2og8aczma.jpg",
                    "isHost": false,
                    "username": "Bianca",
                    "password": "123"
                },
                {
                    "_id": "51399410",
                    "fullname": "Kristen Boss",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/ymls8guacyduphw9gbek.jpg",
                    "isHost": false,
                    "username": "Kristen",
                    "password": "123"
                },
                {
                    "_id": "51399411",
                    "fullname": "Richard Gone",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/nnmrnj0cioxhrdj9nohv.jpg",
                    "isHost": false,
                    "username": "Richard",
                    "password": "123"
                },
                {
                    "_id": "51399412",
                    "fullname": "Shane Seer",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/labhymljovfwwwakwr9h.jpg",
                    "isHost": false,
                    "username": "Shane",
                    "password": "123"
                },
                {
                    "_id": "51399413",
                    "fullname": "Stephanie Grass",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/clz9vbbaephnsmkcdgq2.jpg",
                    "isHost": false,
                    "username": "Stephanie",
                    "password": "123"
                },
                {
                    "_id": "51399414",
                    "fullname": "Patricia Slack",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/hvkh9qe0a07mi873zdyz.jpg",
                    "isHost": false,
                    "username": "Patricia",
                    "password": "123"
                },
                {
                    "_id": "51399415",
                    "fullname": "Johannes Shane",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/csrbgx9vv8bbs2fmbpdu.jpg",
                    "isHost": false,
                    "username": "Johannes",
                    "password": "123"
                },
                {
                    "_id": "51399416",
                    "fullname": "Geovanni Rosso",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694272/airbnb/users/ovpsurmx5olcbaoqujdv.jpg",
                    "isHost": false,
                    "username": "Geovanni",
                    "password": "123"
                },
                {
                    "_id": "51399417",
                    "fullname": "Yuji Lev",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/ezpzm0eiipod0yrxu2pm.jpg",
                    "isHost": false,
                    "username": "Yuji",
                    "password": "123"
                },
                {
                    "_id": "51399418",
                    "fullname": "Cynthia Wayne",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/rlzfdsumttpvqyc9aenv.jpg",
                    "isHost": false,
                    "username": "Cynthia",
                    "password": "123"
                },
                {
                    "_id": "51399419",
                    "fullname": "Linda Zaia",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694276/airbnb/users/iqkf1w1u1l6zoqzxgrli.jpg",
                    "isHost": false,
                    "username": "Linda",
                    "password": "123"
                },
                {
                    "_id": "51399420",
                    "fullname": "Edgar Moz",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/jvcxtcuixivln9pqpcz7.jpg",
                    "isHost": false,
                    "username": "Edgar",
                    "password": "123"
                },
                {
                    "_id": "51399421",
                    "fullname": "Stephanie Leinani",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/oani6ltbutvjrwtk3y87.jpg",
                    "isHost": false,
                    "username": "Stephanie",
                    "password": "123"
                },
                {
                    "_id": "51399422",
                    "fullname": "Mallory Gauoda",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694275/airbnb/users/xzbls0ekzakmg9tnsyot.jpg",
                    "isHost": false,
                    "username": "Mallory",
                    "password": "123"
                },
                {
                    "_id": "51399423",
                    "fullname": "Crystal Palas",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694277/airbnb/users/dlkzgh1lknrddahvf1dh.jpg",
                    "isHost": false,
                    "username": "Crystal",
                    "password": "123"
                },
                {
                    "_id": "51399424",
                    "fullname": "Jerrilynn Aloni",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/iabu99jfklda8w86wboe.jpg",
                    "isHost": false,
                    "username": "Jerrilynn",
                    "password": "123"
                },
                {
                    "_id": "51399425",
                    "fullname": "Gorge Mai",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/ixjgcxyr0ldtr0nusevt.jpg",
                    "isHost": false,
                    "username": "Gorge",
                    "password": "123"
                },
                {
                    "_id": "51399426",
                    "fullname": "Jose Antonio",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694274/airbnb/users/iklgetxe2b2ydlupuzib.jpg",
                    "isHost": false,
                    "username": "Jose",
                    "password": "123"
                },
                {
                    "_id": "51399427",
                    "fullname": "Emanuel Noir",
                    "imgUrl": "https://res.cloudinary.com/dxdtpxsax/image/upload/v1642694273/airbnb/users/rmpydqpcbz8c1ims6hzb.jpg",
                    "isHost": false,
                    "username": "Emanuel",
                    "password": "123"
                },
            ]
            break;
        default:
            break;
    }
    localStorage.setItem(entityType, JSON.stringify(entities))
    return entities
}


