const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language");

const swapBtn = document.querySelector(".swap-position"),
  inputLanguage = inputLanguageDropdown.querySelector(".selected"),
  outputLanguage = outputLanguageDropdown.querySelector(".selected"),
  inputTextElem = document.querySelector("#input-text"),
  outputTextElem = document.querySelector("#output-text");

function populateDropdown(dropdown, options) {
  // console.log(options["src_lang"]);
  dropdown.querySelector("ul").innerHTML = "";
  Object.keys(options["src_lang"]).forEach((option) => {
    const li = document.createElement("li");
    const title = options["src_lang"][option];
    li.innerHTML = title;
    li.dataset.value = option;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
  if (inputLanguageDropdown === dropdown) {
    var stored_src_lang = localStorage.getItem("stored_src_lang");
    if (!stored_src_lang) stored_src_lang = 'en';
    // console.log(stored_src_lang);
    const stored_src_lang_el = inputLanguageDropdown.querySelector(`li[data-value=${stored_src_lang}].option`);
    // console.log(stored_src_lang_el.textContent);
    stored_src_lang_el.classList.add("active");
    const selected = dropdown.querySelector(".selected");
    selected.innerHTML = stored_src_lang_el.innerHTML;
    selected.dataset.value = stored_src_lang_el.dataset.value;
  }
  if (outputLanguageDropdown === dropdown) {
    var stored_des_lang = localStorage.getItem("stored_des_lang");
    if (!stored_des_lang) stored_des_lang = 'zh-Hans';
    // console.log(stored_des_lang);
    const stored_des_lang_el = outputLanguageDropdown.querySelector(`li[data-value=${stored_des_lang}].option`);
    // console.log(stored_des_lang_el.textContent);
    stored_des_lang_el.classList.add("active");
    const selected = dropdown.querySelector(".selected");
    selected.innerHTML = stored_des_lang_el.innerHTML;
    selected.dataset.value = stored_des_lang_el.dataset.value;
  }
}

populateDropdown(inputLanguageDropdown, selected_display_lang);
populateDropdown(outputLanguageDropdown, selected_display_lang);

// console.log(selected_display_lang);
const fromHeading = document.querySelector('.card.input-wrapper .from .heading');
const toHeading = document.querySelector('.card.output-wrapper .to .heading');
const webName = document.querySelector('.web_name');
const piyazonName = document.querySelector('.piyazon_name');
const curInLang = inputLanguageDropdown.querySelector(".selected");
const curOutLang = outputLanguageDropdown.querySelector(".selected");
function Change_Display_Lang() {
  get_disp_lang();
  // console.log(`change to ${selected_display_lang['code']}`)
  fromHeading.innerHTML = selected_display_lang["from"];
  toHeading.innerHTML = selected_display_lang["to"];
  webName.innerHTML = selected_display_lang["name"];
  piyazonName.innerHTML = selected_display_lang["piyazon_name"];
  curInLang.innerHTML = selected_display_lang["src_lang"][curInLang.dataset.value];
  curOutLang.innerHTML = selected_display_lang["src_lang"][curOutLang.dataset.value];
  const input_options = document.querySelectorAll('#input-language .dropdown-menu .option');
  const output_options = document.querySelectorAll('#output-language .dropdown-menu .option');
  if (selected_display_lang["code"] == "ug" ||
    selected_display_lang["code"] == "ur" ||
    selected_display_lang["code"] == "fa" ||
    selected_display_lang["code"] == "ar"
  ) {
    fromHeading.style.fontFamily = "chiwer";
    toHeading.style.fontFamily = "chiwer";
    webName.style.fontFamily = "chiwer";
    piyazonName.style.fontFamily = "chiwer";
    curInLang.style.fontFamily = "chiwer";
    curOutLang.style.fontFamily = "chiwer";
    input_options.forEach((option, index) => {
      option.innerHTML = selected_display_lang["src_lang"][option.dataset.value];
      option.style.fontFamily = "chiwer";
    });
    output_options.forEach((option, index) => {
      option.innerHTML = selected_display_lang["src_lang"][option.dataset.value];
      option.style.fontFamily = "chiwer";
    });
  } else {
    fromHeading.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    toHeading.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    webName.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    piyazonName.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    curInLang.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    curOutLang.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    input_options.forEach((option, index) => {
      option.innerHTML = selected_display_lang["src_lang"][option.dataset.value];
      option.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    });
    output_options.forEach((option, index) => {
      option.innerHTML = selected_display_lang["src_lang"][option.dataset.value];
      option.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    });
  }
}

Change_Display_Lang();

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      //remove active class from current dropdowns
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });
      // console.log(item.dataset.value);
      if (inputLanguageDropdown.contains(item)) {
        store_to_local("stored_src_lang", item.dataset.value);
      }
      if (outputLanguageDropdown.contains(item)) {
        store_to_local("stored_des_lang", item.dataset.value);
      }
      item.classList.add("active");
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;
      // console.log(localStorage.getItem("stored_src_lang"));
      // console.log(localStorage.getItem("stored_des_lang"));
      change_input_output_ug();
      translate();
    });
  });
});
document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

