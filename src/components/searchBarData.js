export const courseMappings = {
  UG: {
    "B.Com": ["MBA", "M.Com", "CFA", "CA", "PG Diploma in Data Analytics"],
    "B.Tech": ["M.Tech", "MBA", "MS Abroad", "PG Diploma in Data Science"],
    "BA English": ["MA English", "PG Diploma in Journalism", "PG Diploma in Creative Writing"],
  },
  PG: {
    "M.Com": ["PhD in Commerce", "CFA Advanced", "Executive MBA"],
    "M.Tech": ["PhD in Engineering", "Post-Doc Research"],
  },
  Diploma: {
    "Diploma in Engineering": ["B.Tech", "Advanced Diploma in Specialization"],
  },
};

export const coursesByLevel = {
  UG: ["B.Com", "B.Tech", "BA English", "B.Sc Physics", "BBA"],
  PG: ["MBA", "M.Com", "M.Tech", "MA English", "M.Sc Chemistry"],
  Diploma: ["Diploma in Engineering", "Diploma in Nursing", "PG Diploma in Data Science"],
  PhD: ["PhD in Commerce", "PhD in Engineering", "PhD in Literature"],
  districts: {
    "Andhra Pradesh": [
      "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor",
      "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna",
      "Kurnool", "Nandyal", "Nellore", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam",
      "Srikakulam", "Sri Sathya Sai", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari",
      "YSR Kadapa"
    ],
    "Arunachal Pradesh": [
      "Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey",
      "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri",
      "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap",
      "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang",
      "Keyi Panyor", "Bichom"
    ],
    "Assam": [
      "Baksa", "Bajali", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
      "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat",
      "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong",
      "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari",
      "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tamulpur", "Tinsukia", "Udalguri",
      "West Karbi Anglong"
    ],
    "Bihar": [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
      "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
      "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger",
      "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
      "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
      "Balod", "Baloda Bazar", "Balrampur-Ramanujganj", "Bastar", "Bemetara", "Bijapur", "Bilaspur",
      "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa",
      "Jashpur", "Kabirdham", "Kanker", "Khairagarh-Chhuikhadan-Gandai", "Kondagaon", "Korba",
      "Korea", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki",
      "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sakti",
      "Sukma", "Surajpur", "Surguja"
    ],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
      "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath",
      "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada",
      "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat",
      "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar",
      "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal",
      "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi",
      "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih",
      "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga",
      "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega",
      "West Singhbhum"
    ],
    "Karnataka": [
      "Bagalkot", "Ballari", "Belagavi", "Bangalore Rural", "Bangalore Urban", "Bidar",
      "Chamarajanagar", "Chikkaballapur", "Chikmagalur", "Chitradurga", "Dakshina Kannada",
      "Davanagere", "Dharwad", "Gadaga", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar",
      "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumakuru", "Udupi",
      "Uttara Kannada", "Vijayanagara", "Bijapur", "Yadgir"
    ],
    "Kerala": [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam",
      "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur",
      "Wayanad"
    ],
    "Madhya Pradesh": [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind",
      "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar",
      "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua",
      "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", "Morena", "Narmadapuram",
      "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa",
      "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri",
      "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana",
      "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur",
      "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik",
      "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
      "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam",
      "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong",
      "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
      "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills",
      "Mawkyrwat", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills",
      "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ],
    "Mizoram": [
      "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei",
      "Mamit", "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
      "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland",
      "Noklak", "Peren", "Phek", "Shamator", "Tseminyü", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
      "Angul", "Boudh", "Bhadrak", "Balangir", "Bargarh", "Balasore", "Cuttack", "Debagarh",
      "Dhenkanal", "Ganjam", "Gajapati", "Jharsuguda", "Jajpur", "Jagatsinghpur", "Khordha",
      "Kendujhar", "Kalahandi", "Kandhamal", "Koraput", "Kendrapara", "Malkangiri", "Mayurbhanj",
      "Nabarangpur", "Nuapada", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Subarnapur",
      "Sundargarh"
    ],
    "Punjab": [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur",
      "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa",
      "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur",
      "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"
    ],
    "Rajasthan": [
      "Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur",
      "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Dholpur",
      "Didwana Kuchaman", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar",
      "Jhunjhunu", "Jodhpur", "Karauli", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur",
      "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sawai Madhopur", "Sikar",
      "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": [
      "Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"
    ],
    "Tamil Nadu": [
      "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
      "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai",
      "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
      "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
      "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
      "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
      "Adilabad", "Kumuram Bheem Asifabad", "Mancherial", "Nirmal", "Nizamabad", "Jagtial",
      "Peddapalli", "Kamareddy", "Rajanna Sircilla", "Karimnagar", "Jayashankar Bhupalpally",
      "Sangareddy", "Medak", "Siddipet", "Jangaon", "Hanumakonda", "Warangal", "Mulugu",
      "Bhadradri Kothagudem", "Khammam", "Mahabubabad", "Suryapet", "Nalgonda",
      "Yadadri Bhuvanagiri", "Medchal–Malkajgiri", "Hyderabad", "Ranga Reddy", "Vikarabad",
      "Narayanpet", "Mahabubnagar", "Nagarkurnool", "Wanaparthy", "Jogulamba Gadwal"
    ],
    "Tripura": [
      "Dhalai", "Gomati", "Khowai", "Sipahijala", "Unakoti", "North Tripura", "South Tripura",
      "West Tripura"
    ],
    "Uttar Pradesh": [
      "Agra", "Aligarh", "Ambedkar Nagar", "Ayodhya", "Amethi", "Amroha", "Auraiya", "Azamgarh",
      "Budaun", "Bagpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly",
      "Basti", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
      "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur",
      "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
      "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar",
      "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
      "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
      "Prayagraj", "Rae Bareli", "Rampur", "Saharanpur", "Sant Kabir Nagar", "Bhadohi",
      "Sambhal", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
      "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Maha Kumbh area of Prayagraj"
    ],
    "Uttarakhand": [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital",
      "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar",
      "Uttarkashi"
    ],
    "West Bengal": [
      "Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum", "Cooch Behar",
      "Darjeeling", "Dakshin Dinajpur", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kolkata",
      "Kalimpong", "Malda", "Paschim Medinipur", "Purba Medinipur", "Murshidabad", "Nadia",
      "North 24 Parganas", "South 24 Parganas", "Purulia", "Uttar Dinajpur"
    ]
  }
};

export const facilitiesOptions = [
  "Hostel", "Library", "Lab", "Sports", "Gym", "Cafeteria", "Transport"
];

export const affiliationOptions = [
  "UGC", "NAAC Grade A", "NAAC Grade B", "NAAC Grade C", "NBA", "AICTE"
];

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];