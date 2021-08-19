const inputBill = document.querySelector('#bill');
const inputTipPercent = document.querySelectorAll('.tip-percent');
const inputTipCustom = document.querySelector('#custom');
const inputPeople = document.querySelector('#people');
const domResultTip = document.querySelector('#tip-amount');
const domResultTotal = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');
const errorMessage = document.querySelector('#error-message');

const currentBill = {
    people: 1,
    tipAmount: 0.00,
    total: 0.00
};

function calculate(cb) {
    let {bill, tipPercent, people, tipAmount, total} = cb;
    if(bill == undefined || people === 0 || tipPercent == undefined) {
        return
    } else {
        tipAmount = bill * tipPercent / people;
        total = (bill / people) + tipAmount;
        console.log(bill, tipPercent, people, tipAmount, total);
    }
    return showResult(tipAmount, total);
}

function showResult(tip, tot) {
    domResultTip.innerHTML = '$' + tip.toFixed(2);
    domResultTotal.innerHTML = '$' + tot.toFixed(2);
}

function reset() {
    // unset
    currentBill.people = 1;
    currentBill.tipAmount = 0.00;
    currentBill.total = 0.00;
    delete currentBill.tipPercent;
    delete currentBill.bill;
    // clear tip inputs
    inputTipCustom.classList.remove('selected');
    inputTipPercent.forEach(btn => btn.classList.remove('selected'));
    // clear inputs
    inputBill.value = "";
    inputTipCustom.value = "";
    inputPeople.value = "";
    // $0.00
    showResult(0.00, 0.00);
}

function showError() {
    errorMessage.classList.remove('hide');
    inputPeople.classList.add('error');
}

function hideError() {
    errorMessage.classList.add('hide');
    inputPeople.classList.remove('error');
}

function enterTip(e) {
    inputTipCustom.classList.remove('selected');
    inputTipPercent.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');

    if(e.target.id === 'tipbtn') {
        currentBill.tipPercent = e.target.dataset.tip / 100;
        console.log(currentBill.tipPercent);
    } else if(e.target.id === 'custom') {
        currentBill.tipPercent = e.target.value / 100;
        console.log(currentBill.tipPercent);
    }
    calculate(currentBill);
}
 

inputTipPercent.forEach(btn => btn.addEventListener('click', enterTip));

inputTipCustom.addEventListener('input', enterTip);

inputBill.addEventListener('input', (e) => {
    currentBill.bill = e.target.value; 
    calculate(currentBill);
});

inputPeople.addEventListener('input', (e) => {
    if(e.target.value == 0) {
        showError();
        return;
    } else {
        hideError();
        currentBill.people = e.target.value; 
        calculate(currentBill);
    }
});

resetBtn.addEventListener('click', reset);