document.querySelector('.piyazon_name').addEventListener('click', (e) => {
  window.location.href = "https://piyazon.top"
  menuContainer.classList.remove('active');
});
document.querySelector('.web_name').addEventListener('click', (e) => {
  window.location.href = "https://translate.piyazon.top"
  menuContainer.classList.remove('active');
});
document.querySelector('.disp_lang_zh').addEventListener('click', (e) => {
  localStorage.setItem("display_lang", 'zh');
  Change_Display_Lang();
  menuContainer.classList.remove('active');
});
document.querySelector('.disp_lang_ug').addEventListener('click', (e) => {
  localStorage.setItem("display_lang", 'ug');
  Change_Display_Lang();
  menuContainer.classList.remove('active');
});
document.querySelector('.disp_lang_en').addEventListener('click', (e) => {
  localStorage.setItem("display_lang", 'en');
  Change_Display_Lang();
  menuContainer.classList.remove('active');
});



swapBtn.addEventListener("click", (e) => {

  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  //swap text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.value;
  outputTextElem.value = tempInputText;
  change_input_output_ug();
  translate();
});

async function translate() {
  const text = inputTextElem.value;
  // console.log(text);
  const fromLang =
    inputLanguageDropdown.querySelector(".selected").dataset.value;
  const toLang =
    outputLanguageDropdown.querySelector(".selected").dataset.value;

  try {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ text, fromLang, toLang })
    });
    const data = await response.json();
    if (data.error) {
      outputTextElem.value = ``;
      console.log(`Error ${data.error}`);
    } else {
      outputTextElem.value = `${data.translation}`;
      // console.log(outputTextElem.value);
    }
  } catch (err) {
    console.error(err);
  }
}

// inputTextElem.addEventListener("input", async (e) => {
//   //limit input to 5000 characters
//   if (inputTextElem.value.length > 5000) {
//     inputTextElem.value = inputTextElem.value.slice(0, 5000);
//   }
//   await translate();
// });

// Debounce function to delay execution until input stops for a specified time
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Add event listener with debounced translate call
inputTextElem.addEventListener("input", (e) => {
  change_input_output_ug();
  // Limit input to 5000 characters
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }

  // Call debounced translate
  debouncedTranslate();
});

// Debounced version of translate
const debouncedTranslate = debounce(async () => {
  await translate();
}, 300); // Adjust delay (300ms) as needed

// const uploadDocument = document.querySelector("#upload-document"),
//   uploadTitle = document.querySelector("#upload-title");

// uploadDocument.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   if (
//     file.type === "application/pdf" ||
//     file.type === "text/plain" ||
//     file.type === "application/msword" ||
//     file.type ===
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     uploadTitle.innerHTML = file.name;
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = (e) => {
//       inputTextElem.value = e.target.result;
//       translate();
//     };
//   } else {
//     alert("Please upload a valid file");
//   }
// });

// const downloadBtn = document.querySelector("#download-btn");

// downloadBtn.addEventListener("click", (e) => {
//   const outputText = outputTextElem.value;
//   const outputLanguage =
//     outputLanguageDropdown.querySelector(".selected").dataset.value;
//   if (outputText) {
//     const blob = new Blob([outputText], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.download = `translated-to-${outputLanguage}.txt`;
//     a.href = url;
//     a.click();
//   }
// });

const darkModeCheckbox = document.getElementById("dark-mode-btn");

// darkModeCheckbox.addEventListener("change", () => {
//   document.body.classList.toggle("dark");
// });


// Function to apply the theme based on stored value or default
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    darkModeCheckbox.checked = true; // Set checkbox to checked
  } else {
    document.body.classList.remove("dark");
    darkModeCheckbox.checked = false; // Set checkbox to unchecked
  }
}

// Apply theme when page loads
document.addEventListener("DOMContentLoaded", applyTheme);

// Toggle theme on checkbox change
darkModeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDarkMode = darkModeCheckbox.checked;
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});





const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});
