
export class Usuario {
    private name: string
    private password: string
    private id: number
    private management: boolean

    constructor(
        name: string,
        password: string,
        id: number,
        management: boolean
    )
    {
        this.name = name
        this.password = password
        this.id = id
        this.management = management
    }


}