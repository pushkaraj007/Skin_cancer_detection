let model;
async function loadModel() {
  console.log("model loading..");
  loader = document.getElementById("progress-box");
  load_button = document.getElementById("load-button");
  loader.style.display = "block";
  modelName = "mobilenet";
  model = undefined;
  model = await tf.loadLayersModel(
    "./sc_detector/artifacts/tfjs/mobilen_model/model.json"
  );
  loader.style.display = "none";
  load_button.disabled = true;
  load_button.innerHTML = "Loaded Model";
  console.log("model loaded..");
}

async function loadFile() {
  console.log("image is in loadfile..");
  document.getElementById("select-file-box").style.display = "table-cell";
  document.getElementById("predict-box").style.display = "table-cell";
  document.getElementById("prediction").innerHTML =
    "Click predict to find the type of Skin Cancer!";
  var fileInputElement = document.getElementById("select-file-image");
  console.log(fileInputElement.files[0]);
  renderImage(fileInputElement.files[0]);
}

function renderImage(file) {
  var reader = new FileReader();
  console.log("image is here..");
  reader.onload = function (event) {
    img_url = event.target.result;
    console.log("image is here2..");
    document.getElementById("test-image").src = img_url;
  };
  reader.readAsDataURL(file);
}

var chart = "";
var firstTime = 0;
function loadChart(label, data) {
  var ctx = document.getElementById("chart-box").getContext("2d");
  chart = new Chart(ctx, {
    //type of chart
    type: "bar",

    //data for Chart
    data: {
      labels: label,
      datasets: [
        {
          label: "Probability Chart",
          backgroundColor: "rgb(82, 196, 211)",
          borderColor: "rgb(82, 196, 211)",
          color: "white",
          tickColor: "white",
          data: data,
        },
      ],
    },
    //config options
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 18,
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            font: {
              size: 15,
            },
          },
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 15,
            },
          },
        },
      },
    },
  });
}

