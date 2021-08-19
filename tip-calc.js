const inputBill = document.querySelector('#bill');
const inputTipPercent = document.querySelectorAll('.tip-percent');
const inputTipCustom = document.querySelector('#custom');
const inputPeople = document.querySelector('#people');
const domResultTip = document.querySelector('#tip-amount');
const domResultTotal = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');

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
    // clear inputs
    inputBill.value = "";
    inputTipCustom.value = "";
    inputPeople.value = "";
    // $0.00
    showResult(0.00, 0.00);
}
 
inputBill.addEventListener('input', (e) => {
    currentBill.bill = e.target.value; 
    calculate(currentBill);
});

inputTipPercent.forEach(btn => btn.addEventListener('click', function(e) {
    currentBill.tipPercent = e.target.dataset.tip;
    calculate(currentBill);
}));

inputTipCustom.addEventListener('input', (e) => {
    currentBill.tipPercent = e.target.value / 100;
    calculate(currentBill);
})

inputPeople.addEventListener('input', (e) => {
    currentBill.people = e.target.value; 
    calculate(currentBill);
});

resetBtn.addEventListener('click', reset);
