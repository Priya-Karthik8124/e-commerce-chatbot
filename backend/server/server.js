const express = require('express');
const cors = require('cors');
const { NlpManager } = require('node-nlp');
const products = require('./data/products');
const discounts = require('./data/discounts');
const categories = require('./data/categories');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const manager = new NlpManager({ languages: ['en'], forceNER: true });
let lastIntent = null; // Store last detected intent

// Train NLP manager
manager.addDocument('en', 'Do you have any discounts?', 'discount.inquiry');
manager.addDocument('en', 'Any offers available?', 'discount.inquiry');
manager.addDocument('en', 'What are today’s deals?', 'discount.inquiry');

manager.addDocument('en', 'Show me the cheapest item', 'price.lowest');
manager.addDocument('en', 'Which product is the cheapest?', 'price.lowest');
manager.addDocument('en', 'Compare prices', 'price.lowest');

manager.addDocument('en', 'What is out of stock?', 'stock.status');
manager.addDocument('en', 'Show out of stock items', 'stock.status');
manager.addDocument('en', 'Sold out products', 'stock.status');

manager.addDocument('en', 'Hi', 'greetings.hello');
manager.addDocument('en', 'Hello there', 'greetings.hello');
manager.addDocument('en', 'Hey', 'greetings.hello');

// Category intents
manager.addDocument('en', 'Show me electronics', 'category.electronics');
manager.addDocument('en', 'List electronics items', 'category.electronics');
manager.addDocument('en', 'What electronics do you have', 'category.electronics');

manager.addDocument('en', 'Show me footwear', 'category.footwear');
manager.addDocument('en', 'What shoes do you have', 'category.footwear');
manager.addDocument('en', 'Footwear items please', 'category.footwear');

manager.addDocument('en', 'Show me clothes', 'category.clothes');
manager.addDocument('en', 'Do you have any clothes?', 'category.clothes');
manager.addDocument('en', 'List clothing items', 'category.clothes');

manager.addAnswer('en', 'discount.inquiry', "Sure! We have some great discounts. Would you like to see them?");
manager.addAnswer('en', 'price.lowest', "Let me show you our cheapest product. Would you like to see it?");
manager.addAnswer('en', 'stock.status', "I can show you the out-of-stock products. Want to see them?");
manager.addAnswer('en', 'greetings.hello', "Hello! How can I assist you today?");
manager.addAnswer('en', 'category.electronics', "Sure! I’ll list products from the electronics category.");
manager.addAnswer('en', 'category.footwear', "Sure! Here are some footwear options.");
manager.addAnswer('en', 'category.clothes', "Here are some clothing items you might like.");

(async () => {
  await manager.train();
  manager.save();
})();

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const trimmedMsg = message.toLowerCase().trim();
  let response = "Sorry, I didn't understand that.";

  // If user says "yes" and there's a last intent to act on
  if (trimmedMsg === 'yes' && lastIntent) {
    switch (lastIntent) {
      case 'discount.inquiry':
        response = "Here are the current discounts:\n";
        discounts.forEach(discount => {
          const product = products.find(p => p.productId === discount.productId);
          if (product) {
            const discountedPrice = product.price - (product.price * discount.discountPercentage / 100);
            response += `- ${product.name}: ${discount.discountPercentage}% off. Now for $${discountedPrice.toFixed(2)}\n`;
          }
        });
        break;

      case 'stock.status': {
        const outOfStockProducts = products.filter(p => p.stock === 0);
        if (outOfStockProducts.length > 0) {
          response = 'The following products are currently out of stock:\n';
          outOfStockProducts.forEach(p => {
            response += `- ${p.name}\n`;
          });
        } else {
          response = "All products are currently in stock!";
        }
        break;
      }

      case 'price.lowest': {
        const cheapest = products.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        response = `The cheapest product is ${cheapest.name} at $${cheapest.price}.`;
        break;
      }
    }
    lastIntent = null; // Clear memory after responding
    return res.json({ response });
  }

  const result = await manager.process('en', message);
  lastIntent = result.intent;

  switch (result.intent) {
    case 'greetings.hello':
    case 'discount.inquiry':
    case 'stock.status':
    case 'price.lowest':
      response = result.answer;
      break;

    case 'category.electronics':
    case 'category.footwear':
    case 'category.clothes': {
      const categoryName = result.intent.split('.')[1];
      const matchedCategory = categories.find(c => c.name.toLowerCase() === categoryName);
      if (matchedCategory) {
        response = `Here are some products in the ${matchedCategory.name} category:\n`;
        matchedCategory.products.forEach(product => {
          response += `- ${product.name} for $${product.price} (Stock: ${product.stock})\n`;
        });
      }
      break;
    }

    default: {
      for (const category of categories) {
        if (trimmedMsg.includes(category.name.toLowerCase())) {
          response = `Here are some products in the ${category.name} category:\n`;
          for (const product of category.products) {
            const discount = discounts.find(d => d.productId === product.productId);
            let price = product.price;
            if (discount) {
              price = (price - (price * discount.discountPercentage / 100)).toFixed(2);
              response += `- ${product.name} for $${price} (After ${discount.discountPercentage}% discount). In stock: ${product.stock}\n`;
            } else {
              response += `- ${product.name} for $${price}. In stock: ${product.stock}\n`;
            }
          }
        }
      }
    }
  }

  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`✅ NLP Chatbot server running at http://localhost:${PORT}`);
});
