//catagory list API

const loadCategoryList = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategoryList(json.categories));
}

// loadTreeByCategory function
const loadTreeByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    document.getElementById("treeCardContainer").innerHTML = '<div class="col-span-3 w-full flex justify-center items-center h-64"><span class="col-span-3 w-full loading loading-dots loading-xl"></span></div>';

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
    allTreesDiv.onclick = function () {
        loadPlants();
        updateActiveButton(allTreesDiv);
    };
    categoryContainer.append(allTreesDiv);


    for (let categorie of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.className = "catTreeName w-full cursor-pointer px-2.5 py-2 hover:bg-green-700 hover:text-white rounded flex justify-start items-center gap-2.5 mb-2";
        btnDiv.innerHTML = `
            <p class="text-gray-800 text-base  font-medium font-['Inter']">${categorie.category_name}</p>
        `;
        btnDiv.onclick = function () {
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
    document.getElementById("treeCardContainer").innerHTML =
        '<div class="col-span-3 w-full flex justify-center items-center h-64"><span class="col-span-3 w-full loading loading-dots loading-xl"></span></div>';
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayPlants(json.plants));
}



//display cart plant cards

const displayPlants = (plants) => {
    const displayPlant = document.getElementById("treeCardContainer");
    displayPlant.innerHTML = "";

    for (let plant of plants) {
        const treeCard = document.createElement("div");
        treeCard.className = "h-full";
        treeCard.innerHTML = `
            <div class="h-full self-stretch p-4 bg-white rounded-lg flex flex-col justify-between items-start gap-3">
                <img src="${plant.image}" alt="card" class="self-stretch h-48 rounded-lg object-cover">
                <div class="self-stretch inline-flex justify-start items-center gap-3">
                    <div class="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <h1 onclick ="displayModal(${plant.id})" class="cursor-pointer self-stretch justify-start text-gray-800 text-lg font-semibold font-['Inter'] leading-tight">
                            ${plant.name}
                        </h1>
                        <p class="self-stretch opacity-80 justify-start text-gray-800 text-md font-normal font-['Inter'] leading-none line-clamp-3 overflow-hidden">
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
               <button onclick ="addToCart({id: ${plant.id}, name: '${plant.name}', price: ${plant.price}})" class="addCartBtn 
                self-stretch px-5 py-3 bg-green-700 rounded-[999px] inline-flex justify-center items-center gap-2.5 cursor-pointer
                 hover:bg-green-800 transition-colors duration-200">
                    <p class="justify-start text-white text-base font-medium font-['Inter']">Add to Cart</p>
                </button>
            </div>
        `;
        displayPlant.append(treeCard);
    }
}


//load modal

const displayModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    document.getElementById("modalContent").innerHTML = '<div class="col-span-3 w-full loading-spinner"><span class="loading loading-dots loading-xl"></span></div>';
    const res = await fetch(url);
    const data = await res.json();
    const plant = data.plants;

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
        <img src="${plant.image}" alt="${plant.name}" class="w-full self-stretch h-60 object-cover rounded-xl mb-4">
        <p class="mb-2"><strong>Category:</strong> ${plant.category}</p>
        <p class="mb-2"><strong>Price:</strong> ৳${plant.price}</p>
        <p class="mb-10"><strong>Description:</strong> ${plant.description}</p>
        <form method="dialog" class="absolute right-5 bottom-4">
            <button class="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded ">Close</button>
        </form>
    `;

    document.getElementById("plant_modal").showModal();
}

//cart Update

let cartItems = {};

function addToCart(plant) {


    const cartContainer = document.getElementById("cartContainer");

    if (cartItems[plant.id]) {
        cartItems[plant.id].quantity += 1;
        updateCartItemDisplay(plant.id);
    }
    else {
        cartItems[plant.id] = {
            name: plant.name,
            price: plant.price,
            quantity: 1
        };

        const cartItem = document.createElement("div");
        cartItem.className = "w-full px-3 py-2 bg-green-50 rounded-lg flex justify-between items-center";
        cartItem.id = `cart-item-${plant.id}`;
        cartItem.innerHTML = `
            <div class="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <p class="w-full justify-start text-gray-800 text-sm font-semibold font-['Inter'] leading-tight">
                    ${plant.name}
                </p>
                <p class="cartPrice w-full opacity-50 justify-start text-gray-800 text-base font-normal font-['Inter'] leading-normal">
                    ৳${plant.price} x <span class="quantity">1</span>
                </p>
            </div>
            <button onclick="removeFromCart(${plant.id})" class="ml-2 w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full transition-colors cursor-pointer flex-shrink-0">
                ×
            </button>
        `;

        cartContainer.appendChild(cartItem);
    }

    updateCartTotal();
    updateMobileCart();

}




//addCart calculation and fuctionality

function updateCartItemDisplay(plantId) {
    const cartItem = document.getElementById(`cart-item-${plantId}`);
    const quantitySpan = cartItem.querySelector(".quantity");
    quantitySpan.textContent = cartItems[plantId].quantity;

    attachCartDropdownClickStopPropagation();
}

function removeFromCart(plantId) {
    delete cartItems[plantId];
    document.getElementById(`cart-item-${plantId}`).remove();
    updateCartTotal();
    updateMobileCart();
}


function removeFromCartMobile(plantId) {
    delete cartItems[plantId];
    document.getElementById(`cart-item-${plantId}`).remove();
    updateCartTotal();
    updateMobileCart();
}


function updateCartTotal() {
    const cartPrices = parseInt(document.querySelectorAll(".cartPrice").innerText);
    let total = 0;
    for (let itemId in cartItems) {
        const item = cartItems[itemId];
        total += item.price * item.quantity;
    }

    const totalUpdate = document.getElementById("cartTOtal");
    totalUpdate.innerText = `Total : ৳${total}`;

}


// mobile cart 


function updateMobileCart() {
    const mobileCartContainer = document.getElementById("mobileCartContainer");
    const cartBadge = document.getElementById("cartIconBadge");
    const mobileTotal = document.getElementById("mblCartTotal");


    mobileCartContainer.innerHTML = '';

    let itemCount = 0;
    let total = 0;


    for (let itemId in cartItems) {
        const item = cartItems[itemId];
        itemCount += item.quantity;
        total += item.price * item.quantity;

        const mobileCartItem = document.createElement('div');
        mobileCartItem.className = 'flex justify-between items-center p-2 bg-green-50 rounded-lg mb-2';
        mobileCartItem.innerHTML = `
            <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-800">${item.name}</p>
                  <p class="text-xs text-gray-600">৳${item.price} x ${item.quantity}</p>
             </div>
                <button onclick="removeFromCart(${itemId})" 
                   class="remove-btn text-red-500 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200">
                    ×
                </button>
        `;
        mobileCartContainer.appendChild(mobileCartItem);
    }

   
    if (cartBadge) {
        cartBadge.textContent = itemCount;
        cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
    }

    
    if (mobileTotal) {
        const priceSpan = mobileTotal.querySelector('span:last-child');
        if (priceSpan) {
            priceSpan.textContent = `৳${total}`;
        } else {
            
            mobileTotal.innerHTML = `
                <span style="font-weight: 500; color: #1f2937;">Total:</span>
                <span style="font-weight: 600; color: #1f2937;">৳${total}</span>
            `;
        }
    }


    if (itemCount === 0) {
        mobileCartContainer.innerHTML = '<p class="text-center text-gray-500 py-4">Your cart is empty</p>';
        if (cartBadge) {
            cartBadge.style.display = 'none';
        }
    }
}




//  mobile cart toggle functionality




function attachCartDropdownClickStopPropagation() {
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) {
        cartDropdown.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        
        cartDropdown.addEventListener('pointerdown', function (event) {
            event.stopPropagation();
        });
            }
}




document.addEventListener('DOMContentLoaded', function() {
            const cartButton = document.getElementById('cartButton');
            const cartDropdown = document.getElementById('cartDropdown');
            
            if (cartButton && cartDropdown) {
                
                cartButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                   
                    if (cartDropdown.classList.contains('hidden')) {
                        
                        cartDropdown.classList.remove('hidden');
                        
                        void cartDropdown.offsetWidth;
                        cartDropdown.classList.add('show');
                    } else {
                       
                        cartDropdown.classList.remove('show');
                       
                        setTimeout(() => {
                            if (!cartDropdown.classList.contains('show')) {
                                cartDropdown.classList.add('hidden');
                            }
                        }, 200);
                    }
                });
                
                
                document.addEventListener('click', function(e) {
                    if (!cartDropdown.contains(e.target) && !cartButton.contains(e.target)) {
                        cartDropdown.classList.remove('show');
                        setTimeout(() => {
                            if (!cartDropdown.classList.contains('show')) {
                                cartDropdown.classList.add('hidden');
                            }
                        }, 200);
                    }
                });
                
               
                cartDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        });


loadPlants();
loadCategoryList();
initMobileCart();
