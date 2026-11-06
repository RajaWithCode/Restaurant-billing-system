const generateBillBtn = document.getElementById("generateBill");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const invoiceSection = document.getElementById("invoiceSection");
const invoiceContent = document.getElementById("invoiceContent");
const printInvoiceBtn = document.getElementById("printInvoice");

generateBillBtn.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Please add items to cart!");
    return;
  }

  const name = customerName.value.trim();
  const phone = customerPhone.value.trim();

  if (name === "") {
    alert("Please enter customer name!");
    return;
  }

  if (phone === "") {
    alert("Please enter customer phone number!");
    return;
  }

  // Calculate bill
  const billingSubtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const billingGST = billingSubtotal * 0.05;

  const billingDiscount = Math.min(
    Number(document.getElementById("discountInput").value) || 0,
    billingSubtotal + billingGST,
  );

  const billingGrandTotal = billingSubtotal + billingGST - billingDiscount;

  // Generate invoice items
  const itemsHTML = cartItems
    .map((item) => {
      return `
            <div class="invoice-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    })
    .join("");

  const invoiceHTML = `
    <h2>Agar Magar</h2>
    <p>Customer: ${name}</p>
    <p>Phone: ${phone}</p>
    <p>Date: ${new Date().toLocaleString("en-IN")}</p>

    <hr>

    ${itemsHTML}

    <hr>

    <p>Subtotal: ₹${billingSubtotal.toFixed(2)}</p>
    <p>GST (5%): ₹${billingGST.toFixed(2)}</p>
    <p>Discount: ₹${billingDiscount.toFixed(2)}</p>

    <h3>Grand Total: ₹${billingGrandTotal.toFixed(2)}</h3>
`;

  const invoiceWindow = window.open("", "_blank");

  if (!invoiceWindow) {
    alert("Please allow pop-ups to generate invoice!");
    return;
  }

  invoiceWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Agar Magar - Customer Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 30px;
                color: #222;
            }

            .invoice {
                max-width: 700px;
                margin: auto;
                padding: 30px;
                border: 1px solid #ddd;
            }

            .invoice-item {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }

            h2, h3 {
                color: #172033;
            }

            @media print {
                body {
                    padding: 0;
                }

                .invoice {
                    border: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice">
            ${invoiceHTML}
        </div>
    </body>
    </html>
`);

  invoiceWindow.document.close();
  invoiceWindow.focus();

  invoiceWindow.print();

  // Clear cart after billing
  cartItems = [];

  // Clear customer details
  customerName.value = "";
  customerPhone.value = "";

  // Clear discount
  document.getElementById("discountInput").value = "";

  // Update cart and totals
  renderCart();
});
