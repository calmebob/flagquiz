// Country data for the Flag Quiz app — all 193 UN member states
// Flag images stored locally in /flags/{code}.svg (from flag-icons npm package)
// Data compiled from CIA World Factbook and Wikipedia

const countries = [
  {
    "code": "dz",
    "name": "Algeria",
    "capital": "Algiers",
    "continent": "Africa",
    "population": "45 million",
    "similarFlag": "ng",
    "funFacts": [
      "Largest country in Africa by area",
      "Sahara covers 80% of Algeria",
      "7 UNESCO World Heritage Sites"
    ],
    "misspellings": [
      "algerea",
      "aljeria"
    ]
  },
  {
    "code": "ao",
    "name": "Angola",
    "capital": "Luanda",
    "continent": "Africa",
    "population": "36 million",
    "similarFlag": "mz",
    "funFacts": [
      "2nd largest oil producer in Africa",
      "One of the youngest populations globally",
      "Currency is called the kwanza"
    ],
    "misspellings": [
      "angola"
    ]
  },
  {
    "code": "bj",
    "name": "Benin",
    "capital": "Porto-Novo",
    "continent": "Africa",
    "population": "13 million",
    "similarFlag": "ml",
    "funFacts": [
      "Birthplace of the Vodun (Voodoo) religion",
      "Formerly known as Dahomey",
      "One of Africa's most stable democracies"
    ],
    "misspellings": [
      "benine",
      "bennin"
    ]
  },
  {
    "code": "bw",
    "name": "Botswana",
    "capital": "Gaborone",
    "continent": "Africa",
    "population": "2.6 million",
    "similarFlag": "ee",
    "funFacts": [
      "Home to the Okavango Delta",
      "Diamonds make up 80% of exports",
      "One of lowest population densities worldwide"
    ],
    "misspellings": [
      "botswanna"
    ]
  },
  {
    "code": "bf",
    "name": "Burkina Faso",
    "capital": "Ouagadougou",
    "continent": "Africa",
    "population": "22 million",
    "similarFlag": "gh",
    "funFacts": [
      "Name means 'Land of Honest People'",
      "Hosts FESPACO, Africa's largest film festival",
      "Capital has one of the hardest names to spell"
    ],
    "misspellings": [
      "burkina fasso",
      "burkino faso"
    ]
  },
  {
    "code": "bi",
    "name": "Burundi",
    "capital": "Gitega",
    "continent": "Africa",
    "population": "13 million",
    "similarFlag": "rw",
    "funFacts": [
      "One of the smallest countries in Africa",
      "Drumming is an important cultural tradition",
      "Lake Tanganyika borders Burundi"
    ],
    "misspellings": [
      "burandi",
      "burundee"
    ]
  },
  {
    "code": "cv",
    "name": "Cabo Verde",
    "capital": "Praia",
    "continent": "Africa",
    "population": "600,000",
    "similarFlag": "eu",
    "funFacts": [
      "Island nation off the coast of West Africa",
      "Also known as Cape Verde",
      "Famous for its Creole culture and music"
    ],
    "misspellings": [
      "cape verde",
      "cabo verd"
    ]
  },
  {
    "code": "cm",
    "name": "Cameroon",
    "capital": "Yaoundé",
    "continent": "Africa",
    "population": "28 million",
    "similarFlag": "sn",
    "funFacts": [
      "Called 'Africa in miniature'",
      "Over 200 ethnic groups",
      "Mt Cameroon is highest in Central/West Africa"
    ],
    "misspellings": [
      "cameroun",
      "camaroon"
    ]
  },
  {
    "code": "cf",
    "name": "Central African Republic",
    "capital": "Bangui",
    "continent": "Africa",
    "population": "5.5 million",
    "similarFlag": "td",
    "funFacts": [
      "Located in the heart of Africa",
      "Rich in diamonds and gold",
      "One of the least visited countries"
    ],
    "misspellings": [
      "central african rebublic",
      "car"
    ]
  },
  {
    "code": "td",
    "name": "Chad",
    "capital": "N'Djamena",
    "continent": "Africa",
    "population": "17 million",
    "similarFlag": "ro",
    "funFacts": [
      "Flag nearly identical to Romania's",
      "Lake Chad shrank 90% since the 1960s",
      "Named after Lake Chad"
    ],
    "misspellings": [
      "tchad"
    ]
  },
  {
    "code": "km",
    "name": "Comoros",
    "capital": "Moroni",
    "continent": "Africa",
    "population": "900,000",
    "similarFlag": "dj",
    "funFacts": [
      "Island nation in the Indian Ocean",
      "World's largest producer of ylang-ylang",
      "Has had over 20 coups since independence"
    ],
    "misspellings": [
      "comores",
      "comorros"
    ]
  },
  {
    "code": "cg",
    "name": "Republic of the Congo",
    "capital": "Brazzaville",
    "continent": "Africa",
    "population": "6 million",
    "similarFlag": "cd",
    "funFacts": [
      "Sometimes called Congo-Brazzaville",
      "Sits on the equator",
      "Was first Marxist-Leninist state in Africa"
    ],
    "misspellings": [
      "congo",
      "congo brazzaville"
    ]
  },
  {
    "code": "cd",
    "name": "Democratic Republic of the Congo",
    "capital": "Kinshasa",
    "continent": "Africa",
    "population": "102 million",
    "similarFlag": "cg",
    "funFacts": [
      "2nd largest country in Africa",
      "Congo River is the deepest in the world",
      "Kinshasa and Brazzaville are closest national capitals"
    ],
    "misspellings": [
      "dr congo",
      "drc",
      "congo kinshasa"
    ]
  },
  {
    "code": "ci",
    "name": "Ivory Coast",
    "capital": "Yamoussoukro",
    "continent": "Africa",
    "population": "28 million",
    "similarFlag": "ie",
    "funFacts": [
      "World's largest cocoa bean producer",
      "Flag looks like Ireland's reversed",
      "Official name is Côte d'Ivoire"
    ],
    "misspellings": [
      "ivory cost",
      "cote divoire",
      "cote d'ivoire"
    ]
  },
  {
    "code": "dj",
    "name": "Djibouti",
    "capital": "Djibouti",
    "continent": "Africa",
    "population": "1 million",
    "similarFlag": "km",
    "funFacts": [
      "One of the smallest countries in Africa",
      "Home to Lake Assal, Africa's lowest point",
      "Strategically located near the Red Sea"
    ],
    "misspellings": [
      "djibuti",
      "djibutee"
    ]
  },
  {
    "code": "eg",
    "name": "Egypt",
    "capital": "Cairo",
    "continent": "Africa",
    "population": "104 million",
    "similarFlag": "iq",
    "funFacts": [
      "Great Pyramid is only surviving Ancient Wonder",
      "Has the Nile, the longest river",
      "Ancient Egyptians invented toothpaste"
    ],
    "misspellings": [
      "egipt",
      "eygpt"
    ]
  },
  {
    "code": "gq",
    "name": "Equatorial Guinea",
    "capital": "Malabo",
    "continent": "Africa",
    "population": "1.7 million",
    "similarFlag": "gn",
    "funFacts": [
      "Only African country with Spanish as official language",
      "One of the wealthiest per capita in Africa",
      "Located on the Gulf of Guinea"
    ],
    "misspellings": [
      "equitorial guinea",
      "equatorial guniea"
    ]
  },
  {
    "code": "er",
    "name": "Eritrea",
    "capital": "Asmara",
    "continent": "Africa",
    "population": "3.6 million",
    "similarFlag": "et",
    "funFacts": [
      "Located on the Red Sea coast",
      "Capital Asmara has remarkable Art Deco architecture",
      "One of the youngest countries in Africa"
    ],
    "misspellings": [
      "eritria",
      "eretrea"
    ]
  },
  {
    "code": "sz",
    "name": "Eswatini",
    "capital": "Mbabane",
    "continent": "Africa",
    "population": "1.2 million",
    "similarFlag": "za",
    "funFacts": [
      "Formerly known as Swaziland",
      "One of the last absolute monarchies",
      "One of the smallest countries in Africa"
    ],
    "misspellings": [
      "swaziland",
      "eswatine"
    ]
  },
  {
    "code": "et",
    "name": "Ethiopia",
    "capital": "Addis Ababa",
    "continent": "Africa",
    "population": "123 million",
    "similarFlag": "bo",
    "funFacts": [
      "Never colonized by a European power",
      "Calendar is 7-8 years behind the Gregorian",
      "Coffee was first discovered here"
    ],
    "misspellings": [
      "ethopia",
      "etheopia"
    ]
  },
  {
    "code": "ga",
    "name": "Gabon",
    "capital": "Libreville",
    "continent": "Africa",
    "population": "2.4 million",
    "similarFlag": "sl",
    "funFacts": [
      "About 85% of the country is covered in rainforest",
      "One of the most urbanized countries in Africa",
      "Major oil producer"
    ],
    "misspellings": [
      "gaboon",
      "gabone"
    ]
  },
  {
    "code": "gm",
    "name": "Gambia",
    "capital": "Banjul",
    "continent": "Africa",
    "population": "2.5 million",
    "similarFlag": "bo",
    "funFacts": [
      "Smallest country on mainland Africa",
      "Almost entirely surrounded by Senegal",
      "Named after the Gambia River"
    ],
    "misspellings": [
      "the gambia",
      "gambya"
    ]
  },
  {
    "code": "gh",
    "name": "Ghana",
    "capital": "Accra",
    "continent": "Africa",
    "population": "33 million",
    "similarFlag": "bf",
    "funFacts": [
      "First sub-Saharan African country to gain independence",
      "Lake Volta is one of world's largest artificial lakes",
      "One of the world's top gold producers"
    ],
    "misspellings": [
      "gana"
    ]
  },
  {
    "code": "gn",
    "name": "Guinea",
    "capital": "Conakry",
    "continent": "Africa",
    "population": "14 million",
    "similarFlag": "ml",
    "funFacts": [
      "Rich in bauxite, the ore used to make aluminum",
      "Has diverse geography from coast to highlands",
      "Not to be confused with Guinea-Bissau or Equatorial Guinea"
    ],
    "misspellings": [
      "ginea",
      "guniea"
    ]
  },
  {
    "code": "gw",
    "name": "Guinea-Bissau",
    "capital": "Bissau",
    "continent": "Africa",
    "population": "2 million",
    "similarFlag": "gn",
    "funFacts": [
      "One of the first Portuguese colonies in Africa",
      "Bijagós Archipelago is a UNESCO Biosphere Reserve",
      "Cashew nuts are a major export"
    ],
    "misspellings": [
      "guinea bisau",
      "guinea bissao"
    ]
  },
  {
    "code": "ke",
    "name": "Kenya",
    "capital": "Nairobi",
    "continent": "Africa",
    "population": "54 million",
    "similarFlag": "ss",
    "funFacts": [
      "Named after Mount Kenya",
      "Great Rift Valley runs through it",
      "Famous for long-distance runners"
    ],
    "misspellings": [
      "kenia"
    ]
  },
  {
    "code": "ls",
    "name": "Lesotho",
    "capital": "Maseru",
    "continent": "Africa",
    "population": "2.3 million",
    "similarFlag": "za",
    "funFacts": [
      "Entirely surrounded by South Africa",
      "Lowest point is higher than any other country's",
      "Known as the 'Kingdom in the Sky'"
    ],
    "misspellings": [
      "lesoto",
      "lesothoo"
    ]
  },
  {
    "code": "lr",
    "name": "Liberia",
    "capital": "Monrovia",
    "continent": "Africa",
    "population": "5.3 million",
    "similarFlag": "my",
    "funFacts": [
      "Founded by freed American slaves",
      "Flag modeled after the US flag",
      "Capital named after US President James Monroe"
    ],
    "misspellings": [
      "liberia"
    ]
  },
  {
    "code": "ly",
    "name": "Libya",
    "capital": "Tripoli",
    "continent": "Africa",
    "population": "7 million",
    "similarFlag": "eg",
    "funFacts": [
      "Largest proven oil reserves in Africa",
      "About 90% is desert",
      "One of the sunniest places on Earth"
    ],
    "misspellings": [
      "libia",
      "lybia"
    ]
  },
  {
    "code": "mg",
    "name": "Madagascar",
    "capital": "Antananarivo",
    "continent": "Africa",
    "population": "29 million",
    "similarFlag": "id",
    "funFacts": [
      "4th largest island in the world",
      "90% of wildlife found nowhere else",
      "Baobab trees over 1,000 years old"
    ],
    "misspellings": [
      "madagaskar"
    ]
  },
  {
    "code": "mw",
    "name": "Malawi",
    "capital": "Lilongwe",
    "continent": "Africa",
    "population": "20 million",
    "similarFlag": "ke",
    "funFacts": [
      "Called the 'Warm Heart of Africa'",
      "Lake Malawi has more fish species than any lake",
      "One of the most densely populated in Africa"
    ],
    "misspellings": [
      "malawee",
      "malawii"
    ]
  },
  {
    "code": "ml",
    "name": "Mali",
    "capital": "Bamako",
    "continent": "Africa",
    "population": "22 million",
    "similarFlag": "gn",
    "funFacts": [
      "Timbuktu, a great ancient city, is in Mali",
      "Center of three great West African empires",
      "Great Mosque of Djenné is largest mud-brick building"
    ],
    "misspellings": [
      "malee",
      "malie"
    ]
  },
  {
    "code": "mr",
    "name": "Mauritania",
    "capital": "Nouakchott",
    "continent": "Africa",
    "population": "4.8 million",
    "similarFlag": "sa",
    "funFacts": [
      "Bridge between North Africa and sub-Saharan Africa",
      "Mostly covered by the Sahara Desert",
      "The Eye of Africa is located here"
    ],
    "misspellings": [
      "mauritanea",
      "mouritania"
    ]
  },
  {
    "code": "mu",
    "name": "Mauritius",
    "capital": "Port Louis",
    "continent": "Africa",
    "population": "1.3 million",
    "similarFlag": "bg",
    "funFacts": [
      "Island nation in the Indian Ocean",
      "Home of the now-extinct dodo bird",
      "One of the most densely populated countries"
    ],
    "misspellings": [
      "mauritious",
      "mauritius"
    ]
  },
  {
    "code": "ma",
    "name": "Morocco",
    "capital": "Rabat",
    "continent": "Africa",
    "population": "37 million",
    "similarFlag": "vn",
    "funFacts": [
      "Coastline on both Atlantic and Mediterranean",
      "University of al-Qarawiyyin is world's oldest",
      "World's largest phosphate exporter"
    ],
    "misspellings": [
      "morroco",
      "morrocco"
    ]
  },
  {
    "code": "mz",
    "name": "Mozambique",
    "capital": "Maputo",
    "continent": "Africa",
    "population": "32 million",
    "similarFlag": "ao",
    "funFacts": [
      "Flag features an AK-47 rifle",
      "3rd longest coastline in Africa",
      "Home to the Bazaruto Archipelago"
    ],
    "misspellings": [
      "mozambigue",
      "mosambique"
    ]
  },
  {
    "code": "na",
    "name": "Namibia",
    "capital": "Windhoek",
    "continent": "Africa",
    "population": "2.6 million",
    "similarFlag": "tz",
    "funFacts": [
      "World's oldest desert, the Namib",
      "First country to put environmental protection in constitution",
      "Fish River Canyon is 2nd largest canyon"
    ],
    "misspellings": [
      "namibya"
    ]
  },
  {
    "code": "ne",
    "name": "Niger",
    "capital": "Niamey",
    "continent": "Africa",
    "population": "26 million",
    "similarFlag": "in",
    "funFacts": [
      "Named after the Niger River",
      "One of the hottest countries in the world",
      "Sahara Desert covers much of the country"
    ],
    "misspellings": [
      "nijer",
      "nigger"
    ]
  },
  {
    "code": "ng",
    "name": "Nigeria",
    "capital": "Abuja",
    "continent": "Africa",
    "population": "223 million",
    "similarFlag": "dz",
    "funFacts": [
      "Most populous country in Africa",
      "Nollywood is 2nd largest film industry",
      "Over 500 spoken languages"
    ],
    "misspellings": [
      "nigera",
      "nigeira"
    ]
  },
  {
    "code": "rw",
    "name": "Rwanda",
    "capital": "Kigali",
    "continent": "Africa",
    "population": "14 million",
    "similarFlag": "gn",
    "funFacts": [
      "Known as the 'Land of a Thousand Hills'",
      "Highest percentage of women in parliament",
      "Banned single-use plastic bags in 2008"
    ],
    "misspellings": [
      "ruanda",
      "rawanda"
    ]
  },
  {
    "code": "st",
    "name": "São Tomé and Príncipe",
    "capital": "São Tomé",
    "continent": "Africa",
    "population": "230,000",
    "similarFlag": "et",
    "funFacts": [
      "Smallest Portuguese-speaking country",
      "Located on the equator in the Gulf of Guinea",
      "Second-smallest African country"
    ],
    "misspellings": [
      "sao tome",
      "sao tome and principe"
    ]
  },
  {
    "code": "sn",
    "name": "Senegal",
    "capital": "Dakar",
    "continent": "Africa",
    "population": "17 million",
    "similarFlag": "cm",
    "funFacts": [
      "Known for its vibrant music scene",
      "Dakar Rally was named after its capital",
      "Lake Retba turns pink due to algae"
    ],
    "misspellings": [
      "sengal",
      "senagal"
    ]
  },
  {
    "code": "sc",
    "name": "Seychelles",
    "capital": "Victoria",
    "continent": "Africa",
    "population": "100,000",
    "similarFlag": "mu",
    "funFacts": [
      "Smallest African country by population",
      "Has the most unique flag with 5 colors",
      "Aldabra Atoll is a UNESCO World Heritage Site"
    ],
    "misspellings": [
      "seychells",
      "sechelles"
    ]
  },
  {
    "code": "sl",
    "name": "Sierra Leone",
    "capital": "Freetown",
    "continent": "Africa",
    "population": "8.6 million",
    "similarFlag": "ga",
    "funFacts": [
      "Name means 'Lion Mountains'",
      "Capital founded for freed slaves",
      "Has beautiful beaches along the coast"
    ],
    "misspellings": [
      "siera leone",
      "sierra leon"
    ]
  },
  {
    "code": "so",
    "name": "Somalia",
    "capital": "Mogadishu",
    "continent": "Africa",
    "population": "18 million",
    "similarFlag": "dj",
    "funFacts": [
      "Has the longest coastline in Africa",
      "Frankincense and myrrh have been traded for millennia",
      "Camel milk is a dietary staple"
    ],
    "misspellings": [
      "somali",
      "somalya"
    ]
  },
  {
    "code": "za",
    "name": "South Africa",
    "capital": "Pretoria",
    "continent": "Africa",
    "population": "60 million",
    "similarFlag": "ke",
    "funFacts": [
      "Three capital cities: Pretoria, Cape Town, and Bloemfontein",
      "11 official languages",
      "Table Mountain is one of the oldest mountains"
    ],
    "misspellings": [
      "south afrika"
    ]
  },
  {
    "code": "ss",
    "name": "South Sudan",
    "capital": "Juba",
    "continent": "Africa",
    "population": "11 million",
    "similarFlag": "ke",
    "funFacts": [
      "Youngest country in the world (2011)",
      "Rich in oil reserves",
      "Has one of the largest animal migrations"
    ],
    "misspellings": [
      "south soudan",
      "s sudan"
    ]
  },
  {
    "code": "sd",
    "name": "Sudan",
    "capital": "Khartoum",
    "continent": "Africa",
    "population": "47 million",
    "similarFlag": "eg",
    "funFacts": [
      "Where the Blue and White Nile meet",
      "Has more pyramids than Egypt",
      "3rd largest country in Africa"
    ],
    "misspellings": [
      "soudan"
    ]
  },
  {
    "code": "tz",
    "name": "Tanzania",
    "capital": "Dodoma",
    "continent": "Africa",
    "population": "65 million",
    "similarFlag": "na",
    "funFacts": [
      "Mt Kilimanjaro, Africa's tallest mountain",
      "Serengeti hosts the largest animal migration",
      "Zanzibar is a semi-autonomous part"
    ],
    "misspellings": [
      "tanzanya"
    ]
  },
  {
    "code": "tg",
    "name": "Togo",
    "capital": "Lomé",
    "continent": "Africa",
    "population": "8.8 million",
    "similarFlag": "lr",
    "funFacts": [
      "One of the smallest countries in Africa",
      "Known for its palm-lined beaches",
      "Lomé is on the Gulf of Guinea"
    ],
    "misspellings": [
      "toggo",
      "togo"
    ]
  },
  {
    "code": "tn",
    "name": "Tunisia",
    "capital": "Tunis",
    "continent": "Africa",
    "population": "12 million",
    "similarFlag": "tr",
    "funFacts": [
      "Northernmost country in Africa",
      "Home to ancient Carthage ruins",
      "Star Wars was filmed in the Tunisian desert"
    ],
    "misspellings": [
      "tunisa",
      "tunesia"
    ]
  },
  {
    "code": "ug",
    "name": "Uganda",
    "capital": "Kampala",
    "continent": "Africa",
    "population": "47 million",
    "similarFlag": "ke",
    "funFacts": [
      "Called the 'Pearl of Africa'",
      "Lake Victoria, world's largest tropical lake",
      "Source of the Nile is in Uganda"
    ],
    "misspellings": [
      "ugonda"
    ]
  },
  {
    "code": "zm",
    "name": "Zambia",
    "capital": "Lusaka",
    "continent": "Africa",
    "population": "20 million",
    "similarFlag": "zw",
    "funFacts": [
      "Victoria Falls is on Zambia's border",
      "One of the most urbanized in sub-Saharan Africa",
      "Copper mining is a major industry"
    ],
    "misspellings": [
      "zambi",
      "zambiya"
    ]
  },
  {
    "code": "zw",
    "name": "Zimbabwe",
    "capital": "Harare",
    "continent": "Africa",
    "population": "16 million",
    "similarFlag": "mz",
    "funFacts": [
      "Victoria Falls: one of Seven Natural Wonders",
      "Great Zimbabwe ruins date to the 11th century",
      "Named after ancient stone ruins"
    ],
    "misspellings": [
      "zimbabwee",
      "zimbobwe"
    ]
  },
  {
    "code": "af",
    "name": "Afghanistan",
    "capital": "Kabul",
    "continent": "Asia",
    "population": "41 million",
    "similarFlag": "ae",
    "funFacts": [
      "Known as the 'Graveyard of Empires'",
      "Leading producer of pomegranates",
      "National sport involves horseback riding"
    ],
    "misspellings": [
      "afganistan"
    ]
  },
  {
    "code": "bh",
    "name": "Bahrain",
    "capital": "Manama",
    "continent": "Asia",
    "population": "1.5 million",
    "similarFlag": "qa",
    "funFacts": [
      "Smallest Arab country",
      "Island nation in the Persian Gulf",
      "Formula 1 Grand Prix is held here"
    ],
    "misspellings": [
      "bahrian",
      "baharain"
    ]
  },
  {
    "code": "bd",
    "name": "Bangladesh",
    "capital": "Dhaka",
    "continent": "Asia",
    "population": "170 million",
    "similarFlag": "jp",
    "funFacts": [
      "Longest natural beach: Cox's Bazar",
      "Most densely populated large country",
      "Largest mangrove forest: Sundarbans"
    ],
    "misspellings": [
      "bangladash",
      "bangledesh"
    ]
  },
  {
    "code": "bt",
    "name": "Bhutan",
    "capital": "Thimphu",
    "continent": "Asia",
    "population": "780,000",
    "similarFlag": "np",
    "funFacts": [
      "Measures Gross National Happiness instead of GDP",
      "Only carbon-negative country in the world",
      "TV was not allowed until 1999"
    ],
    "misspellings": [
      "butan",
      "bhutaan"
    ]
  },
  {
    "code": "bn",
    "name": "Brunei",
    "capital": "Bandar Seri Begawan",
    "continent": "Asia",
    "population": "450,000",
    "similarFlag": "my",
    "funFacts": [
      "One of the wealthiest countries per capita",
      "Oil and gas make up 90% of exports",
      "Sultan's palace is the world's largest residential palace"
    ],
    "misspellings": [
      "brunai",
      "brunel"
    ]
  },
  {
    "code": "kh",
    "name": "Cambodia",
    "capital": "Phnom Penh",
    "continent": "Asia",
    "population": "17 million",
    "similarFlag": "th",
    "funFacts": [
      "Angkor Wat is the largest religious monument",
      "The flag features a building — very rare",
      "Tonlé Sap is Southeast Asia's largest lake"
    ],
    "misspellings": [
      "cambodja",
      "cambodi"
    ]
  },
  {
    "code": "cn",
    "name": "China",
    "capital": "Beijing",
    "continent": "Asia",
    "population": "1.4 billion",
    "similarFlag": "vn",
    "funFacts": [
      "Great Wall is over 13,000 miles long",
      "Invented paper, gunpowder, compass, and printing",
      "Most spoken language by native speakers"
    ],
    "misspellings": [
      "chine"
    ]
  },
  {
    "code": "in",
    "name": "India",
    "capital": "New Delhi",
    "continent": "Asia",
    "population": "1.4 billion",
    "similarFlag": "ne",
    "funFacts": [
      "World's most populous country",
      "Most post offices of any country",
      "Chess was invented here"
    ],
    "misspellings": [
      "indea"
    ]
  },
  {
    "code": "id",
    "name": "Indonesia",
    "capital": "Jakarta",
    "continent": "Asia",
    "population": "275 million",
    "similarFlag": "pl",
    "funFacts": [
      "Over 17,000 islands",
      "World's largest island country",
      "Komodo dragons only found here"
    ],
    "misspellings": [
      "indonesya",
      "indonezia"
    ]
  },
  {
    "code": "ir",
    "name": "Iran",
    "capital": "Tehran",
    "continent": "Asia",
    "population": "87 million",
    "similarFlag": "hu",
    "funFacts": [
      "One of the world's oldest civilizations",
      "Persian carpets are world famous",
      "4th largest oil reserves"
    ],
    "misspellings": [
      "iraan"
    ]
  },
  {
    "code": "iq",
    "name": "Iraq",
    "capital": "Baghdad",
    "continent": "Asia",
    "population": "43 million",
    "similarFlag": "eg",
    "funFacts": [
      "Often called the 'Cradle of Civilization'",
      "Ancient city of Babylon is in Iraq",
      "Marshes believed to be the Garden of Eden"
    ],
    "misspellings": [
      "irak"
    ]
  },
  {
    "code": "il",
    "name": "Israel",
    "capital": "Jerusalem",
    "continent": "Asia",
    "population": "9.5 million",
    "similarFlag": "gr",
    "funFacts": [
      "Dead Sea is the lowest point on Earth",
      "Most museums per capita",
      "Hebrew was revived after centuries"
    ],
    "misspellings": [
      "isreal",
      "israil"
    ]
  },
  {
    "code": "ps",
    "name": "Palestine",
    "capital": "Ramallah",
    "continent": "Asia",
    "population": "5.4 million",
    "similarFlag": "jo",
    "funFacts": [
      "Home to some of the oldest cities in the world, including Jericho",
      "The Dead Sea, the lowest point on Earth, borders Palestine",
      "Rich in olive trees — the olive branch is a symbol of peace"
    ],
    "misspellings": [
      "palestin",
      "palastine",
      "palistine"
    ]
  },
  {
    "code": "jp",
    "name": "Japan",
    "capital": "Tokyo",
    "continent": "Asia",
    "population": "125 million",
    "similarFlag": "bd",
    "funFacts": [
      "More than 6,800 islands",
      "World's oldest company, founded 578 AD",
      "Vending machines sell everything"
    ],
    "misspellings": [
      "japon"
    ]
  },
  {
    "code": "jo",
    "name": "Jordan",
    "capital": "Amman",
    "continent": "Asia",
    "population": "11 million",
    "similarFlag": "ps",
    "funFacts": [
      "Petra is one of the New 7 Wonders",
      "Dead Sea is shared with Israel",
      "Over 100,000 archaeological sites"
    ],
    "misspellings": [
      "jordon",
      "jordaan"
    ]
  },
  {
    "code": "kz",
    "name": "Kazakhstan",
    "capital": "Astana",
    "continent": "Asia",
    "population": "19 million",
    "similarFlag": "ua",
    "funFacts": [
      "Largest landlocked country in the world",
      "First human launched into space from here",
      "Apples believed to have originated here"
    ],
    "misspellings": [
      "kazakstan",
      "kazakhistan"
    ]
  },
  {
    "code": "kw",
    "name": "Kuwait",
    "capital": "Kuwait City",
    "continent": "Asia",
    "population": "4.3 million",
    "similarFlag": "ae",
    "funFacts": [
      "About 10% of the world's oil reserves",
      "No natural lakes or rivers",
      "First Gulf state with an elected parliament"
    ],
    "misspellings": [
      "kuait",
      "kuweit"
    ]
  },
  {
    "code": "kg",
    "name": "Kyrgyzstan",
    "capital": "Bishkek",
    "continent": "Asia",
    "population": "7 million",
    "similarFlag": "kz",
    "funFacts": [
      "Over 80% of the country is mountains",
      "The epic of Manas is one of the longest poems",
      "Issyk-Kul is one of the largest alpine lakes"
    ],
    "misspellings": [
      "kyrgizstan",
      "kirgizstan"
    ]
  },
  {
    "code": "la",
    "name": "Laos",
    "capital": "Vientiane",
    "continent": "Asia",
    "population": "7.5 million",
    "similarFlag": "th",
    "funFacts": [
      "Only landlocked country in Southeast Asia",
      "Most heavily bombed country per capita in history",
      "Mekong River forms much of the border"
    ],
    "misspellings": [
      "loas",
      "laoes"
    ]
  },
  {
    "code": "lb",
    "name": "Lebanon",
    "capital": "Beirut",
    "continent": "Asia",
    "population": "5.5 million",
    "similarFlag": "at",
    "funFacts": [
      "Flag features a cedar tree",
      "One of the oldest cities in the world: Byblos",
      "Smallest country in continental Asia"
    ],
    "misspellings": [
      "lebonon",
      "lebannon"
    ]
  },
  {
    "code": "my",
    "name": "Malaysia",
    "capital": "Kuala Lumpur",
    "continent": "Asia",
    "population": "33 million",
    "similarFlag": "us",
    "funFacts": [
      "Oldest tropical rainforest in the world",
      "Petronas Towers were once the tallest buildings",
      "One of the most biodiverse ecosystems"
    ],
    "misspellings": [
      "malasia"
    ]
  },
  {
    "code": "mv",
    "name": "Maldives",
    "capital": "Malé",
    "continent": "Asia",
    "population": "520,000",
    "similarFlag": "pk",
    "funFacts": [
      "Flattest country in the world",
      "Made up of about 1,200 coral islands",
      "Could be underwater by 2100 due to rising seas"
    ],
    "misspellings": [
      "maldivs",
      "maldeves"
    ]
  },
  {
    "code": "mn",
    "name": "Mongolia",
    "capital": "Ulaanbaatar",
    "continent": "Asia",
    "population": "3.4 million",
    "similarFlag": "kz",
    "funFacts": [
      "Most sparsely populated country",
      "Mongol Empire was largest contiguous land empire",
      "About 30% of people are still nomadic"
    ],
    "misspellings": [
      "mongolia"
    ]
  },
  {
    "code": "mm",
    "name": "Myanmar",
    "capital": "Naypyidaw",
    "continent": "Asia",
    "population": "54 million",
    "similarFlag": "lt",
    "funFacts": [
      "Formerly known as Burma",
      "Has the largest book in the world on marble slabs",
      "Largest country in mainland Southeast Asia"
    ],
    "misspellings": [
      "burma",
      "mianmar"
    ]
  },
  {
    "code": "np",
    "name": "Nepal",
    "capital": "Kathmandu",
    "continent": "Asia",
    "population": "30 million",
    "similarFlag": "in",
    "funFacts": [
      "Only non-rectangular national flag",
      "Mount Everest, world's tallest mountain",
      "8 of the world's 14 highest peaks"
    ],
    "misspellings": [
      "napal"
    ]
  },
  {
    "code": "kp",
    "name": "North Korea",
    "capital": "Pyongyang",
    "continent": "Asia",
    "population": "26 million",
    "similarFlag": "cu",
    "funFacts": [
      "Has its own calendar based on Kim Il Sung's birth year",
      "DMZ is one of the most militarized borders",
      "World's largest stadium: May Day Stadium"
    ],
    "misspellings": [
      "north corea"
    ]
  },
  {
    "code": "om",
    "name": "Oman",
    "capital": "Muscat",
    "continent": "Asia",
    "population": "4.5 million",
    "similarFlag": "ae",
    "funFacts": [
      "One of the oldest independent states in the Arab world",
      "Frankincense has been traded here for thousands of years",
      "Has the world's largest collection of frankincense trees"
    ],
    "misspellings": [
      "omen",
      "omaan"
    ]
  },
  {
    "code": "pk",
    "name": "Pakistan",
    "capital": "Islamabad",
    "continent": "Asia",
    "population": "231 million",
    "similarFlag": "tr",
    "funFacts": [
      "2nd largest salt mine in the world",
      "K2, world's 2nd highest mountain",
      "National sport is field hockey"
    ],
    "misspellings": [
      "pakstan"
    ]
  },
  {
    "code": "ph",
    "name": "Philippines",
    "capital": "Manila",
    "continent": "Asia",
    "population": "115 million",
    "similarFlag": "cz",
    "funFacts": [
      "7,641 islands",
      "Named after King Philip II of Spain",
      "Over 175 spoken languages"
    ],
    "misspellings": [
      "philipines",
      "phillipines",
      "filipines"
    ]
  },
  {
    "code": "qa",
    "name": "Qatar",
    "capital": "Doha",
    "continent": "Asia",
    "population": "2.9 million",
    "similarFlag": "bh",
    "funFacts": [
      "Highest GDP per capita in the world",
      "Hosted 2022 FIFA World Cup",
      "One of the driest countries on Earth"
    ],
    "misspellings": [
      "quatar",
      "katar"
    ]
  },
  {
    "code": "sa",
    "name": "Saudi Arabia",
    "capital": "Riyadh",
    "continent": "Asia",
    "population": "36 million",
    "similarFlag": "pk",
    "funFacts": [
      "No rivers or permanent lakes",
      "Largest country without a river",
      "World's largest sand desert"
    ],
    "misspellings": [
      "saudi araba",
      "saudia arabia"
    ]
  },
  {
    "code": "sg",
    "name": "Singapore",
    "capital": "Singapore",
    "continent": "Asia",
    "population": "5.9 million",
    "similarFlag": "id",
    "funFacts": [
      "Both a city and a country",
      "Chewing gum is banned",
      "One of the busiest ports worldwide"
    ],
    "misspellings": [
      "singapour",
      "singapur"
    ]
  },
  {
    "code": "kr",
    "name": "South Korea",
    "capital": "Seoul",
    "continent": "Asia",
    "population": "52 million",
    "similarFlag": "jp",
    "funFacts": [
      "Fastest internet speeds in the world",
      "K-pop is popular worldwide",
      "Most golf courses in Asia"
    ],
    "misspellings": [
      "south corea"
    ]
  },
  {
    "code": "lk",
    "name": "Sri Lanka",
    "capital": "Sri Jayawardenepura Kotte",
    "continent": "Asia",
    "population": "22 million",
    "similarFlag": "in",
    "funFacts": [
      "Called the 'Pearl of the Indian Ocean'",
      "Produces some of the finest tea",
      "Highest biodiversity density in Asia"
    ],
    "misspellings": [
      "sri lanca",
      "srilanka"
    ]
  },
  {
    "code": "sy",
    "name": "Syria",
    "capital": "Damascus",
    "continent": "Asia",
    "population": "22 million",
    "similarFlag": "iq",
    "funFacts": [
      "Damascus is one of the oldest continuously inhabited cities",
      "Home to many ancient Roman ruins",
      "Aleppo soap has been made for over 1,000 years"
    ],
    "misspellings": [
      "siria"
    ]
  },
  {
    "code": "tj",
    "name": "Tajikistan",
    "capital": "Dushanbe",
    "continent": "Asia",
    "population": "10 million",
    "similarFlag": "ir",
    "funFacts": [
      "Over 90% of the country is mountains",
      "Has one of the tallest dams in the world",
      "Shares the Pamir Highway, one of the highest roads"
    ],
    "misspellings": [
      "tajikstan",
      "tadjikistan"
    ]
  },
  {
    "code": "th",
    "name": "Thailand",
    "capital": "Bangkok",
    "continent": "Asia",
    "population": "72 million",
    "similarFlag": "cr",
    "funFacts": [
      "Means 'Land of the Free'",
      "Only Southeast Asian country never colonized",
      "World's largest rice exporter"
    ],
    "misspellings": [
      "tailand",
      "thiland"
    ]
  },
  {
    "code": "tw",
    "name": "Taiwan",
    "capital": "Taipei",
    "continent": "Asia",
    "population": "24 million",
    "similarFlag": "ws",
    "funFacts": [
      "Home to the world's tallest building from 2004 to 2010: Taipei 101",
      "Has more than 100 peaks over 3,000 meters high",
      "Night markets are a beloved part of daily culture"
    ],
    "misspellings": [
      "tiwan",
      "taiwaan"
    ]
  },
  {
    "code": "tl",
    "name": "Timor-Leste",
    "capital": "Dili",
    "continent": "Asia",
    "population": "1.3 million",
    "similarFlag": "ph",
    "funFacts": [
      "One of the youngest countries (independent 2002)",
      "Also known as East Timor",
      "First new sovereign state of the 21st century"
    ],
    "misspellings": [
      "east timor",
      "timor leste"
    ]
  },
  {
    "code": "tr",
    "name": "Turkey",
    "capital": "Ankara",
    "continent": "Asia",
    "population": "85 million",
    "similarFlag": "tn",
    "funFacts": [
      "Spans Europe and Asia",
      "Istanbul was capital of the Roman, Byzantine, and Ottoman Empires",
      "Tulips actually originated in Turkey"
    ],
    "misspellings": [
      "turkiye",
      "turky"
    ]
  },
  {
    "code": "tm",
    "name": "Turkmenistan",
    "capital": "Ashgabat",
    "continent": "Asia",
    "population": "6.3 million",
    "similarFlag": "uz",
    "funFacts": [
      "Has the Darvaza gas crater, the 'Door to Hell'",
      "Capital Ashgabat holds Guinness record for most marble",
      "One of the most closed countries in the world"
    ],
    "misspellings": [
      "turkmenestan"
    ]
  },
  {
    "code": "ae",
    "name": "United Arab Emirates",
    "capital": "Abu Dhabi",
    "continent": "Asia",
    "population": "10 million",
    "similarFlag": "kw",
    "funFacts": [
      "Burj Khalifa is the tallest building in the world",
      "No rivers in the UAE",
      "Formed in 1971 from seven emirates"
    ],
    "misspellings": [
      "uae",
      "united arab emerates"
    ]
  },
  {
    "code": "uz",
    "name": "Uzbekistan",
    "capital": "Tashkent",
    "continent": "Asia",
    "population": "35 million",
    "similarFlag": "ru",
    "funFacts": [
      "Doubly landlocked—surrounded entirely by landlocked countries",
      "Silk Road passed through Uzbekistan",
      "Samarkand is one of the oldest cities in Central Asia"
    ],
    "misspellings": [
      "uzbekestan",
      "uzbeckistan"
    ]
  },
  {
    "code": "vn",
    "name": "Vietnam",
    "capital": "Hanoi",
    "continent": "Asia",
    "population": "99 million",
    "similarFlag": "cn",
    "funFacts": [
      "World's 2nd largest coffee exporter",
      "Ha Long Bay has over 1,600 limestone islands",
      "World's largest cave: Son Doong"
    ],
    "misspellings": [
      "veitnam"
    ]
  },
  {
    "code": "ye",
    "name": "Yemen",
    "capital": "Sana'a",
    "continent": "Asia",
    "population": "34 million",
    "similarFlag": "eg",
    "funFacts": [
      "One of the oldest civilizations in the Middle East",
      "Socotra Island has plants found nowhere else",
      "Old City of Sana'a is a UNESCO World Heritage Site"
    ],
    "misspellings": [
      "yeman",
      "yemmen"
    ]
  },
  {
    "code": "al",
    "name": "Albania",
    "capital": "Tirana",
    "continent": "Europe",
    "population": "2.8 million",
    "similarFlag": "tr",
    "funFacts": [
      "More bunkers per capita than any other country",
      "Mother Teresa was of Albanian origin",
      "Beautiful Mediterranean beaches"
    ],
    "misspellings": [
      "albanea"
    ]
  },
  {
    "code": "ad",
    "name": "Andorra",
    "capital": "Andorra la Vella",
    "continent": "Europe",
    "population": "80,000",
    "similarFlag": "ro",
    "funFacts": [
      "One of the smallest countries in Europe",
      "No airport — must enter by road",
      "Highest capital city in Europe"
    ],
    "misspellings": [
      "andora",
      "andoraa"
    ]
  },
  {
    "code": "am",
    "name": "Armenia",
    "capital": "Yerevan",
    "continent": "Europe",
    "population": "3 million",
    "similarFlag": "co",
    "funFacts": [
      "First country to adopt Christianity as state religion",
      "Mount Ararat is its national symbol",
      "Home to the world's oldest leather shoe"
    ],
    "misspellings": [
      "armenia"
    ]
  },
  {
    "code": "at",
    "name": "Austria",
    "capital": "Vienna",
    "continent": "Europe",
    "population": "9 million",
    "similarFlag": "lv",
    "funFacts": [
      "Birthplace of Mozart, Schubert, and Strauss",
      "World's oldest zoo is in Vienna",
      "62% covered by the Alps"
    ],
    "misspellings": [
      "austra"
    ]
  },
  {
    "code": "az",
    "name": "Azerbaijan",
    "capital": "Baku",
    "continent": "Europe",
    "population": "10 million",
    "similarFlag": "tr",
    "funFacts": [
      "Called the 'Land of Fire'",
      "Mud volcanoes are common here",
      "Baku hosted the first ever Formula 1 street race"
    ],
    "misspellings": [
      "azerbajan",
      "azerbeijan"
    ]
  },
  {
    "code": "by",
    "name": "Belarus",
    "capital": "Minsk",
    "continent": "Europe",
    "population": "9.4 million",
    "similarFlag": "mg",
    "funFacts": [
      "Means 'White Russia'",
      "Over 40% covered in forests",
      "Two official languages: Belarusian and Russian"
    ],
    "misspellings": [
      "bellarus",
      "belarous"
    ]
  },
  {
    "code": "be",
    "name": "Belgium",
    "capital": "Brussels",
    "continent": "Europe",
    "population": "11.5 million",
    "similarFlag": "de",
    "funFacts": [
      "Famous for chocolate, waffles, and beer",
      "De facto capital of the European Union",
      "Three official languages"
    ],
    "misspellings": [
      "belguim",
      "belgum"
    ]
  },
  {
    "code": "ba",
    "name": "Bosnia and Herzegovina",
    "capital": "Sarajevo",
    "continent": "Europe",
    "population": "3.2 million",
    "similarFlag": "ua",
    "funFacts": [
      "Sarajevo hosted the 1984 Winter Olympics",
      "Has the last remaining primeval forest in Europe",
      "Unique three-member presidency"
    ],
    "misspellings": [
      "bosnia",
      "bosnia herzegovina"
    ]
  },
  {
    "code": "bg",
    "name": "Bulgaria",
    "capital": "Sofia",
    "continent": "Europe",
    "population": "6.5 million",
    "similarFlag": "hu",
    "funFacts": [
      "Oldest country in Europe that hasn't changed its name",
      "Nod means 'no' and shake head means 'yes'",
      "Rose oil used in 85% of world's perfumes"
    ],
    "misspellings": [
      "bulgeria"
    ]
  },
  {
    "code": "hr",
    "name": "Croatia",
    "capital": "Zagreb",
    "continent": "Europe",
    "population": "3.9 million",
    "similarFlag": "nl",
    "funFacts": [
      "Necktie was invented here",
      "Over 1,000 islands",
      "Dubrovnik: Game of Thrones filming location"
    ],
    "misspellings": [
      "croacia",
      "kroatia"
    ]
  },
  {
    "code": "cy",
    "name": "Cyprus",
    "capital": "Nicosia",
    "continent": "Europe",
    "population": "1.2 million",
    "similarFlag": "mt",
    "funFacts": [
      "Third largest island in the Mediterranean",
      "Birthplace of Aphrodite in Greek mythology",
      "Only divided capital in the world"
    ],
    "misspellings": [
      "cypris",
      "ciprus"
    ]
  },
  {
    "code": "cz",
    "name": "Czech Republic",
    "capital": "Prague",
    "continent": "Europe",
    "population": "10.5 million",
    "similarFlag": "ph",
    "funFacts": [
      "Highest beer consumption per capita",
      "Prague Castle is the largest ancient castle",
      "Also known as Czechia since 2016"
    ],
    "misspellings": [
      "chech republic",
      "czechia"
    ]
  },
  {
    "code": "dk",
    "name": "Denmark",
    "capital": "Copenhagen",
    "continent": "Europe",
    "population": "5.9 million",
    "similarFlag": "no",
    "funFacts": [
      "LEGO was invented here",
      "Oldest monarchy in Europe",
      "Danish flag is the oldest continuously used flag"
    ],
    "misspellings": [
      "danemark"
    ]
  },
  {
    "code": "ee",
    "name": "Estonia",
    "capital": "Tallinn",
    "continent": "Europe",
    "population": "1.3 million",
    "similarFlag": "bw",
    "funFacts": [
      "One of the most digitally advanced countries",
      "Skype was created here",
      "Has more than 1,500 islands"
    ],
    "misspellings": [
      "esthonia"
    ]
  },
  {
    "code": "fi",
    "name": "Finland",
    "capital": "Helsinki",
    "continent": "Europe",
    "population": "5.5 million",
    "similarFlag": "se",
    "funFacts": [
      "More saunas than cars",
      "188,000 lakes",
      "Santa officially lives in Rovaniemi, Finland"
    ],
    "misspellings": [
      "finnland"
    ]
  },
  {
    "code": "fr",
    "name": "France",
    "capital": "Paris",
    "continent": "Europe",
    "population": "68 million",
    "similarFlag": "nl",
    "funFacts": [
      "Most visited country in the world",
      "Eiffel Tower was meant to be temporary",
      "Has the most time zones of any country (12)"
    ],
    "misspellings": [
      "fance"
    ]
  },
  {
    "code": "ge",
    "name": "Georgia",
    "capital": "Tbilisi",
    "continent": "Europe",
    "population": "3.7 million",
    "similarFlag": "ch",
    "funFacts": [
      "Claims to be the birthplace of wine",
      "Has its own unique alphabet",
      "One of the oldest countries in the world"
    ],
    "misspellings": [
      "gorgia",
      "georgia"
    ]
  },
  {
    "code": "de",
    "name": "Germany",
    "capital": "Berlin",
    "continent": "Europe",
    "population": "84 million",
    "similarFlag": "be",
    "funFacts": [
      "Over 1,500 different types of beer",
      "Oktoberfest is the world's largest folk festival",
      "First printed book was produced here"
    ],
    "misspellings": [
      "germeny",
      "jermany"
    ]
  },
  {
    "code": "gr",
    "name": "Greece",
    "capital": "Athens",
    "continent": "Europe",
    "population": "10.4 million",
    "similarFlag": "uy",
    "funFacts": [
      "Birthplace of democracy and the Olympic Games",
      "Over 6,000 islands",
      "Greek alphabet is one of oldest still in use"
    ],
    "misspellings": [
      "greec",
      "grece"
    ]
  },
  {
    "code": "hu",
    "name": "Hungary",
    "capital": "Budapest",
    "continent": "Europe",
    "population": "9.7 million",
    "similarFlag": "bg",
    "funFacts": [
      "Invented the Rubik's Cube",
      "Lake Balaton is largest lake in Central Europe",
      "World's largest thermal water cave system"
    ],
    "misspellings": [
      "hungery",
      "hungury"
    ]
  },
  {
    "code": "is",
    "name": "Iceland",
    "capital": "Reykjavik",
    "continent": "Europe",
    "population": "380,000",
    "similarFlag": "no",
    "funFacts": [
      "No army, navy, or air force",
      "Runs almost entirely on renewable energy",
      "No mosquitoes in Iceland"
    ],
    "misspellings": [
      "iecland"
    ]
  },
  {
    "code": "ie",
    "name": "Ireland",
    "capital": "Dublin",
    "continent": "Europe",
    "population": "5 million",
    "similarFlag": "ci",
    "funFacts": [
      "Halloween originated here",
      "No snakes, thanks to Saint Patrick",
      "Irish harp is a national symbol"
    ],
    "misspellings": [
      "irland"
    ]
  },
  {
    "code": "it",
    "name": "Italy",
    "capital": "Rome",
    "continent": "Europe",
    "population": "59 million",
    "similarFlag": "mx",
    "funFacts": [
      "Most UNESCO World Heritage Sites",
      "Pizza and pasta originated here",
      "Oldest European university is in Bologna"
    ],
    "misspellings": [
      "itlay",
      "itali"
    ]
  },
  {
    "code": "va",
    "name": "Vatican City",
    "capital": "Vatican City",
    "continent": "Europe",
    "population": "800",
    "similarFlag": "mt",
    "funFacts": [
      "Smallest country in the world by both area and population",
      "Home to St. Peter's Basilica and the Sistine Chapel",
      "Has its own post office, radio station, and railway station"
    ],
    "misspellings": [
      "vatican",
      "the vatican",
      "holy see"
    ]
  },
  {
    "code": "lv",
    "name": "Latvia",
    "capital": "Riga",
    "continent": "Europe",
    "population": "1.8 million",
    "similarFlag": "at",
    "funFacts": [
      "One of the oldest flags in the world",
      "Riga has largest Art Nouveau collection",
      "Singing festival tradition since 1873"
    ],
    "misspellings": [
      "latviia"
    ]
  },
  {
    "code": "li",
    "name": "Liechtenstein",
    "capital": "Vaduz",
    "continent": "Europe",
    "population": "39,000",
    "similarFlag": "ht",
    "funFacts": [
      "One of only two doubly landlocked countries",
      "So small you can rent the entire country",
      "Last country in Europe to give women the vote"
    ],
    "misspellings": [
      "lichtenstein",
      "liechenstein"
    ]
  },
  {
    "code": "lt",
    "name": "Lithuania",
    "capital": "Vilnius",
    "continent": "Europe",
    "population": "2.8 million",
    "similarFlag": "mm",
    "funFacts": [
      "Last European country to adopt Christianity",
      "Basketball is essentially the national religion",
      "Hill of Crosses has over 100,000 crosses"
    ],
    "misspellings": [
      "lithuainia",
      "lituania"
    ]
  },
  {
    "code": "lu",
    "name": "Luxembourg",
    "capital": "Luxembourg City",
    "continent": "Europe",
    "population": "650,000",
    "similarFlag": "nl",
    "funFacts": [
      "One of the smallest countries in Europe",
      "Has the highest GDP per capita in the EU",
      "Has three official languages"
    ],
    "misspellings": [
      "luxemburg",
      "luxemberg"
    ]
  },
  {
    "code": "mk",
    "name": "North Macedonia",
    "capital": "Skopje",
    "continent": "Europe",
    "population": "2.1 million",
    "similarFlag": "jp",
    "funFacts": [
      "Changed its name from Macedonia in 2019",
      "Mother Teresa was born in Skopje",
      "Lake Ohrid is one of Europe's oldest lakes"
    ],
    "misspellings": [
      "macedonia",
      "north macadonia"
    ]
  },
  {
    "code": "mt",
    "name": "Malta",
    "capital": "Valletta",
    "continent": "Europe",
    "population": "530,000",
    "similarFlag": "pl",
    "funFacts": [
      "One of the most densely populated countries",
      "Megalithic temples are older than the pyramids",
      "Smallest EU member state"
    ],
    "misspellings": [
      "malt",
      "maltaa"
    ]
  },
  {
    "code": "md",
    "name": "Moldova",
    "capital": "Chișinău",
    "continent": "Europe",
    "population": "2.6 million",
    "similarFlag": "ro",
    "funFacts": [
      "Largest wine cellar in the world",
      "Landlocked between Romania and Ukraine",
      "One of the least visited countries in Europe"
    ],
    "misspellings": [
      "moldava",
      "moldovia"
    ]
  },
  {
    "code": "mc",
    "name": "Monaco",
    "capital": "Monaco",
    "continent": "Europe",
    "population": "40,000",
    "similarFlag": "id",
    "funFacts": [
      "2nd smallest country in the world",
      "Famous for its casino in Monte Carlo",
      "Formula 1 Grand Prix runs through city streets"
    ],
    "misspellings": [
      "monoco",
      "monacco"
    ]
  },
  {
    "code": "me",
    "name": "Montenegro",
    "capital": "Podgorica",
    "continent": "Europe",
    "population": "620,000",
    "similarFlag": "rs",
    "funFacts": [
      "Name means 'Black Mountain'",
      "One of the newest countries (2006)",
      "Has the deepest canyon in Europe"
    ],
    "misspellings": [
      "montanegro",
      "montenego"
    ]
  },
  {
    "code": "nl",
    "name": "Netherlands",
    "capital": "Amsterdam",
    "continent": "Europe",
    "population": "17.5 million",
    "similarFlag": "lu",
    "funFacts": [
      "About one-third below sea level",
      "More bicycles than people",
      "World's 2nd largest food exporter"
    ],
    "misspellings": [
      "neatherlands",
      "holland"
    ]
  },
  {
    "code": "no",
    "name": "Norway",
    "capital": "Oslo",
    "continent": "Europe",
    "population": "5.4 million",
    "similarFlag": "is",
    "funFacts": [
      "Longest coastline in Europe",
      "Introduced salmon sushi to Japan",
      "Nobel Peace Prize is awarded here"
    ],
    "misspellings": [
      "noreway"
    ]
  },
  {
    "code": "pl",
    "name": "Poland",
    "capital": "Warsaw",
    "continent": "Europe",
    "population": "38 million",
    "similarFlag": "id",
    "funFacts": [
      "17 UNESCO World Heritage Sites",
      "Marie Curie was born here",
      "One of the most forested countries in Europe"
    ],
    "misspellings": [
      "polland"
    ]
  },
  {
    "code": "pt",
    "name": "Portugal",
    "capital": "Lisbon",
    "continent": "Europe",
    "population": "10.3 million",
    "similarFlag": "es",
    "funFacts": [
      "Oldest country in Europe with same borders since 1139",
      "One of the world's greatest sea-faring nations",
      "Lisbon is older than Rome"
    ],
    "misspellings": [
      "portugul"
    ]
  },
  {
    "code": "ro",
    "name": "Romania",
    "capital": "Bucharest",
    "continent": "Europe",
    "population": "19 million",
    "similarFlag": "td",
    "funFacts": [
      "Flag is nearly identical to Chad's",
      "Bran Castle is associated with Dracula",
      "One of largest populations of brown bears"
    ],
    "misspellings": [
      "romaina",
      "rumania"
    ]
  },
  {
    "code": "ru",
    "name": "Russia",
    "capital": "Moscow",
    "continent": "Europe",
    "population": "144 million",
    "similarFlag": "nl",
    "funFacts": [
      "Spans 11 time zones",
      "Lake Baikal is deepest and oldest lake",
      "World's largest forest reserves"
    ],
    "misspellings": [
      "rusia"
    ]
  },
  {
    "code": "sm",
    "name": "San Marino",
    "capital": "San Marino",
    "continent": "Europe",
    "population": "34,000",
    "similarFlag": "id",
    "funFacts": [
      "Claims to be the world's oldest republic",
      "Entirely surrounded by Italy",
      "One of the smallest countries in the world"
    ],
    "misspellings": [
      "san mareno",
      "sanmarino"
    ]
  },
  {
    "code": "rs",
    "name": "Serbia",
    "capital": "Belgrade",
    "continent": "Europe",
    "population": "6.6 million",
    "similarFlag": "nl",
    "funFacts": [
      "One of the oldest civilizations in Europe",
      "Nikola Tesla was of Serbian origin",
      "Belgrade is one of the oldest cities in Europe"
    ],
    "misspellings": [
      "serba",
      "serbya"
    ]
  },
  {
    "code": "xk",
    "name": "Kosovo",
    "capital": "Pristina",
    "continent": "Europe",
    "population": "1.8 million",
    "similarFlag": "ba",
    "funFacts": [
      "One of the youngest countries in Europe, declaring independence in 2008",
      "Has a very young population with a median age of about 30",
      "Home to the ancient city of Prizren with Ottoman-era architecture"
    ],
    "misspellings": [
      "kosova",
      "kossovo"
    ]
  },
  {
    "code": "sk",
    "name": "Slovakia",
    "capital": "Bratislava",
    "continent": "Europe",
    "population": "5.4 million",
    "similarFlag": "si",
    "funFacts": [
      "More castles per capita than any other country",
      "Bratislava borders two countries",
      "Deepest cave in Central Europe"
    ],
    "misspellings": [
      "slovakya"
    ]
  },
  {
    "code": "si",
    "name": "Slovenia",
    "capital": "Ljubljana",
    "continent": "Europe",
    "population": "2.1 million",
    "similarFlag": "sk",
    "funFacts": [
      "Over half covered in forest",
      "Has LOVE in its name",
      "Lake Bled is one of Europe's most picturesque spots"
    ],
    "misspellings": [
      "slovenya"
    ]
  },
  {
    "code": "es",
    "name": "Spain",
    "capital": "Madrid",
    "continent": "Europe",
    "population": "47 million",
    "similarFlag": "pt",
    "funFacts": [
      "2nd highest number of UNESCO Heritage Sites",
      "La Tomatina tomato-throwing festival",
      "Spanish is world's 4th most spoken language"
    ],
    "misspellings": [
      "espain"
    ]
  },
  {
    "code": "se",
    "name": "Sweden",
    "capital": "Stockholm",
    "continent": "Europe",
    "population": "10.4 million",
    "similarFlag": "fi",
    "funFacts": [
      "Home of the Nobel Prize",
      "IKEA, Spotify, and Minecraft come from here",
      "Ice Hotel rebuilt every year"
    ],
    "misspellings": [
      "sweeden"
    ]
  },
  {
    "code": "ch",
    "name": "Switzerland",
    "capital": "Bern",
    "continent": "Europe",
    "population": "8.7 million",
    "similarFlag": "dk",
    "funFacts": [
      "Four official languages",
      "Neutral since 1515",
      "Home of CERN, world's largest particle physics lab"
    ],
    "misspellings": [
      "swizerland",
      "switserland"
    ]
  },
  {
    "code": "ua",
    "name": "Ukraine",
    "capital": "Kyiv",
    "continent": "Europe",
    "population": "37 million",
    "similarFlag": "ba",
    "funFacts": [
      "Largest country entirely within Europe",
      "Kyiv is one of the oldest cities in Eastern Europe",
      "One of world's top grain exporters"
    ],
    "misspellings": [
      "ukrain",
      "ukrayne"
    ]
  },
  {
    "code": "gb",
    "name": "United Kingdom",
    "capital": "London",
    "continent": "Europe",
    "population": "67 million",
    "similarFlag": "au",
    "funFacts": [
      "England, Scotland, Wales, and Northern Ireland",
      "London Underground is oldest subway",
      "English is most widely spoken language"
    ],
    "misspellings": [
      "uk",
      "britan",
      "great britain"
    ]
  },
  {
    "code": "ag",
    "name": "Antigua and Barbuda",
    "capital": "St. John's",
    "continent": "North America",
    "population": "100,000",
    "similarFlag": "tt",
    "funFacts": [
      "Has 365 beaches, one for each day",
      "V.C. Bird International Airport named after first PM",
      "Smallest country in the Americas by population"
    ],
    "misspellings": [
      "antigua",
      "antigua and barbuta"
    ]
  },
  {
    "code": "bs",
    "name": "Bahamas",
    "capital": "Nassau",
    "continent": "North America",
    "population": "400,000",
    "similarFlag": "ua",
    "funFacts": [
      "Over 700 islands",
      "Only about 30 are inhabited",
      "Swimming pigs of Exuma are a famous attraction"
    ],
    "misspellings": [
      "bahamma"
    ]
  },
  {
    "code": "bb",
    "name": "Barbados",
    "capital": "Bridgetown",
    "continent": "North America",
    "population": "288,000",
    "similarFlag": "ua",
    "funFacts": [
      "Became a republic in 2021",
      "Birthplace of rum",
      "Rihanna is from Barbados"
    ],
    "misspellings": [
      "barbadoes"
    ]
  },
  {
    "code": "bz",
    "name": "Belize",
    "capital": "Belmopan",
    "continent": "North America",
    "population": "420,000",
    "similarFlag": "ht",
    "funFacts": [
      "Only Central American country with English as official language",
      "Belize Barrier Reef is 2nd largest in the world",
      "Home to the Great Blue Hole"
    ],
    "misspellings": [
      "belise",
      "beleze"
    ]
  },
  {
    "code": "ca",
    "name": "Canada",
    "capital": "Ottawa",
    "continent": "North America",
    "population": "38 million",
    "similarFlag": "pe",
    "funFacts": [
      "More lakes than all other countries combined",
      "2nd largest country in the world",
      "Maple syrup is a major export"
    ],
    "misspellings": [
      "caneda"
    ]
  },
  {
    "code": "cr",
    "name": "Costa Rica",
    "capital": "San José",
    "continent": "North America",
    "population": "5.2 million",
    "similarFlag": "th",
    "funFacts": [
      "Has no army",
      "Over 25% is protected nature reserves",
      "One of the happiest countries"
    ],
    "misspellings": [
      "costarica"
    ]
  },
  {
    "code": "cu",
    "name": "Cuba",
    "capital": "Havana",
    "continent": "North America",
    "population": "11 million",
    "similarFlag": "pa",
    "funFacts": [
      "Largest island in the Caribbean",
      "Classic 1950s American cars still drive through Havana",
      "99.8% literacy rate"
    ],
    "misspellings": [
      "quba"
    ]
  },
  {
    "code": "dm",
    "name": "Dominica",
    "capital": "Roseau",
    "continent": "North America",
    "population": "72,000",
    "similarFlag": "gd",
    "funFacts": [
      "Called 'Nature Isle of the Caribbean'",
      "Has a boiling lake",
      "Sisserou parrot is found only here"
    ],
    "misspellings": [
      "dominica"
    ]
  },
  {
    "code": "do",
    "name": "Dominican Republic",
    "capital": "Santo Domingo",
    "continent": "North America",
    "population": "11 million",
    "similarFlag": "ht",
    "funFacts": [
      "Santo Domingo is oldest European settlement in the Americas",
      "Shares Hispaniola with Haiti",
      "Baseball is the most popular sport"
    ],
    "misspellings": [
      "dominican repubic"
    ]
  },
  {
    "code": "sv",
    "name": "El Salvador",
    "capital": "San Salvador",
    "continent": "North America",
    "population": "6.3 million",
    "similarFlag": "ni",
    "funFacts": [
      "Smallest country in Central America",
      "Known as the 'Land of Volcanoes'",
      "Adopted Bitcoin as legal tender in 2021"
    ],
    "misspellings": [
      "el salvadore",
      "elsalvador"
    ]
  },
  {
    "code": "gd",
    "name": "Grenada",
    "capital": "St. George's",
    "continent": "North America",
    "population": "125,000",
    "similarFlag": "dm",
    "funFacts": [
      "Known as the 'Spice Isle'",
      "World's 2nd largest nutmeg producer",
      "Has an underwater sculpture park"
    ],
    "misspellings": [
      "greneda",
      "grenada"
    ]
  },
  {
    "code": "gt",
    "name": "Guatemala",
    "capital": "Guatemala City",
    "continent": "North America",
    "population": "17 million",
    "similarFlag": "ar",
    "funFacts": [
      "37 volcanoes",
      "Chocolate was first made by the ancient Maya here",
      "One of the most biodiverse ecosystems"
    ],
    "misspellings": [
      "guatamala",
      "guatimala"
    ]
  },
  {
    "code": "ht",
    "name": "Haiti",
    "capital": "Port-au-Prince",
    "continent": "North America",
    "population": "11 million",
    "similarFlag": "li",
    "funFacts": [
      "First free Black republic in the world",
      "Occupies western third of Hispaniola",
      "Haitian Creole is an official language"
    ],
    "misspellings": [
      "hati",
      "hayti"
    ]
  },
  {
    "code": "hn",
    "name": "Honduras",
    "capital": "Tegucigalpa",
    "continent": "North America",
    "population": "10 million",
    "similarFlag": "sv",
    "funFacts": [
      "Largest rainforest in Central America",
      "Ancient Mayan city of Copán",
      "Name means 'depths' in Spanish"
    ],
    "misspellings": [
      "hondurus",
      "hondoras"
    ]
  },
  {
    "code": "jm",
    "name": "Jamaica",
    "capital": "Kingston",
    "continent": "North America",
    "population": "3 million",
    "similarFlag": "tz",
    "funFacts": [
      "Birthplace of reggae music and Bob Marley",
      "First Caribbean country to gain independence",
      "Has the fastest sprinters in the world"
    ],
    "misspellings": [
      "jamica",
      "jamacia"
    ]
  },
  {
    "code": "mx",
    "name": "Mexico",
    "capital": "Mexico City",
    "continent": "North America",
    "population": "128 million",
    "similarFlag": "it",
    "funFacts": [
      "Mexico City sinks about 10 inches per year",
      "Introduced chocolate, corn, and chili peppers to the world",
      "35 UNESCO World Heritage Sites"
    ],
    "misspellings": [
      "mejico"
    ]
  },
  {
    "code": "ni",
    "name": "Nicaragua",
    "capital": "Managua",
    "continent": "North America",
    "population": "6.9 million",
    "similarFlag": "sv",
    "funFacts": [
      "Largest country in Central America",
      "Lake Nicaragua has freshwater sharks",
      "Has two coastlines"
    ],
    "misspellings": [
      "nicuragua",
      "nicarauga"
    ]
  },
  {
    "code": "pa",
    "name": "Panama",
    "capital": "Panama City",
    "continent": "North America",
    "population": "4.4 million",
    "similarFlag": "cu",
    "funFacts": [
      "Panama Canal connects Atlantic and Pacific",
      "Only place you can see sunrise over the Pacific",
      "Panama hats are actually from Ecuador"
    ],
    "misspellings": [
      "panma"
    ]
  },
  {
    "code": "kn",
    "name": "Saint Kitts and Nevis",
    "capital": "Basseterre",
    "continent": "North America",
    "population": "48,000",
    "similarFlag": "tt",
    "funFacts": [
      "Smallest country in the Americas by area",
      "Has a volcanic peak: Mount Liamuiga",
      "Was one of the first Caribbean islands colonized"
    ],
    "misspellings": [
      "st kitts",
      "saint kitts"
    ]
  },
  {
    "code": "lc",
    "name": "Saint Lucia",
    "capital": "Castries",
    "continent": "North America",
    "population": "180,000",
    "similarFlag": "bs",
    "funFacts": [
      "The Pitons are a UNESCO World Heritage Site",
      "Only country named after a woman",
      "Produced two Nobel laureates"
    ],
    "misspellings": [
      "st lucia",
      "saint lucea"
    ]
  },
  {
    "code": "vc",
    "name": "Saint Vincent and the Grenadines",
    "capital": "Kingstown",
    "continent": "North America",
    "population": "110,000",
    "similarFlag": "bd",
    "funFacts": [
      "Pirates of the Caribbean was filmed here",
      "La Soufrière volcano erupted in 2021",
      "One of the smallest countries in the Americas"
    ],
    "misspellings": [
      "st vincent",
      "saint vincent"
    ]
  },
  {
    "code": "tt",
    "name": "Trinidad and Tobago",
    "capital": "Port of Spain",
    "continent": "North America",
    "population": "1.4 million",
    "similarFlag": "ag",
    "funFacts": [
      "Invented the steel drum",
      "Largest natural deposit of asphalt",
      "Carnival is world-famous"
    ],
    "misspellings": [
      "trinidad",
      "trinidad and tobego"
    ]
  },
  {
    "code": "us",
    "name": "United States",
    "capital": "Washington, D.C.",
    "continent": "North America",
    "population": "333 million",
    "similarFlag": "my",
    "funFacts": [
      "Has 50 states",
      "Statue of Liberty was a gift from France",
      "Put the first person on the Moon in 1969"
    ],
    "misspellings": [
      "usa",
      "america"
    ]
  },
  {
    "code": "ar",
    "name": "Argentina",
    "capital": "Buenos Aires",
    "continent": "South America",
    "population": "46 million",
    "similarFlag": "gt",
    "funFacts": [
      "Birthplace of tango",
      "Has the widest avenue: 9 de Julio",
      "8th largest country in the world"
    ],
    "misspellings": [
      "argenteena"
    ]
  },
  {
    "code": "bo",
    "name": "Bolivia",
    "capital": "Sucre",
    "continent": "South America",
    "population": "12 million",
    "similarFlag": "et",
    "funFacts": [
      "Two capitals: Sucre and La Paz",
      "Salar de Uyuni is world's largest salt flat",
      "Named after Simón Bolívar"
    ],
    "misspellings": [
      "bolivea"
    ]
  },
  {
    "code": "br",
    "name": "Brazil",
    "capital": "Brasília",
    "continent": "South America",
    "population": "215 million",
    "similarFlag": "co",
    "funFacts": [
      "Largest country in South America",
      "Amazon Rainforest covers 60%",
      "Won FIFA World Cup 5 times"
    ],
    "misspellings": [
      "brasil"
    ]
  },
  {
    "code": "cl",
    "name": "Chile",
    "capital": "Santiago",
    "continent": "South America",
    "population": "19 million",
    "similarFlag": "us",
    "funFacts": [
      "Longest country north-to-south",
      "Atacama Desert is driest place on Earth",
      "Easter Island belongs to Chile"
    ],
    "misspellings": [
      "chili",
      "chille"
    ]
  },
  {
    "code": "co",
    "name": "Colombia",
    "capital": "Bogotá",
    "continent": "South America",
    "population": "52 million",
    "similarFlag": "ec",
    "funFacts": [
      "World's leading producer of emeralds",
      "2nd most biodiverse country",
      "Named after Christopher Columbus"
    ],
    "misspellings": [
      "columbia"
    ]
  },
  {
    "code": "ec",
    "name": "Ecuador",
    "capital": "Quito",
    "continent": "South America",
    "population": "18 million",
    "similarFlag": "co",
    "funFacts": [
      "Named after the Equator",
      "Galápagos Islands belong to Ecuador",
      "First country to grant rights to nature"
    ],
    "misspellings": [
      "equador"
    ]
  },
  {
    "code": "gy",
    "name": "Guyana",
    "capital": "Georgetown",
    "continent": "South America",
    "population": "800,000",
    "similarFlag": "jm",
    "funFacts": [
      "Only English-speaking country in South America",
      "Kaieteur Falls is one of world's most powerful",
      "Name means 'Land of Many Waters'"
    ],
    "misspellings": [
      "guiana",
      "gyana"
    ]
  },
  {
    "code": "py",
    "name": "Paraguay",
    "capital": "Asunción",
    "continent": "South America",
    "population": "7.4 million",
    "similarFlag": "nl",
    "funFacts": [
      "Flag has a different emblem on each side",
      "One of most bilingual countries (Spanish & Guaraní)",
      "Itaipu Dam is one of world's largest hydroelectric"
    ],
    "misspellings": [
      "paraguy",
      "paraquay"
    ]
  },
  {
    "code": "pe",
    "name": "Peru",
    "capital": "Lima",
    "continent": "South America",
    "population": "34 million",
    "similarFlag": "ca",
    "funFacts": [
      "Machu Picchu is one of the New Seven Wonders",
      "Has 90 different microclimates",
      "Amazon River begins in Peru"
    ],
    "misspellings": [
      "perú"
    ]
  },
  {
    "code": "sr",
    "name": "Suriname",
    "capital": "Paramaribo",
    "continent": "South America",
    "population": "618,000",
    "similarFlag": "gy",
    "funFacts": [
      "Smallest country in South America",
      "Dutch is the official language",
      "Over 90% covered by tropical rainforest"
    ],
    "misspellings": [
      "surinam"
    ]
  },
  {
    "code": "uy",
    "name": "Uruguay",
    "capital": "Montevideo",
    "continent": "South America",
    "population": "3.4 million",
    "similarFlag": "gr",
    "funFacts": [
      "Hosted first FIFA World Cup in 1930",
      "First to legalize recreational marijuana",
      "Nearly all electricity from renewables"
    ],
    "misspellings": [
      "uraguay",
      "uruguai"
    ]
  },
  {
    "code": "ve",
    "name": "Venezuela",
    "capital": "Caracas",
    "continent": "South America",
    "population": "28 million",
    "similarFlag": "ec",
    "funFacts": [
      "Angel Falls is the tallest waterfall",
      "Largest proven oil reserves",
      "Lake Maracaibo has the most lightning strikes"
    ],
    "misspellings": [
      "venezuala",
      "venuzuela"
    ]
  },
  {
    "code": "au",
    "name": "Australia",
    "capital": "Canberra",
    "continent": "Oceania",
    "population": "26 million",
    "similarFlag": "nz",
    "funFacts": [
      "Both a country and a continent",
      "Great Barrier Reef is largest living structure",
      "More than 10,000 beaches"
    ],
    "misspellings": [
      "austraila"
    ]
  },
  {
    "code": "fj",
    "name": "Fiji",
    "capital": "Suva",
    "continent": "Oceania",
    "population": "930,000",
    "similarFlag": "nz",
    "funFacts": [
      "Over 330 islands",
      "Rugby sevens is the national sport",
      "First country to welcome the new millennium"
    ],
    "misspellings": [
      "figi"
    ]
  },
  {
    "code": "ki",
    "name": "Kiribati",
    "capital": "Tarawa",
    "continent": "Oceania",
    "population": "130,000",
    "similarFlag": "fj",
    "funFacts": [
      "Only country in all four hemispheres",
      "Pronounced 'Kiribas'",
      "One of the most remote countries on Earth"
    ],
    "misspellings": [
      "kiribas",
      "kirabati"
    ]
  },
  {
    "code": "mh",
    "name": "Marshall Islands",
    "capital": "Majuro",
    "continent": "Oceania",
    "population": "42,000",
    "similarFlag": "pw",
    "funFacts": [
      "Made up of 29 coral atolls",
      "Bikini Atoll was a nuclear test site",
      "Has one of the largest shark sanctuaries"
    ],
    "misspellings": [
      "marshal islands"
    ]
  },
  {
    "code": "fm",
    "name": "Micronesia",
    "capital": "Palikir",
    "continent": "Oceania",
    "population": "115,000",
    "similarFlag": "pw",
    "funFacts": [
      "Made up of 607 islands",
      "Nan Madol is called the 'Venice of the Pacific'",
      "Spread across a vast area of the Pacific Ocean"
    ],
    "misspellings": [
      "micronesia"
    ]
  },
  {
    "code": "nr",
    "name": "Nauru",
    "capital": "Yaren",
    "continent": "Oceania",
    "population": "12,000",
    "similarFlag": "fm",
    "funFacts": [
      "Smallest island country in the world",
      "No official capital city",
      "Was once the richest country per capita from phosphate mining"
    ],
    "misspellings": [
      "nauru"
    ]
  },
  {
    "code": "nz",
    "name": "New Zealand",
    "capital": "Wellington",
    "continent": "Oceania",
    "population": "5.1 million",
    "similarFlag": "au",
    "funFacts": [
      "First country to give women the right to vote",
      "More sheep than people",
      "Filming location for The Lord of the Rings"
    ],
    "misspellings": [
      "new zeland",
      "newzealand"
    ]
  },
  {
    "code": "pw",
    "name": "Palau",
    "capital": "Ngerulmud",
    "continent": "Oceania",
    "population": "18,000",
    "similarFlag": "mh",
    "funFacts": [
      "Has some of the best diving in the world",
      "Rock Islands are a UNESCO World Heritage Site",
      "One of the newest UN member states"
    ],
    "misspellings": [
      "palaou",
      "pallau"
    ]
  },
  {
    "code": "pg",
    "name": "Papua New Guinea",
    "capital": "Port Moresby",
    "continent": "Oceania",
    "population": "10 million",
    "similarFlag": "fj",
    "funFacts": [
      "Over 800 languages spoken",
      "Most linguistic diversity of any country",
      "Many tribes uncontacted until the 20th century"
    ],
    "misspellings": [
      "papau new guinea",
      "papua new guniea"
    ]
  },
  {
    "code": "ws",
    "name": "Samoa",
    "capital": "Apia",
    "continent": "Oceania",
    "population": "222,000",
    "similarFlag": "nz",
    "funFacts": [
      "Formerly called Western Samoa",
      "Tattooing has deep cultural significance",
      "Robert Louis Stevenson lived here"
    ],
    "misspellings": [
      "somoa"
    ]
  },
  {
    "code": "sb",
    "name": "Solomon Islands",
    "capital": "Honiara",
    "continent": "Oceania",
    "population": "720,000",
    "similarFlag": "pg",
    "funFacts": [
      "Made up of nearly 1,000 islands",
      "Site of major WWII battles",
      "One of the most remote island groups"
    ],
    "misspellings": [
      "soloman islands"
    ]
  },
  {
    "code": "to",
    "name": "Tonga",
    "capital": "Nukuʻalofa",
    "continent": "Oceania",
    "population": "106,000",
    "similarFlag": "ch",
    "funFacts": [
      "Only Pacific island nation never colonized",
      "One of first places to see sunrise each day",
      "Rugby is very popular"
    ],
    "misspellings": [
      "tongaa"
    ]
  },
  {
    "code": "tv",
    "name": "Tuvalu",
    "capital": "Funafuti",
    "continent": "Oceania",
    "population": "11,000",
    "similarFlag": "fj",
    "funFacts": [
      "4th smallest country in the world",
      "Highest point is only 4.6 meters",
      "Makes money from its .tv internet domain"
    ],
    "misspellings": [
      "tuvalo"
    ]
  },
  {
    "code": "vu",
    "name": "Vanuatu",
    "capital": "Port Vila",
    "continent": "Oceania",
    "population": "320,000",
    "similarFlag": "pg",
    "funFacts": [
      "Has the highest density of languages per capita",
      "Bungee jumping originated here (land diving)",
      "One of the happiest countries in the world"
    ],
    "misspellings": [
      "vanautu",
      "vanuato"
    ]
  }
];

// Helper: get flag image URL from country code (local SVG files)
export const getFlagUrl = (code) => {
  return `${import.meta.env.BASE_URL}flags/${code}.svg`;
};

export const getContinents = () => {
  return [...new Set(countries.map(c => c.continent))].sort();
};

export const CONTINENT_EMOJIS = {
  'Africa': '🌍', 'Asia': '🌏', 'Europe': '🏰',
  'North America': '🌎', 'South America': '🌎', 'Oceania': '🏝️',
};

export default countries;
