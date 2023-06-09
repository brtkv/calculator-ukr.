'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName ('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBt = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInput = document.querySelector ('.choose-income'),
    checkBoxx = document.querySelector('#savings'),
    summValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


    let money, time;

startBtn.addEventListener('click', function() {
    time = prompt ( "Введіть дату у форматі YYYY-MM-DD",'');
    money = +prompt ( "Ваш бюджет на місяць?",'');
    

    while ( isNaN(money) || money =="" || money==null ) { 
        money = +prompt ( "Ваш бюджет на місяць?",'');
    };
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesBt.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});


countBtn.addEventListener('click',function() {

    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget/30).toFixed(1);
        daybudgetValue.textContent =  appData.moneyPerDay;
    
        
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Мінімальний рівень достатку";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) { 
                levelValue.textContent = "Середній рівень достатку";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Високий рівень достатку";
            } else {
                levelValue.textContent = 'Виникла помилка';
            }

    } else {
        daybudgetValue.textContent= 'Спочатку заповніть всі поля!';
    }
    });

    chooseIncomeInput.addEventListener ('input', function(){
        let items =  chooseIncomeInput.value;
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    } );


checkBoxx.addEventListener('click',function(){
    if (appData.savings == true){
        (appData.savings = false);
    }else{
        appData.savings =true;
    }
});

summValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +summValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +summValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
    }
});


let appData = {
    budget : money,
    timeData :time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings:  false,
};


