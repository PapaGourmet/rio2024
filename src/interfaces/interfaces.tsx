export interface ICamImages {
    addImage(uri: string, email: string): Promise<string | undefined>
}

export class CamImages {
    constructor(private service: ICamImages){}

    async addImage(uri: string, email: string): Promise<string | undefined>{
        return this.service.addImage(uri, email)
    }
}


export interface IPayData {
    cnpj: string,
    valor: number,
    usuario: string
}