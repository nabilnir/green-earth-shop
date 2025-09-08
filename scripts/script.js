//catagory list API

const loadCategoryList = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategoryList(json.categories));
}

// loadTreeByCategory function
const loadTreeByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            console.log(json); 
            displayPlants(json.plants || json.data);
        });
}


const displayCategoryList = (categories) => {
    const categoryContainer = document.getElementById("categoryList");
    categoryContainer.innerHTML = "";

    
    const allTreesDiv = document.createElement("div");
    allTreesDiv.className = "catTreeName w-full cursor-pointer px-2.5 py-2 bg-green-700 rounded flex justify-start items-center gap-2.5 mb-2";
    allTreesDiv.innerHTML = `
        <p class="text-white text-base font-medium font-['Inter']">All Trees</p>
    `;
    allTreesDiv.onclick = function() {
        loadPlants();
        updateActiveButton(allTreesDiv);
    };
    categoryContainer.append(allTreesDiv);

    
    for (let categorie of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.className = "catTreeName w-full cursor-pointer px-2.5 py-2 hover:bg-green-700 rounded flex justify-start items-center gap-2.5 mb-2";
        btnDiv.innerHTML = `
            <p class="text-gray-800 text-base hover:text-white font-medium font-['Inter']">${categorie.category_name}</p>
        `;
        btnDiv.onclick = function() {
            loadTreeByCategory(categorie.id); 
            updateActiveButton(btnDiv);
        };
        categoryContainer.append(btnDiv);
    }
}

const updateActiveButton = (activeButton) => {
    
    document.querySelectorAll('.catTreeName').forEach(btn => {
        btn.className = "catTreeName w-full cursor-pointer px-2.5 py-2 hover:bg-green-700 rounded flex justify-start items-center gap-2.5 mb-2";
        const p = btn.querySelector('p');
        if (p) {
            p.className = "text-gray-800 text-base hover:text-white font-medium font-['Inter']";
        }
    });
    
    
    activeButton.className = "catTreeName w-full cursor-pointer px-2.5 py-2 bg-green-700 rounded flex justify-start items-center gap-2.5 mb-2";
    const activeP = activeButton.querySelector('p');
    if (activeP) {
        activeP.className = "text-white text-base font-medium font-['Inter']";
    }
}

//load catCard

const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayPlants(json.plants));
}



//display cat plant cards

const displayPlants = (plants) => {
    const displayPlant = document.getElementById("treeCardContainer");
    displayPlant.innerHTML = "";

    for (let plant of plants) {
        const treeCard = document.createElement("div");
        treeCard.className = "h-full"; // Ensures equal heights
        treeCard.innerHTML = `
            <div class="h-full self-stretch p-4 bg-white rounded-lg flex flex-col justify-between items-start gap-3">
                <img src="${plant.image}" alt="card" class="self-stretch h-48 rounded-lg object-cover">
                <div class="self-stretch inline-flex justify-start items-center gap-3">
                    <div class="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <h1 class="self-stretch justify-start text-gray-800 text-lg font-semibold font-['Inter'] leading-tight">
                            ${plant.name}
                        </h1>
                        <p class="self-stretch opacity-80 justify-start text-gray-800 text-md font-normal font-['Inter'] leading-none">
                            ${plant.description}
                        </p>
                        <div class="mt-3 self-stretch inline-flex justify-start items-center gap-2">
                            <div class="px-3 py-1 bg-green-100 rounded-[400px] inline-flex flex-col justify-center items-center gap-2.5">
                                <div class="inline-flex justify-center items-center gap-2.5">
                                    <p class="justify-start text-green-700 text-sm font-medium font-['Inter'] leading-tight">
                                        ${plant.category}
                                    </p>
                                </div>
                            </div>
                            <p class="flex-1 text-right justify-start text-gray-800 text-sm font-semibold font-['Bengali Noto serif'] leading-tight">
                                ৳${plant.price}
                            </p>
                        </div>
                    </div>
                </div>
                <button class="self-stretch px-5 py-3 bg-green-700 rounded-[999px] inline-flex justify-center items-center gap-2.5">
                    <p class="justify-start text-white text-base font-medium font-['Inter']">Add to Cart</p>
                </button>
            </div>
        `;
        displayPlant.append(treeCard);
    }
}



loadPlants();
loadCategoryList();

