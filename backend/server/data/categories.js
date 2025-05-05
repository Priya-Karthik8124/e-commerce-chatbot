const categories = [
  { 
    name: "Footwear", 
    products: [
      { productId: 1, name: "Red Shoes", price: 100, stock: 5 },
      { productId: 8, name: "Blue Sneakers", price: 150, stock: 0 },
      { productId: 32, name: "Black Boots", price: 180, stock: 7 },
      { productId: 33, name: "Running Shoes", price: 130, stock: 12 }
    ] 
  },
  { 
    name: "Clothes", 
    products: [
      { productId: 2, name: "Blue Shirt", price: 50, stock: 0 },
      { productId: 9, name: "Leather Jacket", price: 300, stock: 0 },
      { productId: 34, name: "Summer Dress", price: 75, stock: 9 },
      { productId: 35, name: "Jeans", price: 60, stock: 11 }
    ] 
  },
  { 
    name: "Electronics", 
    products: [
      { productId: 3, name: "Wireless Earbuds", price: 200, stock: 12 },
      { productId: 6, name: "Smartwatch", price: 250, stock: 10 },
      { productId: 10, name: "Smartphone", price: 800, stock: 4 },
      { productId: 36, name: "Bluetooth Speaker", price: 120, stock: 7 }
    ] 
  },
  { 
    name: "Accessories", 
    products: [
      { productId: 4, name: "Smartphone Case", price: 25, stock: 8 },
      { productId: 11, name: "Sunglasses", price: 70, stock: 15 },
      { productId: 37, name: "Leather Belt", price: 40, stock: 6 }
    ] 
  },
  { 
    name: "Appliances", 
    products: [
      { productId: 5, name: "Blender", price: 40, stock: 6 },
      { productId: 12, name: "Microwave Oven", price: 120, stock: 3 },
      { productId: 38, name: "Air Fryer", price: 150, stock: 5 }
    ] 
  },
  { 
    name: "Health & Beauty", 
    products: [
      { productId: 7, name: "Toothpaste", price: 2, stock: 20 },
      { productId: 13, name: "Face Wash", price: 8, stock: 10 },
      { productId: 39, name: "Shampoo", price: 5, stock: 25 }
    ] 
  },
  { 
    name: "Home Decor", 
    products: [
      { productId: 14, name: "Wall Clock", price: 30, stock: 5 },
      { productId: 15, name: "Table Lamp", price: 45, stock: 7 },
      { productId: 40, name: "Photo Frame", price: 20, stock: 10 }
    ]
  },
  { 
    name: "Kitchen Essentials", 
    products: [
      { productId: 16, name: "Non-Stick Pan", price: 35, stock: 8 },
      { productId: 17, name: "Cutlery Set", price: 20, stock: 14 },
      { productId: 41, name: "Chopping Board", price: 10, stock: 20 }
    ]
  },
  { 
    name: "Toys & Games", 
    products: [
      { productId: 18, name: "Puzzle Game", price: 15, stock: 20 },
      { productId: 19, name: "Remote Car", price: 60, stock: 5 },
      { productId: 42, name: "Board Game", price: 25, stock: 9 }
    ]
  },
  { 
    name: "Sports & Fitness", 
    products: [
      { productId: 20, name: "Yoga Mat", price: 25, stock: 12 },
      { productId: 21, name: "Dumbbells Set", price: 80, stock: 6 },
      { productId: 43, name: "Skipping Rope", price: 15, stock: 18 }
    ]
  },
  { 
    name: "Stationery", 
    products: [
      { productId: 22, name: "Notebook Pack", price: 12, stock: 30 },
      { productId: 23, name: "Pen Set", price: 5, stock: 50 },
      { productId: 44, name: "Color Markers", price: 10, stock: 35 }
    ]
  },
  { 
    name: "Automotive", 
    products: [
      { productId: 24, name: "Car Vacuum Cleaner", price: 45, stock: 4 },
      { productId: 25, name: "Seat Covers", price: 90, stock: 3 },
      { productId: 45, name: "Car Air Freshener", price: 7, stock: 20 }
    ]
  },
  { 
    name: "Gardening", 
    products: [
      { productId: 26, name: "Watering Can", price: 18, stock: 10 },
      { productId: 27, name: "Garden Tool Kit", price: 55, stock: 6 },
      { productId: 46, name: "Plant Seeds Pack", price: 12, stock: 15 }
    ]
  },
  { 
    name: "Pet Supplies", 
    products: [
      { productId: 28, name: "Dog Leash", price: 15, stock: 10 },
      { productId: 29, name: "Cat Food", price: 20, stock: 12 },
      { productId: 47, name: "Pet Shampoo", price: 9, stock: 8 }
    ]
  },
  { 
    name: "Books", 
    products: [
      { productId: 30, name: "Science Fiction Novel", price: 12, stock: 25 },
      { productId: 31, name: "Cooking Recipes Book", price: 18, stock: 17 },
      { productId: 48, name: "History Book", price: 22, stock: 13 }
    ]
  }
];

module.exports = categories;