async function predButton() {
  console.log("model loading..");

  if (model == undefined) {
    alert("Please load the model first.");
  }
  if (document.getElementById("predict-box").style.display == "none") {
    alert("Please load an image using 'Demo Image' or 'Upload Image' button..");
  }
  console.log(model);
  let image = document.getElementById("test-image");
  let tensor = preprocessImage(image, modelName);

  let predictions = await model.predict(tensor).data();
  let results_all = Array.from(predictions)
    .map(function (p, i) {
      return {
        probability: p,
        className: TARGET_CLASSES[i],
        index: i,
      };
    })
    .sort(function (a, b) {
      return b.probability - a.probability;
    });

  let results = results_all.slice(0, 3);

  document.getElementById("predict-box").style.display = "block";
  document.getElementById("prediction").innerHTML =
    "The predicted type of Skin Cancer is: <br><b>" +
    results[0].className +
    "</b>";
   
    // let hour = new Date().getHours();
    // let greeting;
    if (results[0].className == "mel, Melanoma") {
      // const link = document.createElement('a');
      //  ink.href = ' https://www.practo.com/mumbai/doctors-for-melanoma-treatment';
      //  link.textContent = 'Click here to visit Example';
      //  document.getElementById('myElement').appendChild(link);
      //  window.open("index.html", 'newwindow'); 
         value = " You've been Diagonised with Melanoma . Melanoma occurs when the pigment-producing cells that give colour to the skin become cancerous. Symptoms might include a new, unusual growth or a change in an existing mole \n. Melanomas can occur anywhere on the body. Treatment may involve surgery, radiation, medication or in some cases, chemotherapy . The first melanoma signs and symptoms often are: A change in an existing mole . The development of a new pigmented or unusual-looking growth on your skin . Melanoma doesn't always begin as a mole. It can also occur on otherwise normal-appearing skin... Treatment for early-stage melanomas usually includes ::: surgery to remove the melanoma. A very thin melanoma may be removed entirely during the biopsy and require no further treatment. Otherwise, your surgeon will remove the cancer as well as a border of normal skin and a layer of tissue beneath the skin. For people with early-stage melanomas, this may be the only treatment needed. Following can be done:  Immunotherapy  , Targeted therapy ,Radiation therapy ,Chemotherapy --- Top doctor to Consult for Melanoma ::: Prof. Dr. Suresh H. AdvaniMedical Oncologist, Mumbai, India , Senior Consultant, 43 years of experience , NANAVATI SUPER SPECIALTY HOSPITAL, MUMBAI https://www.practo.com/mumbai/doctors-for-melanoma-treatment ";
    } 
      else if (results[0].className =="nv, Melanocytic Nevi"){
        value = " You've been Diagonised with Menanocytic Nevi , A usually non-cancerous disorder of pigment-producing skin cells commonly called birth marks or moles. This type of mole is often large and caused by a disorder involving melanocytes, cells that produce pigment (melanin). Melanocytic nevi can be rough, flat or raised. They can exist at birth or appear later. Rarely, melanocytic nevi can become cancerous. Most cases don't require treatment, but some cases require removal of the mole.Diagnosis is usually clinical, although dermatoscopy and/or biopsy can be utilized to further examine the lesion in cases where there may be uncertainty as to the diagnosis or a concern for malignancy... Important reasons for removal of a melanocytic nevus are: high clinical suspicion of melanoma; history of change in the lesion, supported by physical exam; and/or high suspicion of atypical features suggestive of melanoma--- Top Doctors to consult in Mumbai :- Dr. Vishal Diddi ,Laparoscopic Surgeon ,17 years experience overall, Borivali West,Mumbai ::: 080 4709 5003--- https://www.practo.com/mumbai/mole-removal/procedure";
      }
      else if (results[0].className =="bkl, Benign Keratosis"){
        value = " You've been Diagonised with Benign Keratosis,  BKL aslo known as seborrheic keratosis (seb-o-REE-ik ker-uh-TOE-sis) is a common noncancerous (benign) skin growth. People tend to get more of them as they get older... Seborrheic keratoses are usually brown, black or light tan. The growths (lesions) look waxy or scaly and slightly raised. They appear gradually, usually on the face, neck, chest or back. Seborrheic keratoses are harmless and not contagious... They don't need treatment, but you may decide to have them removed if they become irritated by clothing or you don't like how they look.A seborrheic keratosis grows gradually...Signs and symptoms might include::: A round or oval-shaped waxy or rough bump, typically on the face, chest, a shoulder or the back... A flat growth or a slightly raised bump with a scaly surface, with a characteristic pasted on lookVaried size, from very small to more than 1 inch (2.5 centimeters) across Varied number, ranging from a single growth to multiple growth Very small growths clustered around the eyes or elsewhere on the face, sometimes called flesh moles or dermatosis papulosa nigra, common on Black or brown skinVaried in color, ranging from light tan to brown or black Itchiness--- Top doctors to Consult for Benign Keratosis :::Inurskn - Skin & Hair Clinic,  Dermatologist , 19 years experience , Powai ::: 020 7117 7327 --- https://www.practo.com/mumbai/treatment-for-seborrhea";
      }
      else if (results[0].className =="vasc, Vascular skin lesion"){
        value = " You've been Diagonised with Vascular lesions , It includes acquired lesions (eg, pyogenic granuloma) and those that are present at birth or arise shortly after birth (vascular birthmarks).Vascular birthmarks include vascular tumors (eg, infantile hemangioma) and vascular malformations... Vascular malformations are congenital, life-long, localized defects in vascular morphogenesis and include capillary (eg, nevus flammeus), venous, arteriovenous (eg, cirsoid aneurysm), and lymphatic malformations... Watchful waiting is usually recommended. Parents must be informed that in fair-skinned children, erythema may persist or reappear during episodes of crying, physical exertion or breath-holding... If therapy is desired, the flash-lamp pumped pulsed dye laser (FPDL) is the treatment of choice for these superficial vascular lesions.--- Top Doctors to consult for Vascular Skin Lesion , Dr. Jathin's Varicose Vein Center , Vascular Surgery Doctors , Doctors For Varicose Veins Treatment , Andheri West, Mumbai 7715099426---https://www.justdial.com/Mumbai/Vascular-Surgery-Doctors/nct-10988749";
      }
      else if (results[0].className =="bcc, Basal Cell Carcinoma"){
        value = "You've been Diagonised with Basal cell carcinoma which is a type of skin cancer... Basal cell carcinoma begins in the basal cells — a type of cell within the skin that produces new skin cells as old ones die off... Basal cell carcinoma often appears as a slightly transparent bump on the skin, though it can take other forms. Basal cell carcinoma occurs most often on areas of the skin that are exposed to the sun, such as your head and neck. Basal cell carcinoma appears as a change in the skin, such as a growth or a sore that won't heal... These changes in the skin (lesions) usually have one of the following characteristics::: A shiny, skin-colored bump that's translucent, meaning you can see a bit through the surface... The bump can look pearly white or pink on white skin. On brown and Black skin, the bump often looks brown or glossy black. Tiny blood vessels might be visible, though they may be difficult to see on brown and Black skin... The bump may bleed and scab over. A brown, black or blue lesion — or a lesion with dark spots — with a slightly raised, translucent border... A flat, scaly patch with a raised edge. Over time, these patches can grow quite large. A white, waxy, scar-like lesion without a clearly defined border.";
      }
      else if (results[0].className =="akiec, Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)"){
        value = "You've been Diagonised with Actinic keratoses (AKs) and Bowen’s disease . These are common forms of sun-damage where abnormal cells have developed in the top layer of the skin (the epidermis) from excessive sun exposure... They appear as scaly patches. These usually occur on areas of the body which catch the sun such as the face and ears, scalp in balding men, back of the hands, forearms, and lower legs in women. Actinic keratoses are sometimes called ‘solar keratoses’. Bowen’s disease is sometimes called ‘squamous cell carcinoma in-situ’ .Individual lesions are not usually serious and often do not cause much trouble. However as they may look unsightly, and can be itchy and sore, they are often treated...There is a very small risk that AKs and Bowen’s disease may progress into a type of skin cancer called squamous cell carcinoma (SCC)... It is estimated that 1 in every 1000 actinic keratosis will progress to a skin cancer each year.";
      }
      else {
        value = "You've been Diagonised with Dermatofibroma , It is a commonly occurring cutaneous entity usually centered within the skin's dermis. Dermatofibromas are referred to as benign fibrous histiocytomas of the skin, superficial/cutaneous benign fibrous histiocytomas, or common fibrous histiocytoma. Key markers of a dermatofibroma are--Appearance: A dermatofibroma presents as a round bump that is mostly under the skin. Size::: The normal range is about 0.5–1.5 centimeters (cm), with most lesions being 0.7–1.0 cm in diameter. The size will usually remain stable.Color::: The growths vary in color among individuals but will generally be pink, red, gray, brown, or black. Location::: Dermatofibromas are most common on the legs, but they sometimes appear on the arms, trunk, and, less commonly, elsewhere on the body. Additional symptoms::: Although they are usually harmless and painless, these growths may occasionally be itchy, tender, painful, or inflamed.";
      }
    document.getElementById("demo1").innerHTML = value;    

  var ul = document.getElementById("predict-list");
  ul.innerHTML = "";
  results.forEach(function (p) {
    console.log(
      p.className + "(" + p.index + ")" + " " + p.probability.toFixed(6)
    );
    var li = document.createElement("LI");
    li.innerHTML =
      p.className + "(" + p.index + ")" + " " + p.probability.toFixed(6);
    ul.appendChild(li);
  });

  // label = ["0", "1", "2", "3", "4", "5", "6"];
  label = [
    "0: akiec",
    "1: bcc",
    "2: bkl",
    "3: df",
    "4: mel",
    "5: nv",
    "6: vasc",
  ];
  if (firstTime == 0) {
    loadChart(label, predictions);
    firstTime = 1;
  } else {
    chart.destroy();
    loadChart(label, predictions);
  }

  document.getElementById("chart-box").style.display = "block";
}

function preprocessImage(image, modelName) {
  let tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat();

  if (modelName === undefined) {
    return tensor.expandDims();
  } else if (modelName === "mobilenet") {
    let offset = tf.scalar(127.5);
    return tensor.sub(offset).div(offset).expandDims();
  } else {
    alert("Unknown model name..");
  }
}

function loadDemoImage() {
  document.getElementById("predict-box").style.display = "table-cell";
  document.getElementById("prediction").innerHTML =
    "Click predict to find the type of Skin Cancer!";
  document.getElementById("select-file-box").style.display = "table-cell";
  document.getElementById("predict-list").innerHTML = "";

  base_path = "./assets/nv_samplepic.jpg";
  // maximum = 4;
  // minimum = 1;
  // var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  // img_path = base_path + randomnumber + ".jpeg"
  img_path = base_path;
  document.getElementById("test-image").src = img_path;
}
function information()
{

}