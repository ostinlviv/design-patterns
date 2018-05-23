class User {
    constructor (name, lastVisitDate, ordersCount, ordersTotalPrice){
        this.name = name;
        this.lastVisitDate = lastVisitDate;
        this.globalDiscount = 3;
        this.nightDiscount = 5;
        this.weekendDiscount = 6;
        this.ordersCount = ordersCount;
        this.ordersTotalPrice = ordersTotalPrice;
        this.bonus = 0;
    }
    getDiscount() {
        return this.globalDiscount;
    }
    getBonus() {
        return this.bonus;
    }
}

function days (day) {
    if (day === 0) {
        return 'Sunday';
    }
    if (day === 1) {
        return 'Monday';
    }
    if (day === 2) {
        return 'Tuesday';
    }
    if (day === 3) {
        return 'Wednesday';
    }
    if (day === 4) {
        return 'Thursday';
    }
    if (day === 5) {
        return 'Friday';
    }
    if (day === 6) {
        return 'Saturday';
    }
}

const getDiscount = user => {
    const discount = user.getDiscount();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    if (5 > hours > 23) {
        user.getDiscount = () => discount + user.nightDiscount;
    }
    if (day === 0 || day === 6) {
        user.getDiscount = () => discount + user.weekendDiscount;
    }
    if ((5 > hours > 23) && (day === 0 || day === 6)) {
        user.getDiscount = () => discount + user.weekendDiscount + user.nightDiscount;
    }
    console.log('Now is ' + hours + ':' + minutes + ', ' + days(day) + '. You have ' + user.getDiscount() + '% discount.');
};

const getBonus = user => {
    const bonus = user.getBonus();
    const now = Date.now();
    const getLastVisit = new Date(user.lastVisitDate);
    const lastVisit = getLastVisit.getTime();
    const nowInHours = Math.floor(now/3600000);
    const lastVisitInHours = Math.floor(lastVisit/3600000);
    const diff = nowInHours - lastVisitInHours;
    if (diff < 240) {
        user.getBonus = () => bonus + (240 - diff);
        user.ordersCount += 1;
    }
    console.log('You have been in our store ' + diff + ' hours ago. Now you have +' + user.getBonus() + ' bonuses.');
};

const user = new User("Ostap", "05/22/2018", 3, 120);
getDiscount(user);
getBonus(user);


