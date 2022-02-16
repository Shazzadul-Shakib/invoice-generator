// get Id
function getId(id) {
 return document.getElementById(id);
};
// date function
function date() {
  const x = new Date();
  const date = x.getDate() + '/' + parseInt(x.getMonth() + 1) + '/' + x.getFullYear();
  return date;
}
// console.log(date());
getId('date').innerText = date();
// invoice number generator
function getInvoiceNo() {
  const no = Math.round((Math.random() * 10000)+10000);
  return no;
}

// item Quantity
function itemQuantity() {
  const itemQty = getId('item-quantity').value;
  return itemQty;
}
// discount price generator
function discount() {
  const discountPercent = Math.round(Math.random() * 10);
  return discountPercent;
}


// create data table
let scope = 0;
function dataTable() {
  const tr= document.createElement('tr');
  const th= document.createElement('th');
  const td1= document.createElement('td');
  const td2= document.createElement('td');
  const td3 = document.createElement('td');
  scope++;
  // item info inputed 
  const itemNameInputed = getId('item-name').value;
  const itemQuantitiesInputed = itemQuantity();
  const itemRateInputed = getId('individual-total').innerText;

  th.innerText = scope;
  th.setAttribute('scope', '1');
  td1.innerText = itemNameInputed;
  td2.innerText = itemQuantitiesInputed;
  td3.innerText = "$" + itemRateInputed;
  tr.appendChild(th);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  getId('data-table').appendChild(tr);
}
// get individual item total input section
function itemTotal() {
  const quantity = itemQuantity();
  const rate = getId('item-rate').value;
  const total = parseFloat(quantity * rate).toFixed(2);
  getId('individual-total').innerText = total;
}

// individual total 
function itemsTotal() {
  const quantity = itemQuantity();
  const rate = getId('item-rate').value;
  const total = quantity * rate;
  return total;
}
// item input clear
function inputClear() {
  getId('item-name').value = '';
  getId('item-quantity').value = '';
  getId('item-rate').value = '';
  getId('individual-total').innerText = '';
}
// subtotal calculation
let subTotal = 0;
function st() {
  subTotal += itemsTotal();
  return subTotal;
}
// calculation total
function calculation() {
  const gotSubTotal = st();
  const gotTax = gotSubTotal * .1;
  
 
  getId('sub-total').innerText = gotSubTotal;
  getId('tax').innerText =gotTax.toFixed(2) ;
  // 
}

  getId('add-button').addEventListener('click', function () {
    // if individual price total == 0 than item will not added at list
    if (getId('individual-total').innerText != 0) {
      dataTable(); 
      calculation();
    }
    inputClear();
  });

// apply coupon event
let x = 0;
getId('coupon-button').addEventListener('click', function () {
  x++;
  const gotSubTotal = st();
  const gotDiscount = discount();
  const gotTax = gotSubTotal * .1;
  const subtax = gotSubTotal + gotTax;
   const discountAmount = gotSubTotal * (gotDiscount / 100);
  getId('coupon-percent').innerText =gotDiscount;
  getId('discount-amount').innerText = discountAmount;
  getId('total').innerText = subtax - discountAmount;
  if (x == 1) {
    getId('coupon-button').setAttribute("disabled", true);
    if (getId('coupon-button').getAttribute('disabled')) {
      getId('coupon-button').style.backgroundColor = 'black';
      getId('coupon-button').style.border = 'none';
    }
  }
})
// submit button event
getId('submit-btn').addEventListener('click', function () {
  
  // name capitalize
  if (isNaN(getId('user-name').value)) {
    const userNameInputed = getId('user-name').value;
    getId('user-name-show').innerText = userNameInputed;
    getId('user-invoice-show').innerText = getInvoiceNo();
  }
  else {
    getId('name-error').classList.add('show');
  }
  if (getId('user-email').value.includes('@')) {
    const userEmailInputed = getId('user-email').value;
    getId('user-email-show').innerText = userEmailInputed;
  }
  else {
    getId('email-error').classList.add('show');
  }
  if (getId('user-phone').value.length == 11 && typeof parseInt(getId('user-phone').value) == 'number' && getId('user-phone').value.startsWith('01')) {
    const userPhoneInputed = getId('user-phone').value;
    getId('user-phone-show').innerText = userPhoneInputed;
  }
  else {
    getId('phone-error').classList.add('show');
  }
  // clear input
  getId('user-name').value = '';
  getId('user-email').value = '';
  getId('user-phone').value = '';
})

// refresh page
getId('refresh').addEventListener('click', function () {
  window.location.reload(true);
})