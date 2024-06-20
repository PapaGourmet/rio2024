export interface ICamImages {
    addImage(uri: string): Promise<string>
}

export class CamImages {
    constructor(private service: ICamImages){}

    async addImage(uri: string): Promise<string>{
        return this.service.addImage(uri)
    }
}