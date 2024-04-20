//active header sticky
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50)
})

//active scroll menu
const lilink = document.querySelectorAll("header ul li a");
const section = document.querySelectorAll("section");

function activeMenu(){
    let secLength = section.length;
    while(--secLength && window.scrollY + 500 < section[secLength].offsetTop){}
    lilink.forEach(sec => sec.classList.remove("active"));
    lilink[secLength].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

//active menu icon
const menuIcon = document.querySelectorAll("#menu-icon");
const navlist = document.querySelectorAll(".navlist");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
    //navlist.forEach(list => list.classList.remove("open"));
}

//remove menu list
/*window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}*/

// Function to select a random fact from JSON based on category and subcategory
function getRandomFact(category, subcategory) {

    return new Promise((resolve, reject) => {
    fetch('facts.json')
        .then(response => response.json())
        .then(data => {
            const filteredFacts = data.filter(fact => 
                fact.category === category && fact.subcategory === subcategory
            );
            //console.log (filteredFacts.length);

            if (filteredFacts.length > 0) {
                //console.log (filteredFacts);
                const randomIndex = Math.floor(Math.random() * filteredFacts.length);
                const randomFact = filteredFacts[randomIndex];
                //return { fact: randomFact, t2iPrompt: randomFact.t2i_prompt };
                resolve({ fact: randomFact, t2iPrompt: randomFact.t2i_prompt });
            } else {
                console.log("No facts found for the provided category and subcategory.");
                resolve({ fact: null, t2iPrompt: null }); // Resolve with null values
            }
        })
        .catch(error => {console.error("Error loading JSON file:", error);
        reject(error);
        });
    });
}

async function query(data, subcategory) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/fyp-admin/dreambooth_" + subcategory + "_15",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

// Function to generate video and fetch image
function generateVideoAndImage(category, subcategory) {

    getRandomFact(category, subcategory)
        .then(({ fact, t2iPrompt }) => {
            console.log("Selected fact:", fact);
            console.log("t2i_prompt attribute:", t2iPrompt);
            // Call text-to-image API with the selected t2i_prompt
            return query(t2iPrompt, subcategory);
        })
        .then(response => {
            // Display the output image on a new page
            const imageUrl = URL.createObjectURL(response);
            console.log ("Image Gen : ", imageUrl);
            window.open(imageUrl, '_blank');
        })
        .catch(error => {
            console.error("Error generating video and fetching image:", error);
            // Handle the error
        });

}

// Function to handle button clicks
function handleButtonClick(event) {
    // Extract category and subcategory from the clicked button
    const category = event.target.dataset.category;
    const subcategory = event.target.dataset.subcategory;

    // Call the function to generate video and fetch image
    generateVideoAndImage(category, subcategory);
}

// Add event listeners to all 'Generate video' buttons
const generateButtons = document.querySelectorAll('.cosmosbtn');
generateButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});