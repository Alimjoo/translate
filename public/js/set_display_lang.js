let display_lang_zh = {
    name: "Piyazon 翻译",
    piyazon_name: "Piyazon 官网",
    code: "zh",
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
    },
    from: "从 :",
    to: "到 :",
    input_place_holder: "输入文本",
    output_place_holder: "发翻译会出现在这里",
    warning_header: "警告: ",
    warning_content: "翻译可能并非总是准确。请在使用前验证关键信息。",
    manifest: "./favicon/site_zh.webmanifest"
};

let display_lang_en = {
    name: "Piyazon Translator",
    piyazon_name: "Piyazon Official",
    code: "en",
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
    },
    from: "from :",
    to: "to :",
    input_place_holder: "Enter your text here",
    output_place_holder: "Translated text will appear here",
    warning_header: "Warning: ",
    warning_content: "Translations may not always be accurate. Please verify critical information before use.",
    manifest: "./favicon/site_en.webmanifest"
};

let display_lang_ug = {
    name: "پىيازون تەرجىمانى",
    piyazon_name: "پىيازون تورى",
    code: "ug",
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
    },
    from: "دىن :",
    to: "غا :",
    input_place_holder: "تىكىستنى كىرگۈزۈڭ",
    output_place_holder: "تەرجىمىسى بۇيەدە چىقىدۇ",
    warning_header: "ئاگاھلاندۇرۇش: ",
    warning_content: "تەرجىمىلەر ھەمىشە توغرا بولماسلىقى مۇمكىن. ئىشلىتىشتىن ئىلگىرى مۇھىم ئۇچۇرلارنى دەلىللەڭ.",
    manifest: "./favicon/site_ug.webmanifest"
};


// Storing a variable in localStorage
// let myVariable = "zh";
// localStorage.setItem("display_lang", myVariable);


function store_to_local(var_name, var_val) {
    localStorage.setItem(var_name, var_val);
}

var selected_display_lang;

function get_disp_lang() {
    // Retrieving the variable
    let retrievedVariable = localStorage.getItem("display_lang");
    // console.log(retrievedVariable); // Output: Hello, World!
    if (retrievedVariable == "zh") {
        selected_display_lang = display_lang_zh;
    } else if (retrievedVariable == "ug") {
        selected_display_lang = display_lang_ug;
    } else if (retrievedVariable == "en") {
        selected_display_lang = display_lang_en;
    } else {
        selected_display_lang = display_lang_zh;
    }
}

get_disp_lang();


