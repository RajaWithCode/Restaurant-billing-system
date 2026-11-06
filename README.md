# 🍽️ Agar Magar – Restaurant POS & Billing System

Agar Magar is a simple and user-friendly Restaurant Billing System built using HTML, CSS, and JavaScript. It helps restaurants manage food orders, calculate bills, apply discounts, and generate customer invoices.

## 🚀 Features

- **Food Menu:** Display food items with images and prices.
- **Search Food:** Search food items by name.
- **Category Filter:** Filter items by food categories.
- **Add to Cart:** Add food items to the shopping cart.
- **Quantity Management:** Increase or decrease item quantities.
- **Automatic Billing:** Calculate subtotal, GST, discount, and grand total.
- **Customer Details:** Enter customer name and phone number.
- **Invoice Generation:** Generate a customer invoice in a new browser tab.
- **Print Invoice:** Print the invoice or save it as a PDF.
- **Clear Cart:** Remove all cart items and reset customer details.
- **Automatic Reset:** Clear cart, customer details, and discount after billing.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome

## 📂 Project Structure

```text
restaurant-pos/
│
├── assets/
│   └── images/
│       ├── burger.png
│       ├── Drink.png
│       ├── French.jpg
│       ├── Pasta.png
│       ├── pizza.png
│       └── Sandwich.png
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   └── billing.js
│
└── index.html
```

## ⚙️ Installation & Setup

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd restaurant-pos
   ```

3. Open the `index.html` file in your browser.

   Alternatively, use the **Live Server** extension in VS Code.

## 🧾 How to Use

1. Open the Restaurant POS application.
2. Browse the available food items.
3. Search or filter food items by category.
4. Click **Add to Cart** to add food items.
5. Adjust item quantities using the `+` and `-` buttons.
6. Enter the customer name and phone number.
7. Apply a discount if required.
8. Click **Generate Bill**.
9. The invoice opens in a new browser tab.
10. Choose **Save as PDF** in the browser print dialog to save the invoice.

## 💰 Billing Calculation

The system calculates the bill using the following formula:

- **Subtotal:** Sum of item price × quantity.
- **GST:** 5% of subtotal.
- **Discount:** Deducted from subtotal + GST.
- **Grand Total:** Subtotal + GST − Discount.

```text
Grand Total = Subtotal + GST - Discount
```

## 🔮 Future Improvements

- Save billing history.
- Generate unique invoice numbers.
- Store customer information.
- Add payment transaction records.
- Add a dashboard with sales reports.
- Integrate a database and backend.

## 👨‍💻 Developer

**Raja Kumar**

Full Stack Developer

## 📄 License

This project is created for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star on GitHub!