/**
 * Bangladesh's 64 districts and the police stations (thanas / upazilas) a
 * customer picks at checkout. Each entry is [English, বাংলা]; the English name
 * is what gets stored on the order so staff see one consistent spelling.
 * City districts list their metropolitan thanas alongside the upazilas.
 */
const raw = [
  ["Bagerhat", "বাগেরহাট", [
    ["Bagerhat Sadar", "বাগেরহাট সদর"], ["Chitalmari", "চিতলমারী"], ["Fakirhat", "ফকিরহাট"], ["Kachua", "কচুয়া"],
    ["Mollahat", "মোল্লাহাট"], ["Mongla", "মোংলা"], ["Morrelganj", "মোড়েলগঞ্জ"], ["Rampal", "রামপাল"], ["Sarankhola", "শরণখোলা"],
  ]],
  ["Bandarban", "বান্দরবান", [
    ["Bandarban Sadar", "বান্দরবান সদর"], ["Alikadam", "আলীকদম"], ["Lama", "লামা"], ["Naikhongchhari", "নাইক্ষ্যংছড়ি"],
    ["Rowangchhari", "রোয়াংছড়ি"], ["Ruma", "রুমা"], ["Thanchi", "থানচি"],
  ]],
  ["Barguna", "বরগুনা", [
    ["Barguna Sadar", "বরগুনা সদর"], ["Amtali", "আমতলী"], ["Bamna", "বামনা"], ["Betagi", "বেতাগী"],
    ["Patharghata", "পাথরঘাটা"], ["Taltali", "তালতলী"],
  ]],
  ["Barishal", "বরিশাল", [
    ["Barishal Sadar", "বরিশাল সদর"], ["Agailjhara", "আগৈলঝাড়া"], ["Babuganj", "বাবুগঞ্জ"], ["Bakerganj", "বাকেরগঞ্জ"],
    ["Banaripara", "বানারীপাড়া"], ["Gaurnadi", "গৌরনদী"], ["Hizla", "হিজলা"], ["Mehendiganj", "মেহেন্দিগঞ্জ"],
    ["Muladi", "মুলাদী"], ["Wazirpur", "উজিরপুর"],
  ]],
  ["Bhola", "ভোলা", [
    ["Bhola Sadar", "ভোলা সদর"], ["Burhanuddin", "বোরহানউদ্দিন"], ["Char Fasson", "চরফ্যাশন"], ["Daulatkhan", "দৌলতখান"],
    ["Lalmohan", "লালমোহন"], ["Manpura", "মনপুরা"], ["Tazumuddin", "তজুমদ্দিন"],
  ]],
  ["Bogura", "বগুড়া", [
    ["Bogura Sadar", "বগুড়া সদর"], ["Adamdighi", "আদমদীঘি"], ["Dhunat", "ধুনট"], ["Dhupchanchia", "দুপচাঁচিয়া"],
    ["Gabtali", "গাবতলী"], ["Kahaloo", "কাহালু"], ["Nandigram", "নন্দীগ্রাম"], ["Sariakandi", "সারিয়াকান্দি"],
    ["Shajahanpur", "শাজাহানপুর"], ["Sherpur", "শেরপুর"], ["Shibganj", "শিবগঞ্জ"], ["Sonatala", "সোনাতলা"],
  ]],
  ["Brahmanbaria", "ব্রাহ্মণবাড়িয়া", [
    ["Brahmanbaria Sadar", "ব্রাহ্মণবাড়িয়া সদর"], ["Akhaura", "আখাউড়া"], ["Ashuganj", "আশুগঞ্জ"], ["Bancharampur", "বাঞ্ছারামপুর"],
    ["Bijoynagar", "বিজয়নগর"], ["Kasba", "কসবা"], ["Nabinagar", "নবীনগর"], ["Nasirnagar", "নাসিরনগর"], ["Sarail", "সরাইল"],
  ]],
  ["Chandpur", "চাঁদপুর", [
    ["Chandpur Sadar", "চাঁদপুর সদর"], ["Faridganj", "ফরিদগঞ্জ"], ["Haimchar", "হাইমচর"], ["Hajiganj", "হাজীগঞ্জ"],
    ["Kachua", "কচুয়া"], ["Matlab Dakshin", "মতলব দক্ষিণ"], ["Matlab Uttar", "মতলব উত্তর"], ["Shahrasti", "শাহরাস্তি"],
  ]],
  ["Chapainawabganj", "চাঁপাইনবাবগঞ্জ", [
    ["Chapainawabganj Sadar", "চাঁপাইনবাবগঞ্জ সদর"], ["Bholahat", "ভোলাহাট"], ["Gomastapur", "গোমস্তাপুর"],
    ["Nachole", "নাচোল"], ["Shibganj", "শিবগঞ্জ"],
  ]],
  ["Chattogram", "চট্টগ্রাম", [
    ["Kotwali", "কোতোয়ালী"], ["Akbar Shah", "আকবর শাহ"], ["Bakalia", "বাকলিয়া"], ["Bandar", "বন্দর"],
    ["Bayazid Bostami", "বায়েজিদ বোস্তামী"], ["Chandgaon", "চান্দগাঁও"], ["Chawkbazar", "চকবাজার"], ["Double Mooring", "ডবলমুরিং"],
    ["EPZ", "ইপিজেড"], ["Halishahar", "হালিশহর"], ["Khulshi", "খুলশী"], ["Pahartali", "পাহাড়তলী"],
    ["Panchlaish", "পাঁচলাইশ"], ["Patenga", "পতেঙ্গা"], ["Sadarghat", "সদরঘাট"],
    ["Anwara", "আনোয়ারা"], ["Banshkhali", "বাঁশখালী"], ["Boalkhali", "বোয়ালখালী"], ["Chandanaish", "চন্দনাইশ"],
    ["Fatikchhari", "ফটিকছড়ি"], ["Hathazari", "হাটহাজারী"], ["Karnaphuli", "কর্ণফুলী"], ["Lohagara", "লোহাগাড়া"],
    ["Mirsharai", "মীরসরাই"], ["Patiya", "পটিয়া"], ["Rangunia", "রাঙ্গুনিয়া"], ["Raozan", "রাউজান"],
    ["Sandwip", "সন্দ্বীপ"], ["Satkania", "সাতকানিয়া"], ["Sitakunda", "সীতাকুণ্ড"],
  ]],
  ["Chuadanga", "চুয়াডাঙ্গা", [
    ["Chuadanga Sadar", "চুয়াডাঙ্গা সদর"], ["Alamdanga", "আলমডাঙ্গা"], ["Damurhuda", "দামুড়হুদা"], ["Jibannagar", "জীবননগর"],
  ]],
  ["Cox's Bazar", "কক্সবাজার", [
    ["Cox's Bazar Sadar", "কক্সবাজার সদর"], ["Chakaria", "চকরিয়া"], ["Eidgaon", "ঈদগাঁও"], ["Kutubdia", "কুতুবদিয়া"],
    ["Maheshkhali", "মহেশখালী"], ["Pekua", "পেকুয়া"], ["Ramu", "রামু"], ["Teknaf", "টেকনাফ"], ["Ukhia", "উখিয়া"],
  ]],
  ["Cumilla", "কুমিল্লা", [
    ["Cumilla Sadar", "কুমিল্লা সদর"], ["Cumilla Sadar Dakshin", "কুমিল্লা সদর দক্ষিণ"], ["Barura", "বরুড়া"],
    ["Brahmanpara", "ব্রাহ্মণপাড়া"], ["Burichang", "বুড়িচং"], ["Chandina", "চান্দিনা"], ["Chauddagram", "চৌদ্দগ্রাম"],
    ["Daudkandi", "দাউদকান্দি"], ["Debidwar", "দেবিদ্বার"], ["Homna", "হোমনা"], ["Laksam", "লাকসাম"], ["Lalmai", "লালমাই"],
    ["Meghna", "মেঘনা"], ["Monohargonj", "মনোহরগঞ্জ"], ["Muradnagar", "মুরাদনগর"], ["Nangalkot", "নাঙ্গলকোট"], ["Titas", "তিতাস"],
  ]],
  ["Dhaka", "ঢাকা", [
    ["Adabor", "আদাবর"], ["Badda", "বাড্ডা"], ["Banani", "বনানী"], ["Bangshal", "বংশাল"], ["Bhashantek", "ভাষানটেক"],
    ["Bimanbandar", "বিমানবন্দর"], ["Cantonment", "ক্যান্টনমেন্ট"], ["Chawkbazar", "চকবাজার"], ["Dakshinkhan", "দক্ষিণখান"],
    ["Darus Salam", "দারুস সালাম"], ["Demra", "ডেমরা"], ["Dhanmondi", "ধানমন্ডি"], ["Gendaria", "গেন্ডারিয়া"],
    ["Gulshan", "গুলশান"], ["Hatirjheel", "হাতিরঝিল"], ["Hazaribagh", "হাজারীবাগ"], ["Jatrabari", "যাত্রাবাড়ী"],
    ["Kadamtali", "কদমতলী"], ["Kafrul", "কাফরুল"], ["Kalabagan", "কলাবাগান"], ["Kamrangirchar", "কামরাঙ্গীরচর"],
    ["Khilgaon", "খিলগাঁও"], ["Khilkhet", "খিলক্ষেত"], ["Kotwali", "কোতোয়ালী"], ["Lalbagh", "লালবাগ"], ["Mirpur", "মিরপুর"],
    ["Mohammadpur", "মোহাম্মদপুর"], ["Motijheel", "মতিঝিল"], ["Mugda", "মুগদা"], ["New Market", "নিউ মার্কেট"],
    ["Pallabi", "পল্লবী"], ["Paltan", "পল্টন"], ["Ramna", "রমনা"], ["Rampura", "রামপুরা"], ["Rupnagar", "রূপনগর"],
    ["Sabujbagh", "সবুজবাগ"], ["Shah Ali", "শাহ আলী"], ["Shahbagh", "শাহবাগ"], ["Shahjahanpur", "শাহজাহানপুর"],
    ["Sher-e-Bangla Nagar", "শেরেবাংলা নগর"], ["Shyampur", "শ্যামপুর"], ["Sutrapur", "সূত্রাপুর"], ["Tejgaon", "তেজগাঁও"],
    ["Tejgaon Industrial Area", "তেজগাঁও শিল্পাঞ্চল"], ["Turag", "তুরাগ"], ["Uttara East", "উত্তরা পূর্ব"],
    ["Uttara West", "উত্তরা পশ্চিম"], ["Uttarkhan", "উত্তরখান"], ["Vatara", "ভাটারা"], ["Wari", "ওয়ারী"],
    ["Ashulia", "আশুলিয়া"], ["Dhamrai", "ধামরাই"], ["Dohar", "দোহার"], ["Keraniganj", "কেরানীগঞ্জ"],
    ["South Keraniganj", "দক্ষিণ কেরানীগঞ্জ"], ["Nawabganj", "নবাবগঞ্জ"], ["Savar", "সাভার"],
  ]],
  ["Dinajpur", "দিনাজপুর", [
    ["Dinajpur Sadar", "দিনাজপুর সদর"], ["Birampur", "বিরামপুর"], ["Birganj", "বীরগঞ্জ"], ["Biral", "বিরল"],
    ["Bochaganj", "বোচাগঞ্জ"], ["Chirirbandar", "চিরিরবন্দর"], ["Fulbari", "ফুলবাড়ী"], ["Ghoraghat", "ঘোড়াঘাট"],
    ["Hakimpur", "হাকিমপুর"], ["Kaharole", "কাহারোল"], ["Khansama", "খানসামা"], ["Nawabganj", "নবাবগঞ্জ"], ["Parbatipur", "পার্বতীপুর"],
  ]],
  ["Faridpur", "ফরিদপুর", [
    ["Faridpur Sadar", "ফরিদপুর সদর"], ["Alfadanga", "আলফাডাঙ্গা"], ["Bhanga", "ভাঙ্গা"], ["Boalmari", "বোয়ালমারী"],
    ["Charbhadrasan", "চরভদ্রাসন"], ["Madhukhali", "মধুখালী"], ["Nagarkanda", "নগরকান্দা"], ["Sadarpur", "সদরপুর"], ["Saltha", "সালথা"],
  ]],
  ["Feni", "ফেনী", [
    ["Feni Sadar", "ফেনী সদর"], ["Chhagalnaiya", "ছাগলনাইয়া"], ["Daganbhuiyan", "দাগনভূঞা"], ["Fulgazi", "ফুলগাজী"],
    ["Parshuram", "পরশুরাম"], ["Sonagazi", "সোনাগাজী"],
  ]],
  ["Gaibandha", "গাইবান্ধা", [
    ["Gaibandha Sadar", "গাইবান্ধা সদর"], ["Fulchhari", "ফুলছড়ি"], ["Gobindaganj", "গোবিন্দগঞ্জ"], ["Palashbari", "পলাশবাড়ী"],
    ["Sadullapur", "সাদুল্লাপুর"], ["Saghata", "সাঘাটা"], ["Sundarganj", "সুন্দরগঞ্জ"],
  ]],
  ["Gazipur", "গাজীপুর", [
    ["Gazipur Sadar", "গাজীপুর সদর"], ["Joydebpur", "জয়দেবপুর"], ["Tongi", "টঙ্গী"], ["Basan", "বাসন"], ["Gacha", "গাছা"],
    ["Kashimpur", "কাশিমপুর"], ["Konabari", "কোনাবাড়ী"], ["Pubail", "পূবাইল"], ["Kaliakair", "কালিয়াকৈর"],
    ["Kaliganj", "কালীগঞ্জ"], ["Kapasia", "কাপাসিয়া"], ["Sreepur", "শ্রীপুর"],
  ]],
  ["Gopalganj", "গোপালগঞ্জ", [
    ["Gopalganj Sadar", "গোপালগঞ্জ সদর"], ["Kashiani", "কাশিয়ানী"], ["Kotalipara", "কোটালীপাড়া"],
    ["Muksudpur", "মুকসুদপুর"], ["Tungipara", "টুঙ্গিপাড়া"],
  ]],
  ["Habiganj", "হবিগঞ্জ", [
    ["Habiganj Sadar", "হবিগঞ্জ সদর"], ["Ajmiriganj", "আজমিরীগঞ্জ"], ["Bahubal", "বাহুবল"], ["Baniachong", "বানিয়াচং"],
    ["Chunarughat", "চুনারুঘাট"], ["Lakhai", "লাখাই"], ["Madhabpur", "মাধবপুর"], ["Nabiganj", "নবীগঞ্জ"], ["Shayestaganj", "শায়েস্তাগঞ্জ"],
  ]],
  ["Jamalpur", "জামালপুর", [
    ["Jamalpur Sadar", "জামালপুর সদর"], ["Bakshiganj", "বকশীগঞ্জ"], ["Dewanganj", "দেওয়ানগঞ্জ"], ["Islampur", "ইসলামপুর"],
    ["Madarganj", "মাদারগঞ্জ"], ["Melandaha", "মেলান্দহ"], ["Sarishabari", "সরিষাবাড়ী"],
  ]],
  ["Jashore", "যশোর", [
    ["Jashore Sadar", "যশোর সদর"], ["Abhaynagar", "অভয়নগর"], ["Bagherpara", "বাঘারপাড়া"], ["Benapole", "বেনাপোল"],
    ["Chaugachha", "চৌগাছা"], ["Jhikargachha", "ঝিকরগাছা"], ["Keshabpur", "কেশবপুর"], ["Manirampur", "মণিরামপুর"], ["Sharsha", "শার্শা"],
  ]],
  ["Jhalokati", "ঝালকাঠি", [
    ["Jhalokati Sadar", "ঝালকাঠি সদর"], ["Kathalia", "কাঠালিয়া"], ["Nalchity", "নলছিটি"], ["Rajapur", "রাজাপুর"],
  ]],
  ["Jhenaidah", "ঝিনাইদহ", [
    ["Jhenaidah Sadar", "ঝিনাইদহ সদর"], ["Harinakunda", "হরিণাকুণ্ডু"], ["Kaliganj", "কালীগঞ্জ"], ["Kotchandpur", "কোটচাঁদপুর"],
    ["Maheshpur", "মহেশপুর"], ["Shailkupa", "শৈলকুপা"],
  ]],
  ["Joypurhat", "জয়পুরহাট", [
    ["Joypurhat Sadar", "জয়পুরহাট সদর"], ["Akkelpur", "আক্কেলপুর"], ["Kalai", "কালাই"], ["Khetlal", "ক্ষেতলাল"], ["Panchbibi", "পাঁচবিবি"],
  ]],
  ["Khagrachhari", "খাগড়াছড়ি", [
    ["Khagrachhari Sadar", "খাগড়াছড়ি সদর"], ["Dighinala", "দীঘিনালা"], ["Guimara", "গুইমারা"], ["Lakshmichhari", "লক্ষ্মীছড়ি"],
    ["Mahalchhari", "মহালছড়ি"], ["Manikchhari", "মানিকছড়ি"], ["Matiranga", "মাটিরাঙ্গা"], ["Panchhari", "পানছড়ি"], ["Ramgarh", "রামগড়"],
  ]],
  ["Khulna", "খুলনা", [
    ["Khulna Sadar", "খুলনা সদর"], ["Aranghata", "আড়ংঘাটা"], ["Daulatpur", "দৌলতপুর"], ["Harintana", "হরিণটানা"],
    ["Khalishpur", "খালিশপুর"], ["Khan Jahan Ali", "খানজাহান আলী"], ["Labanchara", "লবণচরা"], ["Sonadanga", "সোনাডাঙ্গা"],
    ["Batiaghata", "বটিয়াঘাটা"], ["Dacope", "দাকোপ"], ["Dighalia", "দিঘলিয়া"], ["Dumuria", "ডুমুরিয়া"], ["Koyra", "কয়রা"],
    ["Paikgachha", "পাইকগাছা"], ["Phultala", "ফুলতলা"], ["Rupsha", "রূপসা"], ["Terokhada", "তেরখাদা"],
  ]],
  ["Kishoreganj", "কিশোরগঞ্জ", [
    ["Kishoreganj Sadar", "কিশোরগঞ্জ সদর"], ["Austagram", "অষ্টগ্রাম"], ["Bajitpur", "বাজিতপুর"], ["Bhairab", "ভৈরব"],
    ["Hossainpur", "হোসেনপুর"], ["Itna", "ইটনা"], ["Karimganj", "করিমগঞ্জ"], ["Katiadi", "কটিয়াদী"], ["Kuliarchar", "কুলিয়ারচর"],
    ["Mithamain", "মিঠামইন"], ["Nikli", "নিকলী"], ["Pakundia", "পাকুন্দিয়া"], ["Tarail", "তাড়াইল"],
  ]],
  ["Kurigram", "কুড়িগ্রাম", [
    ["Kurigram Sadar", "কুড়িগ্রাম সদর"], ["Bhurungamari", "ভুরুঙ্গামারী"], ["Char Rajibpur", "চর রাজিবপুর"], ["Chilmari", "চিলমারী"],
    ["Nageshwari", "নাগেশ্বরী"], ["Phulbari", "ফুলবাড়ী"], ["Rajarhat", "রাজারহাট"], ["Raomari", "রৌমারী"], ["Ulipur", "উলিপুর"],
  ]],
  ["Kushtia", "কুষ্টিয়া", [
    ["Kushtia Sadar", "কুষ্টিয়া সদর"], ["Bheramara", "ভেড়ামারা"], ["Daulatpur", "দৌলতপুর"], ["Khoksa", "খোকসা"],
    ["Kumarkhali", "কুমারখালী"], ["Mirpur", "মিরপুর"],
  ]],
  ["Lakshmipur", "লক্ষ্মীপুর", [
    ["Lakshmipur Sadar", "লক্ষ্মীপুর সদর"], ["Kamalnagar", "কমলনগর"], ["Raipur", "রায়পুর"], ["Ramganj", "রামগঞ্জ"], ["Ramgati", "রামগতি"],
  ]],
  ["Lalmonirhat", "লালমনিরহাট", [
    ["Lalmonirhat Sadar", "লালমনিরহাট সদর"], ["Aditmari", "আদিতমারী"], ["Hatibandha", "হাতীবান্ধা"], ["Kaliganj", "কালীগঞ্জ"], ["Patgram", "পাটগ্রাম"],
  ]],
  ["Madaripur", "মাদারীপুর", [
    ["Madaripur Sadar", "মাদারীপুর সদর"], ["Dasar", "ডাসার"], ["Kalkini", "কালকিনি"], ["Rajoir", "রাজৈর"], ["Shibchar", "শিবচর"],
  ]],
  ["Magura", "মাগুরা", [
    ["Magura Sadar", "মাগুরা সদর"], ["Mohammadpur", "মহম্মদপুর"], ["Shalikha", "শালিখা"], ["Sreepur", "শ্রীপুর"],
  ]],
  ["Manikganj", "মানিকগঞ্জ", [
    ["Manikganj Sadar", "মানিকগঞ্জ সদর"], ["Daulatpur", "দৌলতপুর"], ["Ghior", "ঘিওর"], ["Harirampur", "হরিরামপুর"],
    ["Saturia", "সাটুরিয়া"], ["Shivalaya", "শিবালয়"], ["Singair", "সিংগাইর"],
  ]],
  ["Meherpur", "মেহেরপুর", [
    ["Meherpur Sadar", "মেহেরপুর সদর"], ["Gangni", "গাংনী"], ["Mujibnagar", "মুজিবনগর"],
  ]],
  ["Moulvibazar", "মৌলভীবাজার", [
    ["Moulvibazar Sadar", "মৌলভীবাজার সদর"], ["Barlekha", "বড়লেখা"], ["Juri", "জুড়ী"], ["Kamalganj", "কমলগঞ্জ"],
    ["Kulaura", "কুলাউড়া"], ["Rajnagar", "রাজনগর"], ["Sreemangal", "শ্রীমঙ্গল"],
  ]],
  ["Munshiganj", "মুন্সীগঞ্জ", [
    ["Munshiganj Sadar", "মুন্সীগঞ্জ সদর"], ["Gazaria", "গজারিয়া"], ["Lohajang", "লৌহজং"], ["Sirajdikhan", "সিরাজদিখান"],
    ["Sreenagar", "শ্রীনগর"], ["Tongibari", "টংগিবাড়ী"],
  ]],
  ["Mymensingh", "ময়মনসিংহ", [
    ["Mymensingh Sadar", "ময়মনসিংহ সদর"], ["Bhaluka", "ভালুকা"], ["Dhobaura", "ধোবাউড়া"], ["Fulbaria", "ফুলবাড়িয়া"],
    ["Gaffargaon", "গফরগাঁও"], ["Gauripur", "গৌরীপুর"], ["Haluaghat", "হালুয়াঘাট"], ["Ishwarganj", "ঈশ্বরগঞ্জ"],
    ["Muktagachha", "মুক্তাগাছা"], ["Nandail", "নান্দাইল"], ["Phulpur", "ফুলপুর"], ["Tarakanda", "তারাকান্দা"], ["Trishal", "ত্রিশাল"],
  ]],
  ["Naogaon", "নওগাঁ", [
    ["Naogaon Sadar", "নওগাঁ সদর"], ["Atrai", "আত্রাই"], ["Badalgachhi", "বদলগাছী"], ["Dhamoirhat", "ধামইরহাট"],
    ["Mahadebpur", "মহাদেবপুর"], ["Manda", "মান্দা"], ["Niamatpur", "নিয়ামতপুর"], ["Patnitala", "পত্নীতলা"],
    ["Porsha", "পোরশা"], ["Raninagar", "রাণীনগর"], ["Sapahar", "সাপাহার"],
  ]],
  ["Narail", "নড়াইল", [
    ["Narail Sadar", "নড়াইল সদর"], ["Kalia", "কালিয়া"], ["Lohagara", "লোহাগড়া"],
  ]],
  ["Narayanganj", "নারায়ণগঞ্জ", [
    ["Narayanganj Sadar", "নারায়ণগঞ্জ সদর"], ["Araihazar", "আড়াইহাজার"], ["Bandar", "বন্দর"], ["Fatullah", "ফতুল্লা"],
    ["Rupganj", "রূপগঞ্জ"], ["Siddhirganj", "সিদ্ধিরগঞ্জ"], ["Sonargaon", "সোনারগাঁও"],
  ]],
  ["Narsingdi", "নরসিংদী", [
    ["Narsingdi Sadar", "নরসিংদী সদর"], ["Belabo", "বেলাবো"], ["Monohardi", "মনোহরদী"], ["Palash", "পলাশ"],
    ["Raipura", "রায়পুরা"], ["Shibpur", "শিবপুর"],
  ]],
  ["Natore", "নাটোর", [
    ["Natore Sadar", "নাটোর সদর"], ["Bagatipara", "বাগাতিপাড়া"], ["Baraigram", "বড়াইগ্রাম"], ["Gurudaspur", "গুরুদাসপুর"],
    ["Lalpur", "লালপুর"], ["Naldanga", "নলডাঙ্গা"], ["Singra", "সিংড়া"],
  ]],
  ["Netrokona", "নেত্রকোনা", [
    ["Netrokona Sadar", "নেত্রকোনা সদর"], ["Atpara", "আটপাড়া"], ["Barhatta", "বারহাট্টা"], ["Durgapur", "দুর্গাপুর"],
    ["Kalmakanda", "কলমাকান্দা"], ["Kendua", "কেন্দুয়া"], ["Khaliajuri", "খালিয়াজুরী"], ["Madan", "মদন"],
    ["Mohanganj", "মোহনগঞ্জ"], ["Purbadhala", "পূর্বধলা"],
  ]],
  ["Nilphamari", "নীলফামারী", [
    ["Nilphamari Sadar", "নীলফামারী সদর"], ["Dimla", "ডিমলা"], ["Domar", "ডোমার"], ["Jaldhaka", "জলঢাকা"],
    ["Kishoreganj", "কিশোরগঞ্জ"], ["Saidpur", "সৈয়দপুর"],
  ]],
  ["Noakhali", "নোয়াখালী", [
    ["Noakhali Sadar", "নোয়াখালী সদর"], ["Begumganj", "বেগমগঞ্জ"], ["Chatkhil", "চাটখিল"], ["Companiganj", "কোম্পানীগঞ্জ"],
    ["Hatiya", "হাতিয়া"], ["Kabirhat", "কবিরহাট"], ["Senbagh", "সেনবাগ"], ["Sonaimuri", "সোনাইমুড়ী"], ["Subarnachar", "সুবর্ণচর"],
  ]],
  ["Pabna", "পাবনা", [
    ["Pabna Sadar", "পাবনা সদর"], ["Atgharia", "আটঘরিয়া"], ["Bera", "বেড়া"], ["Bhangura", "ভাঙ্গুড়া"], ["Chatmohar", "চাটমোহর"],
    ["Faridpur", "ফরিদপুর"], ["Ishwardi", "ঈশ্বরদী"], ["Santhia", "সাঁথিয়া"], ["Sujanagar", "সুজানগর"],
  ]],
  ["Panchagarh", "পঞ্চগড়", [
    ["Panchagarh Sadar", "পঞ্চগড় সদর"], ["Atwari", "আটোয়ারী"], ["Boda", "বোদা"], ["Debiganj", "দেবীগঞ্জ"], ["Tetulia", "তেঁতুলিয়া"],
  ]],
  ["Patuakhali", "পটুয়াখালী", [
    ["Patuakhali Sadar", "পটুয়াখালী সদর"], ["Bauphal", "বাউফল"], ["Dashmina", "দশমিনা"], ["Dumki", "দুমকি"],
    ["Galachipa", "গলাচিপা"], ["Kalapara", "কলাপাড়া"], ["Mirzaganj", "মির্জাগঞ্জ"], ["Rangabali", "রাঙ্গাবালী"],
  ]],
  ["Pirojpur", "পিরোজপুর", [
    ["Pirojpur Sadar", "পিরোজপুর সদর"], ["Bhandaria", "ভান্ডারিয়া"], ["Indurkani", "ইন্দুরকানী"], ["Kawkhali", "কাউখালী"],
    ["Mathbaria", "মঠবাড়িয়া"], ["Nazirpur", "নাজিরপুর"], ["Nesarabad", "নেছারাবাদ"],
  ]],
  ["Rajbari", "রাজবাড়ী", [
    ["Rajbari Sadar", "রাজবাড়ী সদর"], ["Baliakandi", "বালিয়াকান্দি"], ["Goalanda", "গোয়ালন্দ"], ["Kalukhali", "কালুখালী"], ["Pangsha", "পাংশা"],
  ]],
  ["Rajshahi", "রাজশাহী", [
    ["Boalia", "বোয়ালিয়া"], ["Motihar", "মতিহার"], ["Rajpara", "রাজপাড়া"], ["Shah Makhdum", "শাহ মখদুম"],
    ["Bagha", "বাঘা"], ["Bagmara", "বাগমারা"], ["Charghat", "চারঘাট"], ["Durgapur", "দুর্গাপুর"], ["Godagari", "গোদাগাড়ী"],
    ["Mohanpur", "মোহনপুর"], ["Paba", "পবা"], ["Puthia", "পুঠিয়া"], ["Tanore", "তানোর"],
  ]],
  ["Rangamati", "রাঙ্গামাটি", [
    ["Rangamati Sadar", "রাঙ্গামাটি সদর"], ["Baghaichhari", "বাঘাইছড়ি"], ["Barkal", "বরকল"], ["Belaichhari", "বিলাইছড়ি"],
    ["Juraichhari", "জুরাছড়ি"], ["Kaptai", "কাপ্তাই"], ["Kawkhali", "কাউখালী"], ["Langadu", "লংগদু"],
    ["Naniarchar", "নানিয়ারচর"], ["Rajasthali", "রাজস্থলী"],
  ]],
  ["Rangpur", "রংপুর", [
    ["Rangpur Sadar", "রংপুর সদর"], ["Badarganj", "বদরগঞ্জ"], ["Gangachara", "গংগাচড়া"], ["Kaunia", "কাউনিয়া"],
    ["Mithapukur", "মিঠাপুকুর"], ["Pirgachha", "পীরগাছা"], ["Pirganj", "পীরগঞ্জ"], ["Taraganj", "তারাগঞ্জ"],
  ]],
  ["Satkhira", "সাতক্ষীরা", [
    ["Satkhira Sadar", "সাতক্ষীরা সদর"], ["Assasuni", "আশাশুনি"], ["Debhata", "দেবহাটা"], ["Kalaroa", "কলারোয়া"],
    ["Kaliganj", "কালীগঞ্জ"], ["Shyamnagar", "শ্যামনগর"], ["Tala", "তালা"],
  ]],
  ["Shariatpur", "শরীয়তপুর", [
    ["Shariatpur Sadar", "শরীয়তপুর সদর"], ["Bhedarganj", "ভেদরগঞ্জ"], ["Damudya", "ডামুড্যা"], ["Gosairhat", "গোসাইরহাট"],
    ["Naria", "নড়িয়া"], ["Zajira", "জাজিরা"],
  ]],
  ["Sherpur", "শেরপুর", [
    ["Sherpur Sadar", "শেরপুর সদর"], ["Jhenaigati", "ঝিনাইগাতী"], ["Nakla", "নকলা"], ["Nalitabari", "নালিতাবাড়ী"], ["Sreebardi", "শ্রীবরদী"],
  ]],
  ["Sirajganj", "সিরাজগঞ্জ", [
    ["Sirajganj Sadar", "সিরাজগঞ্জ সদর"], ["Belkuchi", "বেলকুচি"], ["Chauhali", "চৌহালি"], ["Kamarkhanda", "কামারখন্দ"],
    ["Kazipur", "কাজীপুর"], ["Raiganj", "রায়গঞ্জ"], ["Shahjadpur", "শাহজাদপুর"], ["Tarash", "তাড়াশ"], ["Ullahpara", "উল্লাপাড়া"],
  ]],
  ["Sunamganj", "সুনামগঞ্জ", [
    ["Sunamganj Sadar", "সুনামগঞ্জ সদর"], ["Bishwambharpur", "বিশ্বম্ভরপুর"], ["Chhatak", "ছাতক"], ["Derai", "দিরাই"],
    ["Dharmapasha", "ধর্মপাশা"], ["Dowarabazar", "দোয়ারাবাজার"], ["Jagannathpur", "জগন্নাথপুর"], ["Jamalganj", "জামালগঞ্জ"],
    ["Madhyanagar", "মধ্যনগর"], ["Shalla", "শাল্লা"], ["Shantiganj", "শান্তিগঞ্জ"], ["Tahirpur", "তাহিরপুর"],
  ]],
  ["Sylhet", "সিলেট", [
    ["Sylhet Sadar", "সিলেট সদর"], ["Kotwali", "কোতোয়ালী"], ["Airport", "এয়ারপোর্ট"], ["Jalalabad", "জালালাবাদ"],
    ["Moglabazar", "মোগলাবাজার"], ["Shah Poran", "শাহপরান"], ["Balaganj", "বালাগঞ্জ"], ["Beanibazar", "বিয়ানীবাজার"],
    ["Bishwanath", "বিশ্বনাথ"], ["Companiganj", "কোম্পানীগঞ্জ"], ["Dakshin Surma", "দক্ষিণ সুরমা"], ["Fenchuganj", "ফেঞ্চুগঞ্জ"],
    ["Golapganj", "গোলাপগঞ্জ"], ["Gowainghat", "গোয়াইনঘাট"], ["Jaintiapur", "জৈন্তাপুর"], ["Kanaighat", "কানাইঘাট"],
    ["Osmani Nagar", "ওসমানীনগর"], ["Zakiganj", "জকিগঞ্জ"],
  ]],
  ["Tangail", "টাঙ্গাইল", [
    ["Tangail Sadar", "টাঙ্গাইল সদর"], ["Basail", "বাসাইল"], ["Bhuapur", "ভূঞাপুর"], ["Delduar", "দেলদুয়ার"],
    ["Dhanbari", "ধনবাড়ী"], ["Ghatail", "ঘাটাইল"], ["Gopalpur", "গোপালপুর"], ["Kalihati", "কালিহাতী"],
    ["Madhupur", "মধুপুর"], ["Mirzapur", "মির্জাপুর"], ["Nagarpur", "নাগরপুর"], ["Sakhipur", "সখিপুর"],
  ]],
  ["Thakurgaon", "ঠাকুরগাঁও", [
    ["Thakurgaon Sadar", "ঠাকুরগাঁও সদর"], ["Baliadangi", "বালিয়াডাঙ্গী"], ["Haripur", "হরিপুর"], ["Pirganj", "পীরগঞ্জ"],
    ["Ranisankail", "রাণীশংকৈল"],
  ]],
];

