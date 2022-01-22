/*have an object for your states. better than individual variables
since you can then save the state of a program */
var state = {

    balance: 60,
    income: 69,
    expense: 200,
    transactions: [
    ]
}

function uniqueId(){
    return Math.floor(Math.random()*1000000000)
}
var balanceElement = document.querySelector('#balance');
var incomeElement = document.querySelector('#income');
var expenseElement = document.querySelector('#expenses');
var transactionsElement = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#income-button');
var expenseBtnEl = document.querySelector('#expense-button');

var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');

function init(){
    var localState = JSON.parse(localStorage.getItem('expenseTrackerState'));

    if (localState !== null){
        state = localState;
    }
    updateState();
    initListeners();
}

function initListeners(){
    incomeBtnEl.addEventListener('click', addIncome);
    expenseBtnEl.addEventListener('click', addExpense);

}
function addTrans(type){
    if (nameInputEl.value != '' && amountInputEl !='') {
        var transaction = {
            id: uniqueId(),
            name: nameInputEl.value,
            amount: parseInt(amountInputEl.value),
            type: type
        };
        state.transactions.push(transaction);
        updateState();
    }
    else{
        alert('You forgot to write something!')
    }
}
function addIncome(){
    addTrans("income")
}

function addExpense(){
    addTrans('expense')
}

function updateState(){
    var sum = 0;
    var exp = 0;
    var inc = 0;
    for (var i =0; i<state.transactions.length; i++){
        element = state.transactions[i];
        if (element.type === 'income'){
            sum +=element.amount;
            inc += element.amount;
        }else {
            sum -= element.amount;
            exp+=element.amount;
        }
    }
    state.balance = sum;
    state.expense = exp;
    state.income = inc;

    localStorage.setItem('expenseTrackerState', JSON.stringify(state))
    render();
}

function deleteClick(event){
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for (var i =0;i < state.transactions.length; i++){
        if (state.transactions[i].id === id){
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);

    updateState();
}

function render() {
    balanceElement.innerHTML =  `GBP ${state.balance}` /* instead of concatenating 2 strings, its like an f string*/
    incomeElement.innerHTML = `GBP ${state.income}`
    expenseElement.innerHTML = `GBP ${state.expense}`
    transactionsElement.innerHTML= '';
    var transactionElement, containerElement, amountElement, item;

    for (var i = 0; i<state.transactions.length; i++){
         item = state.transactions[i];
        transactionElement = document.createElement('li');
        transactionElement.append(item.name);

        transactionsElement.appendChild(transactionElement)
        containerElement = document.createElement('div');
        amountElement = document.createElement('span');

        if (item.type == 'income') {
            amountElement.classList.add('income-amt');
        }
        else {
            amountElement.classList.add('expense-amt');
        }
        amountElement.innerHTML = `GBP ${item.amount}`

        containerElement.appendChild(amountElement);

        transactionElement.appendChild(containerElement);

        btnEl = document.createElement("button");
        btnEl.innerHTML = 'X';
        btnEl.setAttribute('data-id', item.id) // sets html attribute of data as id
        btnEl.addEventListener('click', deleteClick)
        containerElement.appendChild((btnEl));
    }

}



init();