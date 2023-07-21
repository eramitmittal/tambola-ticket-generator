export class TicketGenerator {
    generate() {
        let numAnnouncer = new Announcer(90);
        const toRet = Array.from({length: 27}).map(()=>"");
        
        const nums = Array.from({length: 15}).map(()=>numAnnouncer.next());
    
        for(let row=0; row<3; row++)
        {
            let cellAnnouncer = new Announcer(9);
            const cells = Array.from({length: 5}).map(()=>cellAnnouncer.next());
            cells.forEach((v)=>{
                toRet[9*row + v-1] = nums.splice(0, 1)[0];
            })
        }

        return toRet;
    }
}

class Announcer {
    
    #available;

    constructor(maxAllowed) {
        this.#available = Array.from({length: maxAllowed}, (_, i)=> i + 1);
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