/** The eight divisions, each listing its districts by their English name. */
export const DIVISIONS = [
  { name: "Barishal", nameBn: "বরিশাল", districts: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"] },
  {
    name: "Chattogram",
    nameBn: "চট্টগ্রাম",
    districts: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  },
  {
    name: "Dhaka",
    nameBn: "ঢাকা",
    districts: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  },
  {
    name: "Khulna",
    nameBn: "খুলনা",
    districts: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  },
  { name: "Mymensingh", nameBn: "ময়মনসিংহ", districts: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"] },
  {
    name: "Rajshahi",
    nameBn: "রাজশাহী",
    districts: ["Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
  },
  {
    name: "Rangpur",
    nameBn: "রংপুর",
    districts: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  },
  { name: "Sylhet", nameBn: "সিলেট", districts: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"] },
];

export const DISTRICTS = raw.map(([name, nameBn, stations]) => ({
  name,
  nameBn,
  policeStations: stations.map(([stationName, stationNameBn]) => ({ name: stationName, nameBn: stationNameBn })),
}));

export const districtsOf = (divisionName) => {
  const names = DIVISIONS.find((division) => division.name === divisionName)?.districts || [];
  return DISTRICTS.filter((district) => names.includes(district.name));
};

export const policeStationsOf = (districtName) =>
  DISTRICTS.find((district) => district.name === districtName)?.policeStations || [];
