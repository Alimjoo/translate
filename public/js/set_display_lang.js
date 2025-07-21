let display_lang_zh = {
    selec_display_name: "显示语言",
    src_lang: {
        "en": "英语",
        "ug": "维吾尔语",
        "zh-Hans": "简体中文",
        "kk": "哈萨克语",
        "bo": "藏语",
        "tgk": "塔吉克语",
        "es": "西班牙语",
        "ru": "俄语",
        "tr": "土耳其语",
        "uz": "乌兹别克语",
        "hi": "印地语",
        "ur": "乌尔都语",
        "ja": "日语",
        "ko": "韩语",
        "ar": "阿拉伯语",
        "zh-Hant": "繁体中文",
        "fr": "法语",
        "de": "德语",
        "it": "意大利语",
        "ky": "吉尔吉斯语",
        "fa": "波斯语",
        "pt-PT": "葡萄牙语",
        "th": "泰语",
    }
};

let display_lang_en = {
    selec_display_name: "Display Name",
    src_lang: {
        "en": "English",
        "ug": "Uyghur",
        "zh-Hans": "Chinese Simplified",
        "kk": "Kazakh",
        "bo": "Tibetan",
        "tgk": "Tajik",
        "uz": "Uzbek",
        "tr": "Turkish",
        "es": "Spanish",
        "ru": "Russian",
        "hi": "Hindi",
        "ur": "Urdu",
        "ja": "Japanese",
        "ko": "Korean",
        "ar": "Arabic",
        "zh-Hant": "Chinese Traditional",
        "fr": "French",
        "de": "German",
        "it": "Italian",
        "ky": "Kyrgyz",
        "fa": "Persian",
        "pt-PT": "Portuguese",
        "th": "Thai",
    }
};

let display_lang_ug = {
    selec_display_name: "كۆرسىتىش تىلى",
    src_lang: {
        "en": "ئىنگلىزچە", // English
        "ug": "ئۇيغۇرچە", // Uyghur
        "zh-Hans": "خەنزۇچە", // Chinese Simplified
        "kk": "قازاقچە", // Kazakh
        "bo": "تىبەتچە", // Tibetan
        "tgk": "تاجىكچە", // Tajik
        "uz": "ئۆزبېكچە", // Uzbek
        "tr": "تۈركچە", // Turkish
        "es": "ئىسپانچە", // Spanish
        "ru": "رۇسچە", // Russian
        "hi": "ھىندىچە", // Hindi
        "ur": "ئۇردۇچە", // Urdu
        "ja": "ياپونچە", // Japanese
        "ko": "كورېيەچە", // Korean
        "ar": "ئەرەبچە", // Arabic
        "zh-Hant": "خەنزۇچە (ئەنئەنىۋى)", // Chinese Traditional
        "fr": "فىرانسۇزچە", // French
        "de": "گېرمانچە", // German
        "it": "ئىتالىيانچە", // Italian
        "ky": "قىرغىزچە", // Kyrgyz
        "fa": "پارسچە", // Persian
        "pt-PT": "پورتۇگالچە", // Portuguese
        "th": "تايلاندچە" // Thai
    }
};


// Storing a variable in localStorage
// let myVariable = "zh";
// localStorage.setItem("display_lang", myVariable);


function store_to_local(var_name, var_val){
   localStorage.setItem(var_name, var_val); 
}

// Retrieving the variable
let retrievedVariable = localStorage.getItem("display_lang");
// console.log(retrievedVariable); // Output: Hello, World!

var selected_display_lang;

if (retrievedVariable == "zh") {
    selected_display_lang =  display_lang_zh;
}else if (retrievedVariable == "ug"){
    selected_display_lang =  display_lang_ug;
}else if (retrievedVariable == "en"){
    selected_display_lang =  display_lang_en;
}else{
    selected_display_lang =  display_lang_zh;
}

// console.log(selected_display_lang);

function Change_Display_Lang(){
    
}




