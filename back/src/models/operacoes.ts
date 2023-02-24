export class Operations {
    private id: number
    private date: Date
    private driverId: number
    private carId: number
    private createdAt: Date
    private updatedAt: Date

    constructor(
        id: number,
        date: Date,
        driverId: number,
        carId: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id
        this.date = date
        this.driverId = driverId
        this.carId = carId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }



}