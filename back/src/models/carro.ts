export class Frota {
    private id: number
    private model: string
    private plate: string
    private available: boolean

    constructor(
        id: number,
        model: string,
        plate: string,
        available: boolean
    )
    {
        this.id = id
        this.model = model
        this.plate = plate
        this.available = available
    }

    
    
}