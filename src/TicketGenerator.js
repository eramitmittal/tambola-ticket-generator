export class TicketGenerator {
    generate() {
        const toRet = Array.from({length: 27}).map(()=>"");
        
        //3 rows
        for (let row = 1; row < 4; row++) {
            let cellAnnouncer = new Announcer(9*(row-1), 9*(row-1) + 8);
            const cellsToPopulateInCurrentRow = Array.from({length: 5}).map(()=>cellAnnouncer.next());
            cellsToPopulateInCurrentRow.forEach(cell => {
                toRet[cell] = "P";
            });
        }

        //9 columns
        for (let col = 1; col < 10; col++){
            const min = (col - 1) * 10;
            const max = min + 9;
            let numAnnouncer = new Announcer(min ? min: 1, max);
            let announcedNumbers = [];
            let cellsToPopulate = [];

            //3 rows per column
            for (let row = 1; row < 4; row++) {
                const currentCell = (9*(row-1)) + col -1;
                if(toRet[currentCell] === "P") {
                    cellsToPopulate.push(currentCell);
                    announcedNumbers.push(numAnnouncer.next());
                }
            }
            
            announcedNumbers.sort((a,b)=> a-b);
            cellsToPopulate.forEach(cell => {
                toRet[cell] = announcedNumbers.splice(0,1)[0];
            });
        }

        return toRet;
    }
}

class Announcer {
    
    #available;

    constructor(minAllowed, maxAllowed) {
        this.#available = Array.from({length: maxAllowed - minAllowed + 1}, (_, i)=> i + minAllowed);
    }

    next() {
        if(this.#available.length === 0) return 0;

        const rand = Math.floor(Math.random() * 100);

        const numAvailable = this.#available.length;
        const numSlotsPerRand = 100/numAvailable;
        const randSlot = rand / numSlotsPerRand;
        const index = Math.floor(randSlot);
        const numToAnnounce = this.#available[index];

        this.#available.splice(index, 1);
        return numToAnnounce;
    }
}
