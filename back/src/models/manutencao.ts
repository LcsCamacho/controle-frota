export class Manutencao {

    private id: number
    private date: Date
    private carId: number
    private createdAt: Date
    private updatedAt: Date
    private description: string
    private operationsId: number

    constructor(
        id: number,
        date: Date,
        carId: number,
        createdAt: Date,
        updatedAt: Date,
        description: string,
        operationsId: number
    )
    {
        this.id = id
        this.date = date
        this.carId = carId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.description = description
        this.operationsId = operationsId
    }
    
}