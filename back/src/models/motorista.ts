export class Motorista {
    private name: string
    private cnh: string
    private id: number
    private avaliable: boolean


    constructor(
        name: string,
        cnh: string,
        id: number,
        avaliable: boolean
    )
    {
        this.name = name
        this.cnh = cnh
        this.id = id
        this.avaliable = avaliable
    }

}