function scheduler() {
    const today = new Date();
    let currentDay = today
    let fibonacciIndex = 0;
    let schedule: Date[] = []

    function fibonacci(n:number): number {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2)
    }

    while (fibonacciIndex < 15 ) {
        let nextRevisionDate = new Date(currentDay);
        nextRevisionDate.setDate(nextRevisionDate.getDate() + fibonacci(fibonacciIndex));

        schedule.push(nextRevisionDate);
        currentDay = nextRevisionDate;
        fibonacciIndex++;
    }

    return schedule;
}

function fibonacci(n:number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

function main() {
    
    // let nextRevisionDate: Date = new Date();
    // nextRevisionDate.setHours(0,0,0,0);

    // nextRevisionDate.setDate(nextRevisionDate.getDate() + fibonacci(2));

    // console.log("next revision date: ", nextRevisionDate);

console.log('schedule', scheduler());
}

main();
